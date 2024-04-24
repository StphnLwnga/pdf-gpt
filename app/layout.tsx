import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/toaster";
import PDFSidebar from "./_components/pdf-sidebar/pdf-sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SettingsIcons from "@/components/settings-icons";

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
