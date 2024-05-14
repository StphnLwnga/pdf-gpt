"use client";

import { useRouter } from "next/navigation";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useTheme } from "next-themes";

interface FileUploadProps {
  onChange: (data: Record<string, any>) => void;
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
        toast({
          title: "Success",
          description: `Successfully uploaded ${res?.[0].name}`,
          className: `${resolvedTheme === "dark" ? "bg-emerald-500" : "bg-emerald-500 text-slate-100"} border-0 border-slate-200`,
        });
        // console.log(res);
        const { name, url } = res?.[0];
        onChange({ name, url });
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
