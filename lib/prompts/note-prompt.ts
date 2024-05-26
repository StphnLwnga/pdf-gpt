import { PdfNote } from "@prisma/client";
import { ChatPromptTemplate } from "langchain/prompts";
import { BaseMessageChunk } from "langchain/schema";

export const NOTES_TOOL_SCHEMA = {
  type: "function" as const,
  function: {
    name: "formatNotes",
    description: "Format the notes response",
    parameters: {
      type: "object",
      properties: {
        notes: {
          type: "array",
          items: {
            type: "object",
            properties: {
              note: {
                type: "string",
                description: "The notes",
              },
              pageNumbers: {
                type: "array",
                items: {
                  type: "number",
                  description:
                    "The page number or numbers in the text that the note is derived from",
                },
              },
            },
          },
        },
      },
      required: ["notes"],
    },
  },
};

/**
 * Parses the output of a base message chunk and returns an array of PdfNote objects.
 *
 * @param {BaseMessageChunk} output - The base message chunk to parse.
 * @return {Array<PdfNote>} - An array of PdfNote objects extracted from the output.
 */
export const outputParser = (output: BaseMessageChunk): Array<PdfNote> => {
  const toolCalls = output.additional_kwargs.tool_calls;
  if (!toolCalls) throw new Error("Missing 'tool_calls' in notes output");

  const notes = toolCalls
    .map((call) => {
      const { notes } = JSON.parse(call.function.arguments);
      return notes;
    })
    .flat();

  return notes;
};

export const NOTE_PROMPT = ChatPromptTemplate.fromMessages([
  [
    "ai",
    `Summarize the major sections and themes that arise throughout the text into detailed, insightful notes.
    The goal is to be able to create a comprehensive understanding of the text after reading all notes.

    Rules:
    - Include specific quotes and details inside your notes.
    - Respond with as many notes as it might take to cover the entire text.
    - Go into as much detail as you can, while keeping each note on a very specific part of the document.
    - DO NOT respond with notes like: "The text discusses XYZ", or "the text emphasizes XYZ", or "the text introduces XYZ",
     instead explain what XYZ is and how it works.

    Respond with a JSON array with two keys: "note" and "pageNumbers".
    "note" will be the specific note, and pageNumbers will be an array of numbers (if the note spans more than one page).`,
  ],
  ["human", "Document: {document}"],
]);
