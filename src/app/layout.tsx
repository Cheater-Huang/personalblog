import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "我的个人博客",
  description: "欢迎来到我的个人空间",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col bg-[#1a1a2e]">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
      
      </body>
    </html>
  );
}