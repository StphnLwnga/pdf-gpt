export interface Paper {
  id: string;
  pdf_text: string | undefined | null;
  pdf_title: string;
  pdf_url: string;
  created_at: string | undefined | null;
  notes: Array<PdfNote> | undefined | null;
}

export interface PdfNote {
  note: string;
  pageNumbers: Array<number>;
}
