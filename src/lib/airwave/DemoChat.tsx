"use client";
import React, { type PointerEvent, useRef, useState } from "react";

import { useChannel } from "./hooks";
import { useEffect } from "react";
import Cursor from "./Cursor";
import { useKeyCommand } from "./hooks/useKeyCommand";
import { HoverInput } from "./HoverInput";

type DemoChatProps = {
  username?: string;
  disabled?: boolean;
};

type DemoState = Record<string, [number, number]>;

const DemoChat: React.FC<DemoChatProps> = ({ username, disabled = false }) => {
  const [location, setLocation] = useState<DemoState>({});
  const [memberMessages, setMemberMessages] = useState<Record<string, string>>(
    {},
  );
  const [message, setMessage] = useState("");
  const [[x, y], setCoords] = useState<[number, number]>([0, 0]);

  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // const { x, y } = useCursorPosition(boxRef);
  const { isEnabled } = useKeyCommand({
    ref: boxRef,
    onKeydown() {
      console.log("KEYDOWN");
    },
    onClose() {
      setMessage("");
      channel?.trigger("onmessage", "");
    },
  });

  const channel = useChannel("demo");

  useEffect(() => {
    if (channel) {
      channel.bind("pointermove", (event) => {
        setLocation((state) => ({
          ...state,
          [event.clientId]: event.data as [number, number],
        }));
      });
      channel.bind("onmessage", (event) => {
        setMemberMessages((state) => ({
          ...state,
          [event.clientId]: event.data as string,
        }));
      });
    }
  }, [channel]);

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
          (memberId) =>
            memberId !== channel.clientId && (
              <Cursor
                key={memberId}
                label={memberId}
                location={location[memberId]}
                text={memberMessages[memberId]}
              />
            ),
        )}
      {disabled && (
        <HoverInput
          value={message}
          onChange={handleMessageChange}
          location={[x, y]}
          ref={inputRef}
          isEnabled={isEnabled}
        />
      )}
    </div>
  );
};

export default DemoChat;
