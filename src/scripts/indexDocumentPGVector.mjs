// Call embeding API and insert to supabase
// Ref: https://js.langchain.com/docs/modules/indexes/vector_stores/integrations/supabase
import { Document } from "langchain/document";
import dotenv from "dotenv";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import fs from "fs";
import path from "path";

dotenv.config({ path: `.env.local` });

const fileNames = fs.readdirSync("documents");
// const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
//   chunkSize: 1000,
//   chunkOverlap: 200,
// });

const langchainDocs = await Promise.all(
  fileNames.map((fileName) => {
    const filePath = path.join("documents", fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");
    // Splitting not necessary with gpt-4
    // const splitDocs = await splitter.splitText(fileContent);
    // return splitDocs.map((doc) => {
    //   return new Document({
    //     metadata: { fileName },
    //     pageContent: doc,
    //   });
    // });
    return new Document({
      metadata: { fileName },
      pageContent: fileContent,
    });
  }),
);

const auth = {
  detectSessionInUrl: false,
  persistSession: false,
  autoRefreshToken: false,
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.SUPABASE_ANON_KEY ?? "";
const client = createClient(supabaseUrl, supabaseKey, { auth });

await SupabaseVectorStore.fromDocuments(
  langchainDocs.flat(),
  new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
  {
    client,
    tableName: "documents",
  },
);
