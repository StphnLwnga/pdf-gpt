import { create } from "zustand";
import { Paper } from "./types";

type State = {
  activePdfId: string | null;
  pdfDocsArray: Paper[];
  loadingDoc: boolean;
};

type Action = {
  setActivePdfId: (pdfId: string | null) => void;
  setPdfDocsArray: (pdfDocs: Paper[]) => void;
  updatePdfDocsArray: (pdfDoc: Paper) => void;
  setLoadingDoc: (loadingDoc: boolean) => void;
};

export const usePdfStore = create<State & Action>((set) => ({
  activePdfId: null,
  pdfDocsArray: [],
  loadingDoc: false,
  setActivePdfId: (pdfId: string | null) =>
    set((state: State) => ({ activePdfId: pdfId })),
  setPdfDocsArray: (pdfDocs: Paper[]) =>
    set((state: State) => ({ pdfDocsArray: pdfDocs })),
  updatePdfDocsArray: (pdfDoc: Paper) => {
    set((state: State) => ({
      pdfDocsArray: [...state.pdfDocsArray, pdfDoc],
    }));
  },
  setLoadingDoc: (loadingDoc) => set((state: State) => ({ loadingDoc })),
}));
