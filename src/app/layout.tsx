import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import WidthContainer from "./components/WidthContainer";
import SubNav from "./components/SubNav/SubNav";
import LatestNews from "./components/LatestNews/LatestNews";
import Footer from "./components/Footer/Footer";
import MobileCategories from "./components/MobileCategories/MobileCategories";

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
      <body className={`${inter.className} max-w-screen`}>
        <Header />
        <WidthContainer className="px-4 md:px-24 lg:px-36 xl:px-96 flex flex-col">
          <SubNav />
          <MobileCategories />
          <LatestNews />
          {children}
        </WidthContainer>
        <Footer />
      </body>
    </html>
  );
}
