import type { Metadata } from "next";
import { Inter, Ubuntu } from "next/font/google";
import "../styles/globals.css";
import "../styles/register.module.css";

const inter = Inter({ subsets: ["latin"] });

const ubuntu = Ubuntu({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: {
    default: "HOD Kids Pick-Up Platform",
    template: "%s | HOD Kids Pick-Up Platform"
  },
  description: "a simple app to help parents organize and monitor pickups",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: dark)",
        url: "../public/images/hodlogo1.png",
        href: "../public/images/hodlogo1.png"
      },
      {
        media: "(prefers-color-scheme: light)",
        url: "../public/images/hodlogo1.png",
        href: "../public/images/hodlogo1.png",
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
      <body className={ubuntu.className}>{children}</body>
    </html>
  );
}
