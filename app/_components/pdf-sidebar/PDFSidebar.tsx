"use client";

import { useTheme } from "next-themes";
import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { PDFSidebarListItem } from "./PDFSidebarListItem";

const PDFSidebar = () => {
  const { resolvedTheme } = useTheme();

  const pdfFilesList = Array(30)
    .fill("_")
    .map((_, i) => (
      <PDFSidebarListItem
        key={i}
        isDarkTheme={resolvedTheme === "dark"}
        pdfTitle={`PDF Document ${i}`}
        pdfUrl={`https://www.media.wmg-is.com/media/portal/media/cms/docs/201202/curreny-quote-sheet_1330379143004.pdf`}
      />
    ));

  return (
    // <div className="flex h-full">
    <div className="h-full min-w-[20vw] flex flex-col pl-4">
      <div className="h-[8vh] mt-[2vh] w-full pr-4 flex items-end justify-center  ">
        <Input
          placeholder="🔎 Search files..."
          className="border-x-0 border-t-0 border-b-2 shadow-none rounded-none focus-visible:ring-0"
        />
      </div>
      <div className="flex pt-[1vh] pb-[2vh] max-h-[88vh] overflow-y-scroll overflow-x-hidden">
        {pdfFilesList ? (
          <ul
            role="list"
            className={cn(
              "divide-y divide-gray-100 w-full mr-0",
              resolvedTheme === "dark" && "divide-gray-650",
            )}
          >
            {pdfFilesList}
          </ul>
        ) : (
          "Loading...."
        )}
      </div>
    </div>
    // </div>
  );
};

export default PDFSidebar;
