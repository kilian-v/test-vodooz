import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import {ReactReduxProvider} from "@/app/components/ReactReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BOOKLY",
  description: "BOOKLY Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ReactReduxProvider>
        <html lang="en">
        <body className={clsx(inter.className, "bg-main-orange")}>{children}</body>
        </html>
      </ReactReduxProvider>

  );
}
