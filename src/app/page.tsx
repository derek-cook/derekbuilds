import { api } from "~/trpc/server";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { redirect } from "next/navigation";
import { getUserAuth } from "~/lib/auth/utils";
import Link from "next/link";

export default async function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  const userAuth = await getUserAuth();

  async function joinTopic(formData: FormData) {
    "use server";

    const topic = formData.get("topic") as string;

    // find the most similar topic or create one

    await new Promise((resolve) => setTimeout(resolve, 1000));
    // await api.pool.mutate({ topic });

    redirect(`/pool/${topic}`);
  }

  return (
    <div className="mt-[-50px] flex flex-grow flex-col items-center justify-center gap-12">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Dive in. <span className="text-[hsl(174,100%,84%)]"></span>
      </h1>

      <form
        className="flex w-full max-w-sm items-center justify-between gap-2"
        action={joinTopic}
      >
        <Input
          className=" bg-stone-50 text-black"
          name="topic"
          type="text"
          placeholder="Name"
        />
        <Button type="submit" title="join a topic">
          Join
        </Button>
      </form>
    </div>
  );
}
