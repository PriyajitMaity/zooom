import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner"
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./globals.css";
import 'react-datepicker/dist/react-datepicker.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zooom",
  description: "Video calling app",
  icons: '/icons/logo.svg'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#161925]`}>
          {children}
          <Toaster richColors />
        </body>
      </ClerkProvider>
    </html>
  );
}
