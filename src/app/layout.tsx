import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";
import NavbarWrapper from "../Components/Navbar/NavbarWrapper.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import FroxyAssistant from "../Components/Froxy/FroxyAssistant.jsx";
import NextAuthSessionProvider from './providers';
import { EnquiryCartProvider } from '@/context/EnquiryCartContext';
import EnquiryCartDrawer from '@/Components/EnquiryCart/EnquiryCartDrawer';

export const metadata: Metadata = {
  title: "Pharmavive | Precision Chemical Synthesis & Reference Standards",
  description: "Global pharmaceutical CDMO partner specializing in high-purity API impurities, reagents, building blocks, and custom organic synthesis.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900`}>
        <NextAuthSessionProvider>
          <EnquiryCartProvider>
            <NavbarWrapper />
            <main className="flex-1">
              {children}
            </main>
            <EnquiryCartDrawer />
            <FroxyAssistant />
            <Footer />
          </EnquiryCartProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}