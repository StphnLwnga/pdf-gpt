"use client";

import React from "react";
import { FcDocument } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PDFSidebarListItemProps {
  isDarkTheme: boolean;
  pdfTitle: string;
  pdfUrl: string;
}

export const PDFSidebarListItem = ({
  isDarkTheme,
  pdfTitle,
  pdfUrl,
}: PDFSidebarListItemProps): JSX.Element => {
  return (
    <Button
      variant="ghost"
      className="w-full flex items-center justify-start rounded-none pr-2 h-14 pl-0"
    >
      <div className="max-w-10">
        <FcDocument className="mr-2 h-8 w-8 my-2" />
      </div>
      <div
        className={cn(
          "truncate flex flex-col ",
          !isDarkTheme && "text-slate-500",
        )}
      >
        <span className="text-start truncate">{pdfTitle}</span>
        <span
          className={cn(
            "text-start truncate text-xs italic text-slate-400",
            !isDarkTheme && "text-slate-400",
          )}
        >
          {pdfUrl}
        </span>
      </div>
    </Button>
  );
};
