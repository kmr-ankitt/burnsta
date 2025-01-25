import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import localFont from "next/font/local";
import SplashCursor from "@/components/SplashCursor";
import { RetroGrid } from "@/components/ui/retro-grid";
import { ModeToggle } from "@/components/ui/modeToggle";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const myFont = localFont({
  src: [{ path: "../../public/fonts/AVGARDD_2.woff" }],
  variable: "--font-myFont",
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hevalfont = localFont({
  src: [{ path: "/../../public/fonts/Heavitas.ttf" }],
  variable: "--font-myFont1",
});

export const metadata: Metadata = {
  title: "burnsta",
  description: "roast my insta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-myFont antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RetroGrid className="-z-10" />
          <SplashCursor />
          <div className="z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
