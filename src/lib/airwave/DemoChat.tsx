"use client";
import React, { type PointerEvent, useRef, useState } from "react";

import { type MemberData } from "./client";
import { useChannel, useMembers } from "./hooks";
import { useEffect } from "react";
import Cursor from "./Cursor";

const fetchUser = (demoUser: string): Promise<MemberData> =>
  Promise.resolve({ clientId: demoUser });

type DemoChatProps = {
  username?: string;
  disabled?: boolean;
};

type DemoState = Record<string, [number, number]>;

const DemoChat: React.FC<DemoChatProps> = ({ username, disabled = false }) => {
  const [location, setLocation] = useState<DemoState>({});
  const boxRef = useRef<HTMLDivElement>(null);
  // const user = useQuery({
  //   queryKey: [username],
  //   queryFn: () => fetchUser(username),
  // });

  const channel = useChannel("demo");
  const memberData = useMembers("demo");
  const others = memberData.filter(
    (member) => member.clientId !== channel.clientId,
  );

  useEffect(() => {
    channel.bind("pointermove", (event) => {
      setLocation((state) => ({
        ...state,
        [event.clientId]: event.data as [number, number],
      }));
    });
  }, [channel]);

  const handlePointerMove = (e: PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const coords = [
      Math.round(e.clientX - rect.left),
      Math.round(e.clientY - rect.top),
    ];

    channel.trigger("pointermove", coords);
  };

  return (
    <>
      <div
        id="DemoChat"
        className="relative h-full touch-none"
        ref={boxRef}
        onPointerMove={handlePointerMove}
      >
        {!disabled &&
          others.map((m) => (
            <Cursor
              key={m.clientId}
              label={`User: ${m.clientId}`}
              location={location[m.clientId]}
            />
          ))}
      </div>
    </>
  );
};

export default DemoChat;
