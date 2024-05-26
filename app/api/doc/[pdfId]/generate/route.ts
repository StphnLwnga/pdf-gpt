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

    const { id, url, documents } = await req.json();

    const notes = await generateNotes(id, url, documents);

    await db.PdfNote.create({
      data: {
        note: notes,
        pdfDocumentId: id,
      },
    });

    return NextResponse.json({ notes }, { status: 200 });
  } catch (error) {
    console.log("[PDF_NOTES_GEN]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
