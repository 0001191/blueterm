import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 1. 引入 Analytics 组件
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlueTerm",
  description: "The Digital Twin for Developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 您的页面内容 (children) 会显示在这里 */}
        {children}
        
        {/* 2. 把探针放在这里 (Body 结束标签之前) */}
        <Analytics />
      </body>
    </html>
  );
}