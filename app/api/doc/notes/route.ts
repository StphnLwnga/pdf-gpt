/**
 * Get the code from here: https://github.com/StphnLwnga/rag-101/blob/main/api/src/notes/index.ts
 */

// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import axios from "axios";
import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs';
import path from 'path';
import { papers } from "@/lib/mock";
import { loadPdfFromUrl } from "@/lib/helpers";

/**
 * Sends a POST request to the OpenAI API to generate a summary of the PDF 
 * with the given title and URL and saves it in the database.
 *
 * @param {Request} req - The request object.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 */
export async function POST(req: Request): Promise<NextResponse> {
	try {
		// const { userId } = auth();
		// if (!userId) throw new Error("Unauthorized");

		// Extract PDF title, URL & pages to delete from request body
		const { pdfTitle, pdfUrl, pagesToDelete } = await req.json();

		if (!pdfTitle || !pdfUrl)
			return new NextResponse("Invalid request, name and URL are required", { status: 400 });

		// TODO: Check if the PDF already exists in the database and handle accordingly

		const pdfAsBuffer = await loadPdfFromUrl({ url: pdfUrl });

		const returnEncodedUri = encodeURI(pdfTitle.trim().toLowerCase().replace(/ /g, "-"));

		/**
		 * Extract the title from the request's body.
		 * Generate the summary using the OpenAI API.
		 * Save the title and summary in the database.
		 * Return the PDF with the title and summary.
		*/

		// const data = { pdfTitle, pdfUrl, pagesToDelete };

		return NextResponse.json({ pdfAsBuffer, pdfBytes: pdfAsBuffer.byteLength, pdfId: returnEncodedUri }, { status: 200 });
		// return NextResponse.next();
	} catch (error) {
		console.log("[NOTES_GENERATE]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}

/**
 * Retrieves all the PDF files and associated QA chat history for that file from the database.
 *
 * @param {Request} req - The request object.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the notes as JSON.
 */
export async function GET(req: Request): Promise<NextResponse> {
	try {
		// const { userId } = auth();
		// if (!userId) return new NextResponse("Unauthorized", { status: 401 });

		/**
		 * Retrieve all the PDF files and associated QA chat history from the database.
		 */

		// Mock notes data
		const data = papers.map((paper) => ({
			id: paper.id,
			paper_title: paper.paper_title,
			paper_url: paper.paper_url,
			created_at: paper.created_at,
		}));

		data.sort((a, b) => b.created_at.localeCompare(a.created_at));

		return NextResponse.json(data);
	} catch (error) {
		console.log("[NOTES_GET]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
