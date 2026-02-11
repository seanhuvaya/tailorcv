import "./globals.css";
import type { Metadata } from 'next';
import { Lato } from "next/font/google";

export const metadata: Metadata = {
  title: 'TailorCV - AI-Powered Resume Tailoring',
  description: 'Tailor your resume for specific jobs using AI and track your applications',
  openGraph: {
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

const lato = Lato({
    subsets: ["latin"],
    variable: "--font-lato",
    weight: ["100", "300", "400", "700", "900"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={lato.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}






