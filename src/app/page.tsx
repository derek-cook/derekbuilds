import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import { redirect } from "next/navigation";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "from tRPC" });

  async function joinTopic(formData: FormData) {
    "use server";

    const topic = formData.get("topic") as string;

    // find the most similar topic or create one

    // await new Promise((resolve) => setTimeout(resolve, 1000));
    await api.pool.mutate({ topic });

    redirect(`/pool/${topic}`);
  }

  return (
    <main className=" flex min-h-screen flex-col items-center  justify-center text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Dive in. <span className="text-[hsl(174,100%,84%)]"></span>
        </h1>

        <form
          className="flex w-full max-w-sm items-center space-x-2"
          action={joinTopic}
        >
          <Input
            className="bg-stone-50 text-black"
            name="topic"
            type="text"
            placeholder="Name"
          />
          <Button type="submit" title="join a topic">
            Join
          </Button>
        </form>
      </div>
    </main>
  );
}
