import type { Metadata } from "next";
import "@/app/_styles/globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Header from "@/_components/layout/Header";
import Sidebar from "@/_components/layout/Sidebar";
import { auth } from "./_lib/auth";
import { Providers } from "./providers";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kanban / Task Management App",
  description: "Frontend Mentor | Kanban task management web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${jakarta.className} h-full text-sm font-medium text-primary-300`}
      >
        <SessionProvider refetchOnWindowFocus={false}>
          <Providers>
            <main className="flex h-full">
              <Sidebar />
              <section className="flex size-full flex-col overflow-x-hidden">
                <Header />
                {children}
              </section>
            </main>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
