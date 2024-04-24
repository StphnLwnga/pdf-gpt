import React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

const SettingsIcons = () => {
  return (
    <div className="w-20 max-w-22 flex fixed space-x-1 pt-2 pl-2">
      <Button asChild className="rounded-full px-2" variant="ghost">
        <Link href="/" className="text-md p-0">
          🏠️
        </Link>
      </Button>
      <Button className="text-md rounded-full px-2" variant="ghost">
        ⚙️
      </Button>
    </div>
  );
};

export default SettingsIcons;
