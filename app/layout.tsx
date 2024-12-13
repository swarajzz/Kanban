import type { Metadata } from "next";
import "@/app/_styles/globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Sidebar from "@/app/_components/layout/Sidebar";
import Header from "@/app/_components/layout/Header";
import { SessionProvider } from "next-auth/react";

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
    <html lang="en" className="h-full">
      <body
        className={`${jakarta.className} h-full text-sm font-medium text-primary-300`}
      >
        <SessionProvider>
          <main className="flex h-full">
            <Sidebar />
            <section className="flex size-full flex-col overflow-x-hidden">
              <Header />
              {children}
            </section>
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
