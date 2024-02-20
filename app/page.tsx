import LoginForm from "@/components/Login";
import DnD from "@/components/dnd/DnD";
import { getLists, validate } from "./actions";

export default async function Home() {
  const { loggedIn, userId } = await validate();
  if (!loggedIn) {
    return (
      <main className="m-12 flex flex-col items-center h-full justify-center">
        <LoginForm />
      </main>
    );
  }

  if (!userId) {
    throw new Error("No user ID");
  }

  const lists = await getLists(userId);

  return (
    <main className="h-screen w-screen">
      <DnD lists={lists} />
    </main>
  );
}
