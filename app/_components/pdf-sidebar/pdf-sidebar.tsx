"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import axios from "axios";
import { debounce } from "lodash";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { PDFSidebarListItem } from "./pdf-sidebar-list-item";
import { LoadingSidebar } from "./loading";
import { Paper } from "@/lib/types";

const PDFSidebar = () => {
  const router = useRouter();

  const { resolvedTheme } = useTheme();

  const inputElement = useRef<null | HTMLInputElement>(null);

  const [activeItemId, setActiveItemId] = useState<null | string>();
  const [pdfList, setPdfList] = useState<Paper[]>([]);
  const [filteredPdfList, setFilteredPdfList] = useState<JSX.Element[] | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchAttempted, setFetchAttempted] = useState<boolean>(false);

  useEffect(() => {
    /**
     * Fetches the list of PDF documents from the server and updates the state with the fetched data.
     *
     * @return {Promise<void>} A promise that resolves when the fetch operation is complete.
     */
    const fetchPDFList = async (): Promise<void> => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/doc/notes`,);
        setPdfList(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPDFList();

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
    setActiveItemId(pdfId);
    router.push(`/doc/${pdfTitle.toLowerCase().replace(/ /g, "-")}`);
  };

  useEffect(() => {
    if (window.location.pathname === "/") setActiveItemId(null);
  }, [activeItemId]);

  const pdfFilesList = pdfList.map((paper: Paper, i) => (
    <PDFSidebarListItem
      key={paper.id}
      isActiveItem={paper.id === activeItemId}
      isDarkTheme={resolvedTheme === "dark"}
      pdfTitle={paper.paper_title}
      pdfUrl={paper.paper_url}
      onClick={() => handleListItemClick(paper.paper_title, paper.id)}
    />
  ));

  const handlePdfListSearch = useCallback(
    debounce((inputVal: string) => {
      if (inputVal !== "") {
        const filteredList = [...pdfList].filter((pdf) => pdf.paper_title.toLowerCase().includes(inputVal.toLowerCase()));
        const filteredListElems = filteredList.map((paper: Paper, i) => (
          <PDFSidebarListItem
            key={paper.id}
            isActiveItem={paper.id === activeItemId}
            isDarkTheme={resolvedTheme === "dark"}
            pdfTitle={paper.paper_title}
            pdfUrl={paper.paper_url}
            onClick={() => handleListItemClick(paper.paper_title, paper.id)}
          />
        ));
        setFilteredPdfList(filteredListElems);
      } else {
        setFilteredPdfList(null);
      }
    }, 500),
    [pdfList],
  );

  return (
    <div className="h-[99vh] min-w-[20vw] flex flex-col pl-4">
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
          "flex pt-[1vh] pb-[2vh] h-full max-h-[88vh] overflow-y-scroll overflow-x-hidden",
          pdfFilesList.length === 0 && "overflow-y-hidden",
        )}
      >
        {fetchAttempted && pdfFilesList.length > 0 && (
          <ul
            role="list"
            className={cn(
              "divide-y divide-gray-100 w-full mr-0 pr-2 min-h-full",
              resolvedTheme === "dark" && "divide-gray-650",
            )}
          >
            {filteredPdfList ?? pdfFilesList}
          </ul>
        )}

        {loading || (pdfFilesList.length === 0 && !fetchAttempted) && <LoadingSidebar />}

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
