// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Document } from "langchain/document";
import { PdfNote, PrismaClient } from "@prisma/client";
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
      include: { pdf_notes: true },
    });

    if (!pdfDoc) return new NextResponse("File not found", { status: 500 });

    const { pdf_text, pdf_notes } = pdfDoc;

    if (pdf_notes.length > 0) {
      return NextResponse.json({ notes: pdf_notes }, { status: 200 });
    }

    const notes = await generateNotes(pdf_text);

    const savedNotes = await db.pdfNote.createManyAndReturn({
      data: notes.map((note: PdfNote) => ({
        note: note.note,
        pdfDocumentId: id,
      })),
    });

    console.log(savedNotes);

    return NextResponse.json({ notes }, { status: 200 });
  } catch (error) {
    console.log("[PDF_NOTES_GEN]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
