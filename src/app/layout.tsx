import type { Metadata } from "next";
import "./globals.css";
import { Rubik_Moonrocks } from "next/font/google";

export const metadata: Metadata = {
  title: "Marc Newman",
  description: "Marc Newman's personal website",
};

const rubikMoonrocks = Rubik_Moonrocks({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-rubik-moonrocks",
  weight: "400",
});

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className={`${rubikMoonrocks.variable}`}>
      <body>{children}</body>
    </html>
  );
}
