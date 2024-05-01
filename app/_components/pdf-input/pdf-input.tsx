"use client";

import React, { useEffect } from "react";
import { useRouter, } from 'next/navigation';
import axios from "axios";
import { ChevronsUpDown } from "lucide-react";
import { usePdfStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"


/**
 * Use Zod for input validation
 */

const PDFInput = () => {
  const router = useRouter();

  // const { setCurrentPdfData, removeCurrentPdfData } = usePdfStore();

  // useEffect(() => {
  //   removeCurrentPdfData();
  // }, []);

  const [isOpen, setIsOpen] = React.useState(false)
  const [pastedLink, setPastedLink] = React.useState('');
  const [pdfTitle, setPdfTitle] = React.useState('');
  const [pagesToDelete, setPagesToDelete] = React.useState('');

  const handleLinkSubmit = async () => {
    try {
      console.log('Attempting to get PDF link');
      const response = await axios.post(`/api/doc/notes`, {
        pdfUrl: pastedLink,
        pdfTitle: `Testing PDF title`,
      });
      const { data } = response;
      console.log(data);
      // setCurrentPdfData(data);
      return router.push(`/doc/${data?.pdfId}`);
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    console.log(pastedLink, pagesToDelete);
  }, [pastedLink, pagesToDelete])


  return (
    <div className="width-[80vw] pt-[10%] pr-4 h-[90vh] flex items-start justify-center">
      <div className="grid w-full max-w-sm items-center justify-center align-middle">
        <Tabs defaultValue="pasteLink" className="w-[40vw]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pasteLink">📋 Paste PDF link</TabsTrigger>
            <TabsTrigger value="uploadPdf">📂 Upload PDF</TabsTrigger>
          </TabsList>
          {['pasteLink', 'uploadPdf'].map((tab, i) => (
            <TabsContent value={tab} key={`tab-${i}`}>
              <div className="flex w-[40vw] items-center space-x-2 font-mono italic">
                <Input
                  placeholder={tab === 'pasteLink' ? "Link here 🔗..." : ""}
                  className="w-[40vw]"
                  type={tab === 'pasteLink' ? "text" : "file"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPastedLink(e.target.value)}
                />
                <Button
                  type="submit"
                  className="text-xl rounded-full p-1"
                  variant="ghost"
                  onClick={handleLinkSubmit}
                >
                  🪄
                </Button>
              </div>
              <div className="text-sm flex flex-col w-[40vw] max-w-[40vw]">
                <Collapsible
                  open={isOpen}
                  onOpenChange={setIsOpen}
                  className="w-full space-y-2 pt-2"
                >
                  <div className="flex items-center justify-between space-x-4">
                    <CollapsibleTrigger asChild>
                      <h4 className="text-sm font-semibold space-x-4 flex items-center justify-around">
                        Options
                        <Button variant="ghost" size="sm" className="p-1 rounded-full">
                          <ChevronsUpDown className="h-3 w-4" />
                        </Button>
                      </h4>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="space-y-2 w-[40vw]">
                    <div className="rounded-md py-3 font-mono text-sm">
                      <Input
                        placeholder="🗑️Delete pages e.g. 1, 2, 3,..."
                        className=""
                        type="text"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPagesToDelete(e.target.value)}
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default PDFInput;

{
  /* <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="uploadPDF">Browse</Label>
        <Input id="uploadPDF" type="file" />
      </div> */
}
