import { NextResponse } from "next/server";
import { loadPdfFromUrl } from "@/lib/helpers";

/**
 * An asynchronous function that handles a POST request to view a document.
 *
 * @param {Request} req - The request object.
 * @param {Object} params - The parameters object.
 * @param {string} params.pdfUrl - The URL of the PDF to view.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 * 
 * 
 * TODO: Validate PDF ID, secure the route
 */
export async function POST(req: Request,): Promise<NextResponse> {
	try {
		const { pdfUrl } = await req.json();
		if (!pdfUrl) throw new Error("No PDF ID provided");
		const pdfBuffer = await loadPdfFromUrl({ url: pdfUrl });
		console.log(pdfBuffer)
		return NextResponse.json({pdfBuffer});
	} catch (error) {
		console.log("[VIEW_DOC]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}

