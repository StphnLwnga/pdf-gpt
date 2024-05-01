import React from "react";
import { redirect, useSearchParams } from 'next/navigation'
import * as fs from "fs";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Paper } from "@/lib/types";
import { loadPdfFromUrl } from "@/lib/helpers";
import PageLoadBackdrop from "@/components/page-load-backdrop";
import {
  PDFChat,
  PDFNotes,
  PDFViewer,
} from "./_components";


export default async function DocPage({ params, searchParams }: { params: { pdfId: string }; searchParams: { [key: string]: string | string[] | undefined } }) {
  const { pdfId } = params;
  
  const { continueBackdrop } = searchParams.continueBackdrop === 'false' ? { continueBackdrop: false } : { continueBackdrop: undefined };

  console.log({continueBackdrop})

  /**
   * TODO: Read document data directly from database and storage 
   * Pass data to components
   */

  const savedFiles = JSON.parse(fs.readFileSync("lib/mock.json", "utf-8"));

  const pdfData: Paper = savedFiles.find((pdf: Paper) => pdf.id === pdfId);

  const pdfDoc = await loadPdfFromUrl({ url: pdfData?.paper_url });

  if (!pdfData || !pdfId || !savedFiles.some((pdf: Paper) => pdf.id === pdfId)) redirect('/');

  return (
    <div className="h-full w-full">
      <PageLoadBackdrop pageLoad={continueBackdrop} />
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full h-full"
      >
        <ResizablePanel defaultSize={45}>
          <PDFViewer pdfDoc={pdfDoc.toString('base64')} />
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
