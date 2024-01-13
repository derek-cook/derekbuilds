"use client";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/Button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Input } from "~/components/ui/Input";
import { MessageBubble } from "~/components/MessageBubble";
import { useRef, useState } from "react";

const MAX_CHAR_COUNT = 50;

export default function Pool({ params }: { params: { topic: string } }) {
  const router = useRouter();
  const [ownText, setOwnText] = useState("");
  const msgContainerRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    console.log(value);
    if (value.length > MAX_CHAR_COUNT) {
      value = value.slice(1, value.length);
    }
    msgContainerRef.current?.scrollTo(0, 999999);
    setOwnText(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit", e.target.messageInput.value as string);
    // send message to realtime
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
        <MessageBubble isOwn={false}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
          quibusdam maiores praesentium sit eius repellendus deleniti,
          accusantium magnam, cum, quis amet. Quae beatae, consequatur veniam
          nemo ab quas saepe enim!
        </MessageBubble>
        <MessageBubble isOwn={false}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
          quibusdam maiores praesentium sit eius repellendus deleniti,
          accusantium magnam, cum, quis amet. Quae beatae, consequatur veniam
          nemo ab quas saepe enim!
        </MessageBubble>

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
