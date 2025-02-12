import EmptyPage from "../_components/ui/EmptyPage";
import { auth } from "../_lib/auth";

export default async function Home() {
  const session = await auth();

  if (!session?.user?.id) return;

  return (
    <EmptyPage
      userId={session?.user?.id}
      title="Welcome to Kanban Task Management"
      subTitle="You can start selecting a created board or if you want you can create a new one"
      btnText="Add new Board"
    />
  );
}
