import React from "react";
import { useTheme } from "next-themes";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const LoadingSidebarListItem = () => (
  <div className="flex items-center space-x-4">
    <Skeleton className="h-10 w-10 rounded my-2" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[150px]" />
      <Skeleton className="h-2 w-[225px]" />
    </div>
  </div>
);

export const LoadingSidebar = () => {
  const { resolvedTheme } = useTheme();

  const loadingSidebarList = Array(10)
    .fill(0)
    .map((_, i) => <LoadingSidebarListItem key={i} />);

  return (
    <ul
      role="list"
      className={cn(
        "divide-y divide-gray-100 w-full mr-0 pr-2",
        resolvedTheme === "dark" && "divide-gray-650",
      )}
    >
      {loadingSidebarList}
    </ul>
  );
};
