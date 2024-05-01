import React from "react";
import {
  PDFChat,
  PDFNotes,
  PDFViewer,
} from "./_components";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import * as fs from "fs";
import { redirect } from "next/navigation";
import { Paper } from "@/lib/types";
import { loadPdfFromUrl } from "@/lib/helpers";

export default async function DocPage({ params }: { params: { pdfId: string };  }) {
  const { pdfId } = params;

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
            <ResizablePanel defaultSize={25}>
              <PDFNotes />
              <span className="text-2xl italic">{pdfId}</span>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
              <PDFChat />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
