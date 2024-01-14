"use client";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/Button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Input } from "~/components/ui/Input";
import { MessageBubble } from "~/components/MessageBubble";
import { useEffect, useRef, useState } from "react";
import { useChannel } from "ably/react";
import { type Types } from "ably";

const MAX_CHAR_COUNT = 50;

export default function Pool({ params }: { params: { topic: string } }) {
  const router = useRouter();
  const [ownText, setOwnText] = useState("");
  const [messageHistory, setMessageHistory] = useState<Types.Message[]>([]);
  const msgContainerRef = useRef<HTMLDivElement>(null);

  const { channel } = useChannel(params.topic, (message) => {
    console.log({ message });
    setMessageHistory((prev) => [...prev, message]);
  });

  useEffect(() => {
    msgContainerRef.current?.scrollTo(0, 999999);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
    // if (value.length > MAX_CHAR_COUNT) {
    // value = value.slice(1, value.length); // trim from the start
    // }
    if (value.length < MAX_CHAR_COUNT) {
      msgContainerRef.current?.scrollTo(0, 999999);
      setOwnText(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { value } = e.target?.messageInput;
    console.log("submit", value as string);
    // send message to realtime
    await channel.publish("MESSAGE", value);
  };

  return (
    <div className="flex flex-grow flex-col space-y-8 overflow-y-scroll p-4">
      <div className="flex items-center">
        <Button
          title="back"
          className="pl-0"
          variant="link"
          onClick={() => router.back()}
        >
          <ChevronLeftIcon className="h-8 w-8" />
        </Button>
        <h1 className="align-middle text-xl">{decodeURI(params.topic)}</h1>
      </div>
      <div
        ref={msgContainerRef}
        id="messages-container"
        className="flex h-0 min-h-full flex-grow flex-col space-y-6 overflow-y-scroll px-3 text-white"
      >
        {messageHistory.map((msg) => (
          <MessageBubble key={msg.id} isOwn={false}>
            {msg.data}
          </MessageBubble>
        ))}

        <MessageBubble isOwn={true}>some sent text</MessageBubble>
      </div>
      <form className=" space-y-2" onSubmit={handleSubmit}>
        <Input
          onChange={handleChange}
          value={ownText}
          placeholder="Send a message"
          name="messageInput"
        />
        <Button className="w-full" title="Send message" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
}
