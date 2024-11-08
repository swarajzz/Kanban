import Board from "./_components/layout/Board";
import { auth } from "./_lib/auth";

export default async function Home() {
  const session = await auth();

  return <Board userId={session?.user?.id || ""} />;
}
