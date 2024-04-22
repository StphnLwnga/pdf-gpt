"use client";

import { Separator } from "@/components/ui/separator";
import React from "react";
import { FcDocument } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";

const PDFSidebar = () => {
  const { resolvedTheme } = useTheme();

  console.log({ resolvedTheme });

  const pdfFilesList = Array(30)
    .fill("_")
    .map((_, i) => (
      <Button
        key={i}
        variant="ghost"
        className="w-full flex items-center justify-start"
      >
        <FcDocument className="mr-2 h-4 w-4" />
        <span className={cn(resolvedTheme !== "dark" && "text-black")}>
          PDF Document {i}
        </span>
      </Button>
    ));

  return (
    <div className="flex h-full">
      <div className="h-full min-w-[20vw] flex flex-col pl-4">
        <div className="h-[8vh] max-h-[8vh] mt-[2vh] w-full pr-4 flex items-end justify-center  ">
          <Input
            placeholder="🔎 Search files..."
            className="border-x-0 border-t-0 border-b-2 shadow-none rounded-none focus-visible:ring-0"
          />
        </div>
        <div className="flex pt-[1vh] pb-[2vh] max-h-[88vh] overflow-y-scroll overflow-x-hidden">
          <ul role="list" className="divide-y divide-gray-100">
            {[...people, ...people, ...people].map((person) => (
              <li
                key={person.email}
                className="flex justify-between gap-x-4 py-5 pr-2"
              >
                <div className="flex min-w-0 gap-x-4">
                  <FcDocument className="h-7 w-7 flex-none" />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6">
                      {person.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5">
                      {person.email}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6">{person.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* <Separator orientation="vertical" /> */}
    </div>
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
