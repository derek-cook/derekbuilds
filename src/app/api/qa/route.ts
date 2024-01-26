import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { createClient } from "@supabase/supabase-js";
import { OpenAI } from "langchain/llms/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { StreamingTextResponse, LangChainStream } from "ai";
import { CallbackManager } from "langchain/callbacks";
import { BufferMemory } from "langchain/memory";
import { env } from "~/env.mjs";
import { type NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { prompt: rawInput } = (await req.json()) as { prompt: string };

  const privateKey = env.SUPABASE_ANON_KEY;
  if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);

  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) throw new Error(`Expected env var SUPABASE_URL`);

  const auth = {
    detectSessionInUrl: false,
    persistSession: false,
    autoRefreshToken: false,
  };
  const client = createClient(url, privateKey, { auth });

  const vectorStore = await SupabaseVectorStore.fromExistingIndex(
    new OpenAIEmbeddings({ openAIApiKey: env.OPENAI_API_KEY }),
    {
      client,
      tableName: "documents",
      queryName: "match_documents",
    },
  );

  const { stream, handlers } = LangChainStream();

  const model = new OpenAI({
    streaming: true,
    modelName: "gpt-4-0125-preview",
    openAIApiKey: env.OPENAI_API_KEY,
    callbackManager: CallbackManager.fromHandlers(handlers),
    temperature: 1,
  });

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever(),
    {
      // k: 1,
      memory: new BufferMemory({
        memoryKey: "chat_history",
      }),
      returnSourceDocuments: false,
    },
  );

  chain.call({ question: rawInput }).catch(console.error);
  return new StreamingTextResponse(stream);
};
