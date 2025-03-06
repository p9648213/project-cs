import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import SideMenu from "@/components/side-menu";
import { CollapseContextProvider } from "@/context/collapse-context";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CollapseContextProvider>
          <SideMenu />
          <Header />
          {children}
        </CollapseContextProvider>
      </body>
    </html>
  );
}
