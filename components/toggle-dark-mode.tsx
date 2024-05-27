"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FcIdea, FcNoIdea } from "react-icons/fc";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import TooltipComponent from "@/components/tooltip-component";

export function ToggleDarkMode(): JSX.Element {
  const { setTheme, theme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = (): void => {
    setTheme(isDarkTheme ? "light" : "dark");
    setIsDarkTheme(!isDarkTheme);
  };

  useEffect(() => {
    setIsDarkTheme(theme === "dark");
  }, [theme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={toggleTheme}
    >
      {!isDarkTheme ? (
        <TooltipComponent
          tooltipTrigger={
            <FcNoIdea className="h-[1.25rem] w-[1.25rem] transition-all z-55" />
          }
          tooltipContent="Dark Mode"
        />
      ) : (
        <TooltipComponent
          tooltipTrigger={
            <FcIdea className="h-[1.25rem] w-[1.25rem] transition-all z-55" />
          }
          tooltipContent="Light Mode"
        />
      )}
      <span className="sr-only">Toggle dark mode</span>
    </Button>
  );
}
