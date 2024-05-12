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
  pdfUpload: f(["text", "pdf"])
    // .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
