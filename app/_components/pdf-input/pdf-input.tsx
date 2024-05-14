"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z, ZodError } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ChevronsUpDown } from "lucide-react";
import { useTheme } from "next-themes";

import { usePdfStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import PageLoadBackdrop from "@/components/page-load-backdrop";
import { formSchema, urlSchema } from "./schema";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FormControl, FormLabel } from "@mui/material";
import FileUpload from "@/components/file-upload";

/**
 * Use Zod for input validation
 */

const PDFInput = () => {
  const router = useRouter();

  const { loadingDoc, setLoadingDoc } = usePdfStore();

  const { clearErrors } = useForm<{ urlValue: string }>();

  const [isOpen, setIsOpen] = useState(false);
  const [pastedLink, setPastedLink] = useState("");
  const [pagesToDelete, setPagesToDelete] = useState("");

  const { toast } = useToast();

  const { resolvedTheme } = useTheme();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      urlValue: "",
    },
  });

  const reset = () => router.refresh();

  const handleLinkSubmit2 = async (
    value: z.infer<typeof formSchema>["urlValue"],
    name?: string,
  ): Promise<void> => {
    console.log(value);
    setLoadingDoc(true);
    try {
      console.log("Fetching PDF link");
      const response = await axios.post(`/api/doc/notes`, {
        pdfUrl: value,
        pdfTitle: name ?? value,
      });
      // const { data } = response;
      // setCurrentPdfData(data);
      //   title: "Success",
      //   description: "Resource successfully added!",
      //   className: `${resolvedTheme === "dark" ? "bg-emerald-500" : "bg-emerald-500 text-slate-100"} border-0 border-slate-200`,
      // });
      // return router.push(`/doc/${data?.pdfId}?continueBackdrop=false`);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
        action: (
          <ToastAction onClick={reset} altText="Try again">
            Try again
          </ToastAction>
        ),
      });
    } finally {
      setLoadingDoc(false);
    }
  };

  const handleFileUpload = async (data: {
    url: z.infer<typeof formSchema>["urlValue"];
    name?: string;
  }): Promise<void> => {
    setLoadingDoc(true);
    const { url, name } = data;
    try {
      console.log(data);
      handleLinkSubmit2(url, name);
    } catch (error) {
      console.log("[COURSEID_ATT_ADD]", error);
      toast({
        title: "Error",
        description: "File upload failed!",
        variant: "destructive",
        action: (
          <ToastAction onClick={reset} altText="Try again">
            Try again
          </ToastAction>
        ),
      });
    } finally {
      setLoadingDoc(false);
    }
  };

  useEffect(() => {
    console.log(pastedLink, pagesToDelete);
  }, [pastedLink, pagesToDelete]);

  return (
    <div className="h-full w-full">
      <PageLoadBackdrop pageLoad={loadingDoc} />
      <div className="width-[80vw] pt-[10%] pr-4 h-[90vh] flex items-start justify-center">
        <div className="grid w-full max-w-sm items-center justify-center align-middle">
          <Tabs defaultValue="pasteLink" className="w-[40vw]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pasteLink">📋 Paste PDF link</TabsTrigger>
              <TabsTrigger value="uploadPdf">📂 Upload PDF</TabsTrigger>
            </TabsList>
            {["pasteLink", "uploadPdf"].map((tab, i) => (
              <TabsContent value={tab} key={`tab-${i}`}>
                {tab === "pasteLink" ? (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(handleLinkSubmit2)}
                      className="flex justify-center w-[40vw] items-center space-x-2 font-mono italic pt-4"
                    >
                      <FormField
                        control={form.control}
                        name="urlValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="w-[36vw]"
                                type={tab === "pasteLink" ? "text" : "file"}
                                placeholder={
                                  tab === "pasteLink" ? "Link here 🔗..." : ""
                                }
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="text-xl rounded-full p-1"
                        variant="ghost"
                      >
                        🪄
                      </Button>
                    </form>
                  </Form>
                ) : (
                  <FileUpload
                    endpoint="pdfUpload"
                    onChange={(data) => {
                      if (data.url) handleFileUpload(data);
                    }}
                  />
                )}
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
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 rounded-full"
                          >
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
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPagesToDelete(e.target.value)
                          }
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
