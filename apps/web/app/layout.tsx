import "./globals.css";
import { Lato } from "next/font/google";

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
