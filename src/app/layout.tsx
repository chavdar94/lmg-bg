import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import WidthContainer from "../components/WidthContainer";
import Footer from "../components/Footer/Footer";
import SubNav from "@/components/SubNav/SubNav";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LMG Computers",
  description: "LMG Computers - your friendly service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} grid min-h-[100dvh] grid-rows-[auto_1fr_auto]`}
      >
        <Providers>
          <Header />
          <WidthContainer className="px-4 md:px-24 lg:px-36 xl:px-36 2xl:px-96">
            <SubNav />
            {children}
          </WidthContainer>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
