"use client";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/header/header";
import Footer from "./_components/footer/footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();
// export const metadata: Metadata = {
//   title: "Movie Room",
//   description: "극장 가기전에 궁금할 땐 모다?",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <Header />
          {children}
          <Footer />{" "}
        </QueryClientProvider>
      </body>
    </html>
  );
}
