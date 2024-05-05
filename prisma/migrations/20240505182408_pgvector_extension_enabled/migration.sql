-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- CreateTable
CREATE TABLE "PdfDocument" (
    "id" TEXT NOT NULL,
    "pdf_title" TEXT NOT NULL,
    "pdf_text" TEXT NOT NULL,
    "pdf_url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PdfDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PdfNote" (
    "id" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "pageNumbers" INTEGER[],
    "pdfDocumentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PdfNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document_Embeddings" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "embedding" vector,
    "metadata" Jsonb,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_Embeddings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question_Answering" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "FollowupQuestions" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_Answering_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PdfDocument_pdf_title_key" ON "PdfDocument"("pdf_title");

-- CreateIndex
CREATE UNIQUE INDEX "PdfDocument_pdf_url_key" ON "PdfDocument"("pdf_url");

-- CreateIndex
CREATE INDEX "PdfNote_pdfDocumentId_idx" ON "PdfNote"("pdfDocumentId");
