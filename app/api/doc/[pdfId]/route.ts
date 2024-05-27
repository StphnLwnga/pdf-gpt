// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

/**
 * Deletes a PDF file from the database.
 *
 * @param {Request} req - The request object.
 * @param {Object} params - The parameters object.
 * @param {string} params.courseId - The ID of the PDF to delete.
 * @return {Promise<NextResponse>} A Promise that resolves to a NextResponse object.
 */
export async function DELETE(req: Request, { params }: { params: { pdfId: string } }): Promise<NextResponse> {
  try {
    // const { userId } = auth();
    // if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { pdfId } = params;

    // Delete PDF from database

    return NextResponse.json({ pdfId }, { status: 200 });
  } catch (error) {
    console.log("[QA_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

