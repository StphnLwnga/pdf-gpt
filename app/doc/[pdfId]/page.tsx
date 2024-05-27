import React, { Suspense } from "react";
import { createStreamableUI } from "ai/rsc";
import { redirect, useSearchParams } from "next/navigation";
import { formatDocumentsAsString } from "langchain/util/document";
import { Document } from "langchain/document";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Paper } from "@/lib/types";
import { loadPdfFromUrl, convertPdfToDocuments } from "@/lib/helpers";
import PageLoadBackdrop from "@/components/page-load-backdrop";
import { PDFChat, PDFNotes, PDFViewer } from "./_components";
import { db } from "@/lib/database/db";
import { PdfDocument, PdfNote } from "@prisma/client";
import Loading from "@/components/loading";

export default async function DocPage({
  params,
  searchParams,
}: {
  params: { pdfId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // const PdfDocUI = createStreamableUI();

  // PdfDocUI.update(<PageLoadBackdrop />);

  const { pdfId } = params;

  if (!pdfId) redirect("/");

  const pdfDocument: (PdfDocument & { pdf_notes: PdfNote[] }) | null =
    await db.pdfDocument.findFirst({
      where: { id: pdfId },
      include: {
        pdf_notes: true,
      },
    });

  if (!pdfDocument) redirect("/");

  const pdfAsBuffer = await loadPdfFromUrl({ url: pdfDocument?.pdf_url! });

  if (pdfDocument && !pdfDocument.pdf_text) {
    const docs = await convertPdfToDocuments(
      pdfAsBuffer,
      pdfDocument?.pdf_title,
    );
    const pdf_text = formatDocumentsAsString(docs);
    await db.pdfDocument.update({
      where: {
        id: pdfId,
      },
      data: { pdf_text },
    });
  }

  return (
    <div className="h-full w-full">
      <ResizablePanelGroup direction="horizontal" className="w-full h-full">
        <ResizablePanel defaultSize={45}>
          <Suspense fallback={<Loading />}>
            <PDFViewer pdfDoc={pdfAsBuffer.toString("base64")} />
          </Suspense>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={55}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={45}>
              <Suspense fallback={<Loading />}>
                <PDFNotes id={pdfId} />
              </Suspense>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={55}>
              <Suspense fallback={<Loading />}>
                <PDFChat />
              </Suspense>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
