import React from "react";
import {
  LoadingPDFNotes,
  LoadingPDFViewer,
  PDFChat,
  PDFNotes,
  PDFViewer,
} from "./_components";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import { redirect } from "next/navigation";
import { Paper } from "@/lib/types";
import { loadPdfFromUrl } from "@/lib/helpers";

export default async function DocPage({ params }: { params: { pdfId: string };  }) {
  const { pdfId } = params;

  const savedFiles = JSON.parse(fs.readFileSync("lib/mock.json", "utf-8"));

  const pdfData: Paper = savedFiles.find((pdf: Paper) => pdf.id === pdfId);

  // console.log(pdfData)

  // if (!pdfData || !pdfId || !savedFiles.some((pdf: Paper) => pdf.id === pdfId)) redirect('/');

  return (
    <div className="h-full w-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full h-full"
      >
        <ResizablePanel defaultSize={45}>
          <PDFViewer pdfUrl={pdfData?.paper_url} pdfId={pdfId} />
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
