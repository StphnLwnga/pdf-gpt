"use client";

import { z } from "zod";

export const urlSchema = z.string().refine(
  (value) => {
    const urlRegEx = new RegExp(
      `^(http|https)://(?!localhost|127\.0\.0\.1)(.*?)$`,
    );

    // return value.endsWith(".pdf") && urlRegEx.test(value);
    return true;
  },
  {
    // Custom error message
    message: "Invalid PDF",
  },
);

export const formSchema = z.object({ urlValue: urlSchema });
