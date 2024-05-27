"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { debounce } from "lodash";
import { Paper } from "@/lib/types";
import { cn } from "@/lib/utils";
import { usePdfStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { PDFSidebarListItem } from "./pdf-sidebar-list-item";
import { LoadingSidebar } from "./loading";
import { PdfDocument } from "@prisma/client";
import { Suspense } from "react";

const PDFSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { resolvedTheme } = useTheme();

  const {
    activePdfId,
    pdfDocsArray,
    loadingDoc,
    setActivePdfId,
    setPdfDocsArray,
    setLoadingDoc,
  } = usePdfStore();

  const inputElement = useRef<null | HTMLInputElement>(null);

  const [filteredPdfList, setFilteredPdfList] = useState<
    JSX.Element[] | null
  >();
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchAttempted, setFetchAttempted] = useState<boolean>(false);

  useEffect(() => {
    const page_id = pathname.split("/").filter((str: string) => str !== "")[1];
    setActivePdfId(page_id ?? null);
  }, [pathname]);

  useEffect(() => {
    /**
     * Fetches the list of PDF documents from the server and updates the state with the fetched data.
     *
     * @return {Promise<void>} A promise that resolves when the fetch operation is complete.
     */
    (async (): Promise<void> => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/doc/notes`);
        // setPdfList(data);
        console.log({ data });
        setPdfDocsArray(data as Partial<PdfDocument>[]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();

    setFetchAttempted(true);
  }, []);

  /**
   * Handles the click event on a PDF sidebar list item.
   *
   * @param {string} pdfTitle - The title of the PDF document.
   * @param {string} pdfId - The ID of the PDF document.
   * @return {void} This function does not return a value.
   */
  const handleListItemClick = (pdfTitle: string, pdfId: string): void => {
    setActivePdfId(pdfId);

    router.push(`/doc/${pdfId}`);
  };

  const pdfFilesList = pdfDocsArray.map((paper: Partial<PdfDocument>, i) => (
    <PDFSidebarListItem
      key={paper.id}
      isActiveItem={paper.id === activePdfId}
      isDarkTheme={resolvedTheme === "dark"}
      pdfTitle={paper.pdf_title!}
      pdfUrl={paper.pdf_url!}
      onClick={() => handleListItemClick(paper.pdf_title!, paper.id!)}
    />
  ));

  const handlePdfListSearch = useCallback(
    debounce((inputVal: string) => {
      if (inputVal !== "") {
        const filteredList = [...pdfDocsArray].filter((pdf) =>
          pdf.pdf_title!.toLowerCase().includes(inputVal.toLowerCase()),
        );
        const filteredListElems = filteredList.map(
          (paper: Partial<PdfDocument>, i) => (
            <PDFSidebarListItem
              key={paper.id}
              isActiveItem={paper.id === activePdfId}
              isDarkTheme={resolvedTheme === "dark"}
              pdfTitle={paper.pdf_title!}
              pdfUrl={paper.pdf_url!}
              onClick={() => handleListItemClick(paper.pdf_title!, paper.id!)}
            />
          ),
        );
        setFilteredPdfList(filteredListElems);
      } else {
        setFilteredPdfList(null);
      }
    }, 500),
    [pdfDocsArray],
  );

  return (
    <div className="h-[99vh] min-w-[20vw] flex flex-col pl-4">
      <div className="min-h-[8vh] mt-[2vh] w-full pr-4 flex items-end justify-center  ">
        <Input
          placeholder="  🔎  Search files..."
          className="border-x-0 border-t-0 border-b-2 shadow-none rounded-none focus-visible:ring-0"
          ref={inputElement}
          onChange={() => handlePdfListSearch(inputElement.current?.value!)}
        />
      </div>
      <div
        className={cn(
          "flex pt-[1vh] pb-[2vh] h-full max-h-[88vh] overflow-y-auto overflow-x-hidden",
          pdfFilesList.length === 0 && "overflow-y-hidden",
        )}
      >
        {!loading && fetchAttempted && pdfFilesList.length > 0 && (
          <Suspense fallback={<LoadingSidebar />}>
            <ul
              role="list"
              className={cn(
                "divide-y divide-gray-100 w-full mr-0 pr-2 min-h-full",
                resolvedTheme === "dark" && "divide-gray-650",
              )}
            >
              {filteredPdfList ?? pdfFilesList}
            </ul>
          </Suspense>
        )}

        {loading ||
          (pdfFilesList.length === 0 && !fetchAttempted && <LoadingSidebar />)}

        {fetchAttempted && !loading && pdfFilesList.length === 0 && (
          <span className="text-xs italic">
            Your files will be appear here...
          </span>
        )}
      </div>
    </div>
  );
};

export default PDFSidebar;
