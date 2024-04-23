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

export default function DocPage({ params }: { params: { pdfId: string } }) {
  const { pdfId } = params;

  return (
    <div className="h-full w-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full h-full rounded-lg"
      >
        <ResizablePanel defaultSize={45}>
          <PDFViewer />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={55}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={25}>
              <PDFNotes />
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
