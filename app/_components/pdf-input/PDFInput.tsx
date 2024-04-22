import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

const PDFInput = () => {
  return (
    <div className="width-[80vw] ml-[20vw] pt-[5vw] pr-4 h-[90vh] flex justify-center">
      <div className="grid w-full max-w-sm justify-center align-middle">
        <Tabs defaultValue="pasteLink" className="w-[40vw]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pasteLink">📋 Paste PDF link</TabsTrigger>
            <TabsTrigger value="uploadPdf">📂 Upload PDF</TabsTrigger>
          </TabsList>
          <TabsContent value="pasteLink">
            <div className="flex w-[40vw] items-center space-x-2">
              <Input placeholder="Link here 🔗..." className="w-[40vw]" />
              <Button
                type="submit"
                className="text-xl rounded-full p-1"
                variant="ghost"
              >
                🪄
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="uploadPdf">
            <div className="flex  items-center space-x-2 w-[40vw]">
              <Input id="uploadFile" type="file" className="w-[40vw]" />
              <Button
                type="submit"
                className="text-2xl rounded-full p-0"
                variant="ghost"
              >
                🪄
              </Button>
            </div>
          </TabsContent>
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
