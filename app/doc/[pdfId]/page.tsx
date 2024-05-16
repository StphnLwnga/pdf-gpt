import React from "react";
import { redirect, useSearchParams } from "next/navigation";
import * as fs from "fs";
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

export default async function DocPage({
  params,
  searchParams,
}: {
  params: { pdfId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { pdfId } = params;
  console.log({ pdfId });

  let { continueBackdrop } =
    searchParams.continueBackdrop === "false"
      ? { continueBackdrop: false }
      : { continueBackdrop: undefined };

  console.log({ continueBackdrop });

  if (!pdfId) redirect("/");

  const pdfDocument: PdfDocument | null = await db.pdfDocument.findFirst({
    where: { id: pdfId },
  });

  if (!pdfDocument) redirect("/");

  const pdfAsBuffer = await loadPdfFromUrl({ url: pdfDocument?.pdf_url });
  continueBackdrop = true;
  const docs = await convertPdfToDocuments(pdfAsBuffer, pdfDocument?.pdf_title);
  console.log(docs);
  continueBackdrop = false;

  return (
    <div className="h-full w-full">
      <PageLoadBackdrop pageLoad={continueBackdrop} />
      <ResizablePanelGroup direction="horizontal" className="w-full h-full">
        <ResizablePanel defaultSize={45}>
          <PDFViewer pdfDoc={pdfAsBuffer.toString("base64")} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={55}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={35}>
              <PDFNotes />
              <span className="text-2xl italic">{pdfId}</span>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={65}>
              <PDFChat />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
