import { create } from "zustand";
import { Paper } from "./types";
import { PdfDocument } from "@prisma/client";

type State = {
  activePdfId: string | null;
  pdfDocsArray: Partial<PdfDocument>[];
  loadingDoc: boolean;
};

type Action = {
  setActivePdfId: (pdfId: string | null) => void;
  setPdfDocsArray: (pdfDocs: Partial<PdfDocument>[]) => void;
  updatePdfDocsArray: (pdfDoc: Partial<PdfDocument>) => void;
  setLoadingDoc: (loadingDoc: boolean) => void;
};

export const usePdfStore = create<State & Action>((set) => ({
  activePdfId: null,
  pdfDocsArray: [],
  loadingDoc: false,
  setActivePdfId: (pdfId: string | null) =>
    set((state: State) => ({ activePdfId: pdfId })),
  setPdfDocsArray: (pdfDocs: Partial<PdfDocument>[]) =>
    set((state: State) => ({ pdfDocsArray: pdfDocs })),
  updatePdfDocsArray: (pdfDoc: Partial<PdfDocument>) => {
    set((state: State) => ({
      pdfDocsArray: [pdfDoc, ...state.pdfDocsArray],
    }));
  },
  setLoadingDoc: (loadingDoc) => set((state: State) => ({ loadingDoc })),
}));
