import type { Metadata } from "next";
import { heebo } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "יום המעשים הטובים - Good Deeds Day",
  description: "מעשה טוב קטן יכול לעשות יום גדול למישהו אחר!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="font-heebo">{children}</body>
    </html>
  );
}
