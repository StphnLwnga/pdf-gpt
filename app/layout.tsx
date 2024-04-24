import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ToggleDarkMode } from "@/components/toggle-dark-mode";
import { Toaster } from "@/components/toaster";
import PDFSidebar from "./_components/pdf-sidebar/PDFSidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SettingsIcons from "./_components/settings-icons/SettingsIcons";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PDF - GPT",
  description: "Summarize and chat with PDF files",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToggleDarkMode />
          <ResizablePanelGroup direction="horizontal" className="border">
            <ResizablePanel defaultSize={20}>
              <PDFSidebar />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={80}>
              <SettingsIcons />
              {children}
            </ResizablePanel>
          </ResizablePanelGroup>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
