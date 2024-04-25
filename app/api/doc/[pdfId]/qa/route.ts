/**
 * Get the code from here: https://github.com/StphnLwnga/rag-101/blob/main/api/src/qa/index.ts
 */

import { NextResponse } from "next/server";

/**
 * Sends a request to the OpenAI API to generate an answer to the question, 
 * and saves the question and answer in the database.
 *
 * @param {Request} req - The request object.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 */
export async function POST(req: Request, { params }: { params: { pdfId: string } }): Promise<NextResponse> {
  try {
    // const { userId } = auth();
    // if (!userId) throw new Error("Unauthorized");

    const { data } = await req.json();

    const { pdfId } = params;

    /**
     * Extract the question from the request's body.
     * Generate the answer using the OpenAI API.
     * Save the question and answer in the database with the associated PDF.
     */

    return NextResponse.json({ pdfId, data }, { status: 200 });
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

/**
 * Retrieves the QA chat history for a given PDF.
 *
 * @param {Request} req - The request object.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the chat history as JSON.
 */
export async function GET(req: Request, { params }: { params: { pdfId: string } }): Promise<NextResponse> {
  try {
    // const { userId } = auth();
    // if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { pdfId } = params;    

    return NextResponse.json({ pdfId }, { status: 200 });
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}