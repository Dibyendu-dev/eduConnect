import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { DbProvider, dbProvider } from "./db.provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "EduConnect-Learn like a pro",
  description: "EduConnect-Learn like a pro || Explore || Learn || Share",
};

export default async function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <DbProvider>{children}</DbProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
