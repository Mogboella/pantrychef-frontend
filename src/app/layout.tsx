import type { Metadata } from "next";
import { Quicksand, Fira_Code, Luckiest_Guy } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700']
})

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
})

const luckiestGuy = Luckiest_Guy({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-luckiest-guy',
})

export const metadata: Metadata = {
  title: "PC",
  description: "PantryChef, your super kitchen assistant",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.variable} ${firaCode.variable} ${luckiestGuy.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
