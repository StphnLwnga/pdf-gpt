import {
  PrismaClient,
  Prisma,
  Document_Embeddings,
  PdfDocument,
  PdfNote,
  Question_Answering,
} from "@prisma/client";
import { PrismaVectorStore } from "@langchain/community/vectorstores/prisma";
import { OpenAIEmbeddings } from "@langchain/openai";

declare global {
  var prisma: PrismaClient | undefined;
}

// Appending prisma client to globalThis prevents creation on a new PrismaClient on every hot reload
// globalThis is unaffacted by hot reload
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

export const prismaVectorStore =
  PrismaVectorStore.withModel<Document_Embeddings>(db).create(
    new OpenAIEmbeddings(),
    {
      prisma: Prisma,
      tableName: "Document_Embeddings",
      vectorColumnName: "vector",
      columns: {
        id: PrismaVectorStore.IdColumn,
        content: PrismaVectorStore.ContentColumn,
      },
    },
  );
