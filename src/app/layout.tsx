import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "K.T.N.K",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <section
          style={{
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: "#ccfbcc",
            color: "#000",
            padding: "10px 20px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <p className="group-name" style={{ marginRight: 'auto' }}>K.T.N.K</p>
          <Link href="/" className="redirect-main" style={{ marginLeft: '20px' }}>Home</Link>
          <Link href="/about" className="redirect-main" style={{ marginLeft: '20px' }}>About</Link>
          <Link href="/services" className="redirect-main" style={{ marginLeft: '20px' }}>Services</Link>
          <Link href="/contact" className="redirect-main" style={{ marginLeft: '20px' }}>Contact</Link>
          <Link href="/faq" className="redirect-main" style={{ marginLeft: '20px' }}>FAQ</Link>
        </section>
        {children}
      </body>
    </html>
  );
}
