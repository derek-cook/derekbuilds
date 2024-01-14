"use client";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/Button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Input } from "~/components/ui/Input";
import { MessageBubble } from "~/components/MessageBubble";
import { useEffect, useRef, useState } from "react";
import { useChannel } from "ably/react";
import { type Types } from "ably";
import { useAuth } from "@clerk/nextjs";

const MAX_CHAR_COUNT = 50;

export default function Pool({ params }: { params: { topic: string } }) {
  const router = useRouter();
  const { userId } = useAuth();
  const [ownText, setOwnText] = useState("");
  const [messageHistory, setMessageHistory] = useState<Types.Message[]>([]);
  const msgContainerRef = useRef<HTMLDivElement>(null);

  const { channel } = useChannel(params.topic, (message) => {
    console.log({ message });
    setMessageHistory((prev) => [message, ...prev]);
  });

  useEffect(() => {
    msgContainerRef.current?.scrollTo(0, 999999);
  }, [messageHistory]);

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
    setOwnText("");
    msgContainerRef.current?.scrollTo(0, 999999);

    // send message to realtime
    await channel.publish("MESSAGE", {
      sentBy: userId,
      value,
    });
  };

  return (
    <div className="flex max-h-screen flex-1 flex-col space-y-8 p-4">
      <div className="flex items-center">
        <Button
          title="back"
          className="pl-0"
          variant="link"
          onClick={() => router.back()}
        >
          <ChevronLeftIcon className="h-8 w-8" />
        </Button>
        <h1 className="text-xl">{decodeURI(params.topic)}</h1>
      </div>
      <div
        ref={msgContainerRef}
        id="messages-container"
        className="flex flex-1 flex-grow flex-col overflow-y-scroll text-white"
      >
        <div className="flex min-h-0 flex-col-reverse">
          {messageHistory.map((msg) => (
            <MessageBubble key={msg.id} isOwn={msg.data.sentBy === userId}>
              {msg.data.value}
            </MessageBubble>
          ))}
        </div>
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
