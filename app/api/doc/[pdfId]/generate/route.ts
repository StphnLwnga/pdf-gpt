// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Document } from "langchain/document";
import { PrismaClient } from "@prisma/client";
import { db } from "@/lib/database/db";
import { generateNotes } from "@/lib/helpers";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    // const { userId } = auth();
    // if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { id } = await req.json();

    if (!id) return new NextResponse("File not found", { status: 500 });

    const pdfDoc = await db.pdfDocument.findFirst({
      where: { id },
      select: { pdf_text: true },
    });

    if (!pdfDoc) return new NextResponse("File not found", { status: 500 });

    const { pdf_text } = pdfDoc;

    const notes = await generateNotes(pdf_text);

    // console.log({ notes });

    // await db.PdfNote.create({
    //   data: {
    //     note: notes,
    //     pdfDocumentId: id,
    //   },
    // });

    return NextResponse.json({ notes }, { status: 200 });
  } catch (error) {
    console.log("[PDF_NOTES_GEN]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
