import Sidebar from "@/_components/layout/Sidebar";
import { auth } from "@/_lib/auth";
import { getBoards } from "@/_lib/data-service";

export default async function SidebarMain() {
  const session = await auth();
  const allBoards = await getBoards(session?.user?.id || "");

  return (
    session?.user && <Sidebar allBoards={allBoards} user={session.user} />
  );
}
