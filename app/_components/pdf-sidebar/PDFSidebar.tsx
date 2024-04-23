"use client";

import { Separator } from "@/components/ui/separator";
import React from "react";
import { FcDocument } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const PDFSidebar = () => {
  const { resolvedTheme } = useTheme();

  console.log({ resolvedTheme });

  const pdfFilesList = Array(30)
    .fill("_")
    .map((_, i) => (
      <Button
        key={i}
        variant="ghost"
        className="w-full flex items-center justify-start rounded-none pr-2 h-14"
      >
        <div className="basis-1/5 lg-basis-1/8">
          <FcDocument className="mr-2 h-8 w-8 my-2" />
        </div>
        <div
          className={cn(
            "truncate flex flex-col basis-4/5 lg-basis-7/8",
            resolvedTheme !== "dark" && "text-slate-500",
          )}
        >
          <span className="text-start truncate">PDF Document {i}</span>
          <span
            className={cn(
              "text-start truncate text-xs",
              resolvedTheme !== "dark" && "text-slate-400",
            )}
          >
            https://www.media.wmg-is.com/media/portal/media/cms/docs/201202/curreny-quote-sheet_1330379143004.pdf
          </span>
        </div>
      </Button>
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
        <ul
          role="list"
          className={cn(
            "divide-y divide-gray-100 w-full mr-0",
            resolvedTheme === "dark" && "divide-gray-650",
          )}
        >
          {pdfFilesList}
        </ul>
      </div>
    </div>
    // </div>
  );
};

export default PDFSidebar;

const people = [
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Michael Foster",
    email: "michael.foster@example.com",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Dries Vincent",
    email: "dries.vincent@example.com",
    role: "Business Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
  {
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    role: "Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Tom Cook",
    email: "tom.cook@example.com",
    role: "Director of Product",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
];
