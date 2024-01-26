/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { api } from "~/trpc/server";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { openai } from "~/lib/openai";
import { cookies } from "next/headers";
import { createClient } from "~/lib/supabase/server";
import Navbar from "~/components/Navbar";

export default function Pools() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });

  async function joinTopic(formData: FormData) {
    "use server";
    const { userId, getToken } = auth();
    // if (!userId) {
    //   throw new Error("Not signed in");
    // }

    const token = (await getToken({ template: "supabase" }))!;
    const cookieStore = cookies();
    const supabaseClient = createClient(cookieStore, token);

    const topic = formData.get("topic") as string;

    // find the most similar topic or create one
    const {
      data: [embeddingObj],
      usage: { total_tokens },
    } = await openai.embeddings.create({
      input: topic,
      model: "text-embedding-ada-002",
      user: userId!,
    });

    const embedding = embeddingObj?.embedding;

    // check similarity to existing topics (documents/pagesections/embedded topics )
    const res = await supabaseClient.rpc("match_page_sections", {
      embedding,
      match_threshold: 0.9,
      match_count: 10,
      min_content_length: 1,
    });
    const { error: matchError } = res;
    const documents = res.data as Record<string, unknown>[]; // TODO: type out document object

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
      } catch (e) {
        console.error(e);
      }
    } else if (documents) {
      match = documents[0]!.content as string;
    }

    redirect(`/pools/${match}`);
  }

  return (
    <>
      <Navbar />
      <div className="mt-[-60px] flex max-w-3xl flex-grow flex-col items-center justify-center gap-6 px-3 md:mx-auto">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Dive in.
        </h1>

        <form
          className="flex w-full max-w-sm items-center justify-between gap-2"
          action={joinTopic}
        >
          <Input
            name="topic"
            type="text"
            placeholder="Enter a topic"
            className="placeholder:dark:text-gray-300"
          />
          <Button type="submit" title="join a topic">
            Join
          </Button>
        </form>
      </div>
    </>
  );
}
