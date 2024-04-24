"use client";

import React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import TooltipComponent from "@/components/tooltip-component";
import { ToggleDarkMode } from "@/components/toggle-dark-mode";

const SettingsIcons = () => {
  return (
    <div className="flex fixed pt-2 pl-2 flex-row-reverse">
      <Button asChild className="rounded-full px-2" variant="ghost">
        <Link href="/" className="text-sm p-0">
          <TooltipComponent tooltipTrigger="🏠️" tooltipContent="Home" />
          <span className="sr-only">Go to home page</span>
        </Link>
      </Button>
      <Button className="text-sm rounded-full px-2" variant="ghost">
        <TooltipComponent tooltipTrigger="⚙️" tooltipContent="Settings" />
        <span className="sr-only">Settings</span>
      </Button>
      <ToggleDarkMode />
    </div>
  );
};

export default SettingsIcons;
