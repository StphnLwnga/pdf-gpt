import { Document } from "langchain/document";
import {
  PrismaVectorStore,
  PrismaSqlFilter,
} from "@langchain/community/vectorstores/prisma";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import {
  PrismaClient,
  Prisma,
  Document_Embeddings,
  PdfDocument,
  PdfNote,
  Question_Answering,
} from "@prisma/client";
import { Database } from "@/lib/generated/db-types";
import { db } from "@/lib/database/db";

export class PrismaSupabaseDatabase {
  vectorStore: PrismaVectorStore<Document_Embeddings, "Document_Embeddings">;

  constructor(vectorStore) {
    this.vectorStore = vectorStore;
  }
}
