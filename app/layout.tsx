import type { Metadata } from "next";
import "@/app/_styles/globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Sidebar from "@/app/_components/layout/Sidebar";
import Header from "@/app/_components/layout/Header";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kanban",
  description: "Frontend Mentor | Kanban task management web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.className} text-sm font-bold text-primary-300`}
      >
        <main className="flex overflow-hidden">
          <Sidebar />
          <section className="flex w-full flex-col overflow-hidden">
            <Header />
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
