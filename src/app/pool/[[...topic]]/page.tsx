"use client";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/Button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Input } from "~/components/ui/Input";

export default function Pool({ params }: { params: { topic: string } }) {
  const router = useRouter();
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
      <div id="messages-container" className="container flex-grow text-white">
        <p className="bg-opacity inline rounded-lg rounded-bl-none bg-slate-500 p-2">
          Hello here's some text
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
