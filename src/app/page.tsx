/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { api } from "~/trpc/server";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { openai } from "~/lib/openai";
import { cookies } from "next/headers";
import { createClient } from "~/lib/supabase/server";

export default function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });

  async function joinTopic(formData: FormData) {
    "use server";
    const { userId, getToken } = auth();
    if (!userId) {
      throw new Error("Not signed in");
    }

    const token = (await getToken({ template: "supabase" }))!;
    const cookieStore = cookies();
    const supabaseClient = createClient(cookieStore, token);

    const topic = formData.get("topic") as string;

    // find the most similar topic or create one
    const {
      data: [{ embedding }],
      usage: { total_tokens },
    } = await openai.embeddings.create({
      input: topic,
      model: "text-embedding-ada-002",
      user: userId,
    });

    // check similarity to existing topics (documents/pagesections/embedded topics )
    const { error: matchError, data } = await supabaseClient.rpc(
      "match_page_sections",
      {
        embedding,
        match_threshold: 0.86,
        match_count: 10,
        min_content_length: 1,
      },
    );
    const documents = data as Record<string, unknown>[]; // TODO: type out document object

    console.log({ matchError, documents, embedding: embedding?.length });

    let match = topic;
    // if no matches, insert the embedding
    if (documents && documents.length === 0) {
      try {
        const res = await supabaseClient
          .from("nods_page_section")
          .insert({
            embedding,
            content: topic,
            token_count: total_tokens,
            slug: "",
          })
          .select()
          .single();
        match = res.data.content as string;
        console.log({ res });
      } catch (e) {
        console.error(e);
      }
    } else if (documents) {
      match = documents[0]!.content as string;
    }

    // create a channel with the matched topic

    // console.log({ matchError, pageSections });

    redirect(`/pool/${match}`);
  }

  return (
    <main className="mt-[-50px] flex max-w-3xl flex-grow flex-col items-center justify-center gap-6 px-3 md:mx-auto">
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
    </main>
  );
}
