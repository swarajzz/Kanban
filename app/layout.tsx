import type { Metadata } from "next";
import "@/app/_styles/globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Header from "@/_components/layout/Header";
import Sidebar from "@/_components/layout/Sidebar";
import { auth } from "./_lib/auth";
import { Providers } from "@/app/_providers/providers";
import { getBoards } from "@/_lib/data-service";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kanban / Task Management App",
  description: "Frontend Mentor | Kanban task management web app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const allBoards = await getBoards(session?.user?.id || "");

  if (!session?.user) {
    throw new Error("User Not Found");
  }

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${jakarta.className} h-full text-sm font-medium text-primary-300`}
      >
        <SessionProvider session={session} refetchOnWindowFocus={false}>
          <Providers>
            <main className="flex h-full">
              <Sidebar allBoards={allBoards} user={session.user} />
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
