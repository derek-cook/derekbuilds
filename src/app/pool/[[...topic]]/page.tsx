"use client";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/Button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Input } from "~/components/ui/Input";

export default function Pool({ params }: { params: { topic: string } }) {
  const router = useRouter();

  // TODO: connect to realtime for a channel, send messages, etc

  return (
    <div className="flex flex-grow flex-col space-y-8 p-4">
      <div className="flex items-center">
        <Button
          title="back"
          className="pl-0"
          variant="link"
          onClick={() => router.back()}
        >
          <ChevronLeftIcon className="h-8 w-8" />
        </Button>
        <h1 className="align-middle text-3xl">{params.topic}</h1>
      </div>
      <div
        id="messages-container"
        className="flex-grow space-y-2 px-3 text-white"
      >
        <p className="bg-opacity w-fit rounded-lg rounded-bl-none bg-slate-500 p-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
          quibusdam maiores praesentium sit eius repellendus deleniti,
          accusantium magnam, cum, quis amet. Quae beatae, consequatur veniam
          nemo ab quas saepe enim!
        </p>
        <p className="bg-opacity w-fit rounded-lg rounded-bl-none bg-slate-500 p-2">
          thats crazy
        </p>
      </div>
      <form className="space-y-2" action="">
        <Input placeholder="Send a message" />
        <Button className="w-full" title="Send message">
          Send
        </Button>
      </form>
    </div>
  );
}
