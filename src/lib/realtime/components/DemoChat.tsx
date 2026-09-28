"use client";
import React, { type PointerEvent, useRef, useState } from "react";

import { useChannel } from "../hooks/realtimeHooks";
import Cursor from "./Cursor";
import { useKeyCommand } from "../hooks/useKeyCommand";
import { HoverInput } from "./HoverInput";

type DemoChatProps = {
  disabled?: boolean;
};

type DemoState = Record<string, [number, number]>;

export const DemoChat: React.FC<DemoChatProps> = ({ disabled = false }) => {
  const [location, setLocation] = useState<DemoState>({});
  const [memberMessages, setMemberMessages] = useState<Record<string, string>>(
    {},
  );
  const [message, setMessage] = useState("");
  const [[x, y], setCoords] = useState<[number, number]>([0, 0]);

  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const channel = useChannel("demo", (message) => {
    if (message.event === "pointermove") {
      setLocation((state) => ({
        ...state,
        [message.clientId]: message.data as [number, number],
      }));
    } else if (message.event === "onmessage") {
      setMemberMessages((state) => ({
        ...state,
        [message.clientId]: message.data as string,
      }));
    }
  });

  const { isEnabled } = useKeyCommand({
    ref: boxRef,
    onClose() {
      setMessage("");
      channel?.trigger("onmessage", "");
    },
  });

  const handlePointerMove = (e: PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const coords: [number, number] = [
      Math.round(e.clientX - rect.left),
      Math.round(e.clientY - rect.top),
    ];
    setCoords(coords);

    channel?.trigger("pointermove", coords);
  };

  const handleMessageChange = (value: string) => {
    setMessage(value);
    channel?.trigger("onmessage", value);
  };

  return (
    <div
      id="DemoChat"
      className="relative h-full touch-none"
      ref={boxRef}
      onPointerMove={handlePointerMove}
    >
      {!disabled &&
        channel?.members.map(
          (member) =>
            member.clientId !== channel.clientId && (
              <Cursor
                key={member.clientId}
                label={member.clientId}
                location={location[member.clientId]}
                text={memberMessages[member.clientId]}
              />
            ),
        )}
      {
        <HoverInput
          value={message}
          onChange={handleMessageChange}
          location={[x, y]}
          ref={inputRef}
          isEnabled={isEnabled}
        />
      }
    </div>
  );
};
