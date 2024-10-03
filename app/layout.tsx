// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { Manrope } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Sidebar } from "@/components/ui/Sidebar"; // Adjust the import path as needed
import { ThreadProvider } from "@/contexts/ThreadContext";
import { FlashcardsProvider } from "@/contexts/FlashcardsContext";

const fontHeading = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        <ThreadProvider>
          <FlashcardsProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 p-8">{children}</main>
            </div>
          </FlashcardsProvider>
        </ThreadProvider>
      </body>
    </html>
  );
}
