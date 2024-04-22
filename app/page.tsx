import Image from "next/image";
import PDFInput from "./_components/pdf-input/PDFInput";

export default function Home() {
  return (
    <main className="flex max-h-[100vh] flex-col items-center justify-between pt-[9vh] pb-1">
      <PDFInput />
    </main>
  );
}
