import { useState, useEffect } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

interface TooltipComponentProps {
  tooltipTrigger?: React.ReactNode | string | null;
  tooltipContent?: React.ReactNode | string | null;
}

/**
* Renders a tooltip component.
*
* @param {TooltipComponentProps} tooltipTrigger - The element that triggers the tooltip.
* @param {TooltipComponentProps} tooltipContent - The content to be displayed in the tooltip.
* @return {JSX.Element} The rendered tooltip component.
*/
const TooltipComponent = ({ tooltipTrigger, tooltipContent }: TooltipComponentProps): JSX.Element => {
  const { resolvedTheme } = useTheme();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{tooltipTrigger}</TooltipTrigger>
        <TooltipContent className={cn(
          "bg-sky-300/30 text-sky-700 text-sm z-5000",
          resolvedTheme === 'dark' && "bg-sky-300/30 text-slate-200"
        )}>
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default TooltipComponent;