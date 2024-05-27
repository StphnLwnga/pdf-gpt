import Image from "next/image";
import { getPdfDocuments, PDFDocuments } from "@/actions/get-pdf-documents";
import PDFInput from "./_components/pdf-input/pdf-input";

export default async function Home(): Promise<JSX.Element> {
  // const { pdfDocuments } = await getPdfDocuments();
  return (
    <main className="flex max-h-[100vh] flex-col items-center justify-between pt-[9vh] pb-1">
      <PDFInput />
    </main>
  );
}
