// import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// const handleAuth = () => {
//   const { userId } = auth();
//   if (!userId) throw new Error("Unauthorized");
//   return { userId };
// };

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  pdfUpload: f({
    pdf: { maxFileSize: "16MB", maxFileCount: 1 },
    text: { maxFileSize: "16MB", maxFileCount: 1 },
  })
    // .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      // console.log({ metadata, file });
      return { metadata, ...file };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
