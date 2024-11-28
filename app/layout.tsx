import type { Metadata } from "next";
import "@/app/_styles/globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Sidebar from "@/app/_components/layout/Sidebar";
import Header from "@/app/_components/layout/Header";
import { ColumnProvider } from "./_components/ColumnContext";

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
    <html lang="en" className="h-screen">
      <body
        className={`${jakarta.className} h-screen text-sm font-medium text-primary-300`}
      >
        <main className="flex size-full">
          <Sidebar />
          <section className="flex w-full flex-col overflow-x-hidden">
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
