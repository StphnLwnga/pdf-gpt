export interface Paper {
  id: string;
  paper_text: string;
  paper_title: string;
  paper_url: string;
  created_at: string;
  notes: Array<Note>;
}

export interface Note {
  note: string;
  page_numbers: Array<number>;
}
