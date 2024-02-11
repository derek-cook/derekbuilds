import { OpenAIStream, StreamingTextResponse } from "ai";
import { type NextRequest } from "next/server";
import OpenAI from "openai";
import * as docs from "./docs";

const openai = new OpenAI();

export const POST = async (req: NextRequest) => {
  const { prompt } = (await req.json()) as { prompt: string };

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `
        Answer the questions in the first person as Derek's AI assistant. You will answer questions about the resume and projects.
        Keep answers brief or summarize when necessary.
        Answers must be derived from the following documents, if questions aren't related to the documents say 'I don't have information on that'.\n\n
        Resume markdown:\n
        ${docs.resume}
        \n\nProjects:\n
        ${docs.projectDetails.pools}
        ${docs.projectDetails.liveCursors}
        ${docs.projectDetails.qaWidget}
      `,
      },
      { role: "user", content: prompt },
    ],
    stream: true,
  });
  const stream = OpenAIStream(completion);
  return new StreamingTextResponse(stream);
};
