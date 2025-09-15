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
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22green%22/></svg>"
        />
        <section
          style={{
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: "#76cd76ff",
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
          <Link href="/search" className="redirect-main" style={{ marginLeft: '20px' }}>Search Orders</Link> 
          <Link href="/faq" className="redirect-main" style={{ marginLeft: '20px' }}>FAQ</Link>
          <Link href="/contact" className="redirect-main" style={{ marginLeft: '20px' }}>Contact</Link>
        </section>  
        {children}
      </body>
    </html>
  );
}
