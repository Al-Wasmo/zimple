import { Geist, Geist_Mono } from "next/font/google";
import "@/css/globals.css";
import "@/css/custom.css";
import "highlight.js/styles/atom-one-dark-reasonable.css";
import "easymde/dist/easymde.min.css";
import Nav from "@/components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-[#22272e] ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Nav />
        <div className="mt-[64px]"> {children} </div>
      </body>
    </html>
  );
}


