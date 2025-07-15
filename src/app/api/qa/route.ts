import { type NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export const POST = async (req: NextRequest) => {
  const { prompt } = (await req.json()) as { prompt: string };

  const response = await openai.responses.create({
    model: "gpt-4.1-nano",
    input: prompt,
    stream: true,
    instructions: `Answer the questions as Derek's AI assistant. You will answer questions related to Derek's resume and projects.
        Keep answers brief or summarize when necessary.
        Answers must be based on documents from the file search results, such as Derek's resume and project info. If questions aren't related to the documents say 'I don't have information on that'`,
    tool_choice: { type: "file_search" },
    tools: [
      {
        type: "file_search",
        vector_store_ids: ["vs_68759b5450b8819188071c849083ba8b"],
        max_num_results: 2,
      },
    ],
  });

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
        if (chunk.type === "response.output_text.delta") {
          controller.enqueue(new TextEncoder().encode(chunk.delta));
        }
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
