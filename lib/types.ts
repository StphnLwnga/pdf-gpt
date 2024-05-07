export interface Paper {
  id: string;
  pdf_text: string;
  pdf_title: string;
  pdf_url: string;
  created_at: string;
  notes: Array<PdfNote>;
}

export interface PdfNote {
  note: string;
  pageNumbers: Array<number>;
}
