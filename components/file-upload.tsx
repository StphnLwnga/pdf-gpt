"use client";

import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

const FileUpload = ({ onChange, endpoint }: FileUploadProps): JSX.Element => {
  const router = useRouter();

  const { toast } = useToast();

  const { resolvedTheme } = useTheme();

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log({ res });
        onChange(res?.[0].url);
      }}
      onUploadError={(err) =>
        toast({
          title: "Error",
          description: err?.message,
          variant: "destructive",
        })
      }
      appearance={{
        label: {
          color: resolvedTheme === "dark" ? "#cbd5e1" : "rgb(71 85 105)",
        },
        button: {
          backgroundColor: resolvedTheme === "dark" ? "#27272A" : "#F4F4F5",
          color: resolvedTheme === "dark" ? "" : "#475569",
        },
      }}
      className="ut-button:rounded button-sm hover:cursor-pointer mt-4"
    />
  );
};

export default FileUpload;
