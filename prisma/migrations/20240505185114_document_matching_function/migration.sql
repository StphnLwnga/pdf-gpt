/*
  Warnings:

  - You are about to alter the column `metadata` on the `Document_Embeddings` table. The data in that column could be lost. The data in that column will be cast from `JsonB` to `Unsupported("Jsonb")`.

*/
-- AlterTable
ALTER TABLE "Document_Embeddings" ALTER COLUMN "metadata" SET DATA TYPE Jsonb;
