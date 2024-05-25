import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Loading = ({ resolvedTheme }: { resolvedTheme?: string }) => {
  const isDark = resolvedTheme === "dark";

  return (
    <div className="p-1 h-full w-full">
      <Skeleton className="h-full w-full flex flex-col items-center justify-center p-4 gap-y-4">
        <div>
          <Loader2 className={cn("text-8xl animate-spin")} />
        </div>
      </Skeleton>
    </div>
  );
};

export default Loading;
