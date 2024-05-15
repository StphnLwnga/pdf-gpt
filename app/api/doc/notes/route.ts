/**
 * Get the code from here: https://github.com/StphnLwnga/rag-101/blob/main/api/src/notes/index.ts
 */

// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import axios from "axios";
import { PDFDocument } from "pdf-lib";
import * as fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { formatDocumentsAsString } from "langchain/util/document";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Document } from "langchain/document";
import * as pdfs from "@/lib/mock.json";
import { loadPdfFromUrl, convertPdfToDocuments } from "@/lib/helpers";
import { Paper } from "@/lib/types";
import { db, prismaVectorStore } from "@/lib/database/db";

/**
 * Sends a POST request to the OpenAI API to generate a summary of the PDF
 * with the given title and URL and saves it in the database.
 *
 * @param {Request} req - The request object.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 */
export async function POST(req: Request): Promise<NextResponse> {
  try {
    // const { userId } = auth();
    // if (!userId) throw new Error("Unauthorized");

    // Extract PDF title, URL & pages to delete from request body
    const {
      pdfTitle,
      pdfUrl,
      pagesToDelete,
    }: { pdfTitle: string; pdfUrl: string; pagesToDelete: string } =
      await req.json();

    if (!pdfTitle || !pdfUrl)
      return new NextResponse("Invalid request, name and URL are required", {
        status: 400,
      });

    // TODO: Check if the PDF already exists in the database and handle accordingly
    const existingPdf = await db.pdfDocument.findUnique({
      where: { pdf_url: pdfUrl },
    });

    if (!!existingPdf)
      return NextResponse.json(
        {
          pdfExists: true,
          pdfId: existingPdf.id,
        },
        { status: 200 },
      );

    // const pdfAsBuffer = await loadPdfFromUrl({ url: pdfUrl });

    // const docs = await convertPdfToDocuments(pdfAsBuffer, pdfTitle);
    // console.log(docs);

    // if (!docs) return new NextResponse("PDF not saved", { status: 400 });

    const pdfDocument = await db.pdfDocument.create({
      data: {
        pdf_url: pdfUrl,
        pdf_title: pdfTitle,
      },
    });

    return NextResponse.json({ pdfId: pdfDocument.id }, { status: 200 });
  } catch (error) {
    console.log("[NOTES_GENERATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

/**
 * Retrieves all the PDF files and associated QA chat history for that file from the database.
 *
 * @param {Request} req - The request object.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the notes as JSON.
 */
export async function GET(req: Request): Promise<NextResponse> {
  try {
    // const { userId } = auth();
    // if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const pdfDocuments = await db.pdfDocument.findMany({
      select: {
        id: true,
        pdf_url: true,
        pdf_title: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(pdfDocuments);
  } catch (error) {
    console.log("[FILES_LIST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
