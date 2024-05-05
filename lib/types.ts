export interface Paper {
  id: string;
  pdf_text: string;
  pdf_title: string;
  pdf_url: string;
  created_at: string;
  notes: Array<Note>;
}

export interface Note {
  note: string;
  page_numbers: Array<number>;
}
