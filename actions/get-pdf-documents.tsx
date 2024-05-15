import { db } from "@/lib/database/db";
import { PdfDocument } from "@prisma/client";

export interface PDFDocuments {
  pdfDocuments: Array<Partial<PdfDocument>>;
}

export const getPdfDocuments = async (): Promise<PDFDocuments> => {
  // TODO: User auth
  try {
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

    return { pdfDocuments };
  } catch (error) {
    console.log("[GET_FILES_ACTION]", error);
    return { pdfDocuments: [] };
  }
};
