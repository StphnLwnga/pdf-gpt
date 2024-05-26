"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Document } from "langchain/document";
import { PdfDocument, PdfNote } from "@prisma/client";
import Loading from "@/components/loading";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const PDFNotes = ({ id }: { id: string }) => {
  const [pdfNotes, setPdfNotes] = useState<PdfNote[] | null>();
  const [loading, setLoading] = useState(false);

  const { resolvedTheme } = useTheme();

  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const {
          data: { notes },
        } = await axios.post(`/api/doc/${id}/generate`, { id });
        console.log(notes);
        setPdfNotes(notes);
      } catch (err) {
        console.log("Notes Generation", err);
        toast({
          title: "🚫️ Failed to generate notes for this document",
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center">
      {!pdfNotes && <Loading />}
      {pdfNotes && (
        <ScrollArea className="p-1 h-full w-full">
          <ul className="list-disc p-1 gap-x-2">
            {pdfNotes.map((note: PdfNote) => (
              <li>
                <span className="text-xs pr-1">✨️</span>
                <span
                  className={cn(
                    "text-xs ",
                    resolvedTheme !== "dark" && "text-slate-500",
                  )}
                >
                  {note.note}
                </span>
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </div>
  );
};

export default PDFNotes;
