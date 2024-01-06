import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kids Pickup App",
  description: "a simple app to help parents organize and monitor pickups",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: dark)",
        url: "../../public/image/hodlogo1.png",
        href: "../../public/image/hodlogo1.png",
      },
      {
        media: "(prefers-color-scheme: light)",
        url: "../../public/image/hodlogo1.png",
        href: "../../public/image/hodlogo1.png",
      },
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
