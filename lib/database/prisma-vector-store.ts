import { Document } from "langchain/document";
import { PrismaVectorStore, PrismaSqlFilter } from "@langchain/community/vectorstores/prisma";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PrismaClient, Prisma, Document_Embeddings, PdfDocument, PdfNote, Question_Answering } from "@prisma/client";
import { Database } from '@/lib/generated/db-types';
import { db } from "@/lib/db";

export class PrismaSupabaseDatabase {
	vectorStore: PrismaVectorStore<Database>;
}