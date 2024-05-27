/*
  Warnings:

  - You are about to alter the column `metadata` on the `Document_Embeddings` table. The data in that column could be lost. The data in that column will be cast from `JsonB` to `Unsupported("Jsonb")`.
  - You are about to drop the column `pageNumbers` on the `PdfNote` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Document_Embeddings" ALTER COLUMN "metadata" SET DATA TYPE Jsonb;

-- AlterTable
ALTER TABLE "PdfNote" DROP COLUMN "pageNumbers";
