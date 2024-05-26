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
import { PdfDocument } from "@prisma/client";
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

  let { continueBackdrop } =
    searchParams.continueBackdrop === "false"
      ? { continueBackdrop: false }
      : { continueBackdrop: undefined };

  if (!pdfId) redirect("/");

  const pdfDocument: PdfDocument | null = await db.pdfDocument.findFirst({
    where: { id: pdfId },
  });

  if (!pdfDocument) redirect("/");

  const pdfAsBuffer = await loadPdfFromUrl({ url: pdfDocument?.pdf_url! });

  let docs: Document[];
  if (pdfDocument && !pdfDocument.pdf_text) {
    docs = await convertPdfToDocuments(pdfAsBuffer, pdfDocument?.pdf_title);
    const pdf_text = formatDocumentsAsString(docs);
    const updatedPdfDocument = await db.pdfDocument.update({
      where: {
        id: pdfId,
      },
      data: { pdf_text },
    });
    console.log(updatedPdfDocument);
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
            <ResizablePanel defaultSize={35}>
              <Suspense fallback={<Loading />}>
                <PDFNotes />
                <span className="text-2xl italic">{pdfId}</span>
              </Suspense>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={65}>
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
