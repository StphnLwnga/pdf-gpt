"use client";

import React, { useEffect } from "react";
import { usePdfStore } from "@/lib/store";
import { Backdrop } from "@mui/material";
import { Loader2 } from "lucide-react";

const PageLoadBackdrop = ({ pageLoad }: { pageLoad?: boolean }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={pageLoad! ?? true}
    >
      <Loader2 className="h-24 w-24 stroke-[0.5] animate-spin" />
    </Backdrop>
  );
};

export default PageLoadBackdrop;
