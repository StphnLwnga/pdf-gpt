import axios from "axios";
import { PDFDocument } from "pdf-lib";
import { writeFile } from "fs";
import * as fs from "fs";
import path from "path";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { UnstructuredLoader } from "langchain/document_loaders/fs/unstructured";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { PdfNote } from "@prisma/client";
import { formatDocumentsAsString } from "langchain/util/document";
import { model } from "./model";
import {
  NOTES_TOOL_SCHEMA,
  NOTE_PROMPT,
  outputParser,
} from "./prompts/note-prompt";
import { db } from "./database/db";

/**
 * Loads a PDF file from a given URL.
 *
 * @param {Object} url - The URL of the PDF file to load.
 * @return {Promise<Buffer>} A promise that resolves with the loaded PDF file as a Buffer.
 */
export async function loadPdfFromUrl({
  url,
}: {
  url: string;
}): Promise<Buffer> {
  try {
    console.log("Loading PDF from URL...");
    const response = await axios.get(url, { responseType: "arraybuffer" });
    console.log("PDF loaded successfully 📜📜📜");
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("PDF fetching failed 🩻");
  }
}

/**
 * Deletes specified pages from a PDF document and returns the modified PDF as a Buffer.
 *
 * @param {Buffer} pdf - The PDF document as a Buffer.
 * @param {Array<number>} pagesToDelete - An array of page numbers to delete.
 * @return {Promise<Buffer>} - The modified PDF document as a Buffer.
 */
export async function deletePages(
  pdf: Buffer,
  pagesToDelete: Array<number>,
): Promise<Buffer> {
  try {
    const pdfDoc = await PDFDocument.load(pdf);

    let numToOffsetBy = 1;
    for (const pageNumber of pagesToDelete) {
      pdfDoc.removePage(pageNumber - numToOffsetBy);
      numToOffsetBy += 1;
    }
    console.log("Pages deleted successfully 🗑️");
    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete pages 🩻");
  }
}

export async function convertPdfToDocuments(
  pdf: Buffer,
  pdfTitle: string,
): Promise<Document[]> {
  if (!process.env.UNSTRUCTURED_API_KEY)
    throw new Error("Missing Unstructured API key");

  // create file name for each Document created from the PDF using UUIDv4
  const fileName = pdfTitle.toLowerCase().replace(/ /g, "-");

  // check if folder exists
  if (!fs.existsSync("pdfs")) fs.mkdirSync("pdfs");

  const pdfPath = `pdfs/${fileName}.pdf`;
  // Save Document to file
  if (!fs.existsSync(pdfPath)) fs.writeFileSync(pdfPath, pdf, "binary");

  // const loader = new PDFLoader(pdfPath);
  // Use with PDFLoader
  // const splitter = new RecursiveCharacterTextSplitter({
  //   chunkSize: 1000,
  //   chunkOverlap: 200,
  // });
  // const docs = await loader.loadAndSplit(splitter);

  // create Unstructured loader if Unstructured API key is provided
  const loader = new UnstructuredLoader(pdfPath, {
    apiKey: process.env.UNSTRUCTURED_API_KEY,
    apiUrl: process.env.UNSTRUCTURED_DIRECT_URL,
    strategy: "hi_res",
  });

  try {
    const docs = await loader.load();
    console.log("PDF converted successfully 🔀🔀");
    // delete temporary PDF file
    fs.unlinkSync(pdfPath);
    return docs;
  } catch (error) {
    console.log(error);
    throw new Error("PDF to Document conversion failed 🩻");
  }
}

/**
 * Generate notes based on the provided documents.
 *
 * @param {Array<Document>} documents - array of documents
 * @return {Promise<any>} the result of generating notes
 */
export async function generateNotes(
  // documents: Array<Document>,
  documentAsStr: string,
): Promise<Array<PdfNote>> {
  try {
    // const documentAsStr = formatDocumentsAsString(documents);

    const modelWithTool = model.bind({
      tools: [NOTES_TOOL_SCHEMA],
    });

    const chain = NOTE_PROMPT.pipe(modelWithTool).pipe(outputParser);

    const notes = await chain.invoke({ document: documentAsStr });

    return notes;
  } catch (error) {
    console.log(error);
    throw new Error("Notes generation failed 🩻");
  }
}
