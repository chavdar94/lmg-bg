import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import WidthContainer from "./components/WidthContainer";
import SubNav from "./components/SubNav/SubNav";
import LatestNews from "./components/LatestNews/LatestNews";
import ProductsSection from "./components/ProductsSection/ProductsSection";
import Footer from "./components/Footer/Footer";

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
      <body className={inter.className}>
        <Header />
        <WidthContainer className="px-96 flex flex-col">
          <SubNav />
          <LatestNews />
          {children}
        </WidthContainer>
        <Footer />
      </body>
    </html>
  );
}
