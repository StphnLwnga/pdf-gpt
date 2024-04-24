"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { debounce } from "lodash";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { PDFSidebarListItem } from "./pdf-sidebar-list-item";
import { LoadingSidebar } from "./loading";
import SettingsIcons from "@/components/settings-icons";

const PDFSidebar = () => {
  const router = useRouter();

  const { resolvedTheme } = useTheme();

  const inputElement = useRef<null | HTMLInputElement>(null);

  const [activeItemId, setActiveItemId] = useState<null | number>();

  const handleListItemClick = (pdfTitle: string, pdfId: number) => {
    setActiveItemId(pdfId);
    router.push(`/doc/${pdfTitle.toLowerCase().replace(/ /g, "-")}`);
  };

  useEffect(() => {
    if (window.location.pathname === "/") setActiveItemId(null);
  }, [activeItemId]);

  const pdfFilesList = Array(30)
    .fill("_")
    .map((_, i) => (
      <PDFSidebarListItem
        key={i}
        isActiveItem={i === activeItemId}
        isDarkTheme={resolvedTheme === "dark"}
        pdfTitle={`PDF Document ${i}`}
        pdfUrl={`https://www.media.wmg-is.com/media/portal/media/cms/docs/201202/curreny-quote-sheet_1330379143004.pdf`}
        onClick={() => handleListItemClick(`PDF Document ${i}`, i)}
      />
    ));

  const handlePdfListSearch = useCallback(
    debounce((inputVal: string) => {
      console.log(inputVal);
    }, 500),
    [],
  );

  return (
    <div className="h-full min-w-[20vw] flex flex-col pl-4">
      <div className="min-h-[8vh] mt-[2vh] w-full pr-4 flex items-end justify-center  ">
        <Input
          placeholder="🔎 Search files..."
          className="border-x-0 border-t-0 border-b-2 shadow-none rounded-none focus-visible:ring-0"
          ref={inputElement}
          onChange={() => handlePdfListSearch(inputElement.current?.value!)}
        />
      </div>
      <div
        className={cn(
          "flex pt-[1vh] pb-[2vh] max-h-[88vh] overflow-y-scroll overflow-x-hidden",
          pdfFilesList.length === 0 && "overflow-y-hidden",
        )}
      >
        <ul
          role="list"
          className={cn(
            "divide-y divide-gray-100 w-full mr-0 pr-2",
            resolvedTheme === "dark" && "divide-gray-650",
          )}
        >
          {pdfFilesList}
        </ul>
        {/* {<LoadingSidebar />} */}
        {pdfFilesList.length === 0 && (
          <span className="text-xs italic">
            Your files will be appear here...
          </span>
        )}
      </div>
    </div>
  );
};

export default PDFSidebar;
