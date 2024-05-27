"use client";

import React, { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcDocument } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PDFSidebarListItemProps {
  pdfTitle: string;
  pdfUrl: string;
  isDarkTheme: boolean;
  isActiveItem: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const PDFSidebarListItem = ({
  isDarkTheme,
  isActiveItem,
  pdfTitle,
  pdfUrl,
  onClick,
}: PDFSidebarListItemProps): JSX.Element => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full flex items-center justify-start rounded-none pr-2 h-14 pl-0",
        isActiveItem && "bg-neutral-100",
        isActiveItem && isDarkTheme && "bg-neutral-800",
      )}
      onClick={onClick}
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
