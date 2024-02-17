import LoginForm from "@/components/Login";
import DnD from "@/components/dnd/DnD";
import { validate } from "./actions";

export default async function Home() {
  const { loggedIn } = await validate();
  if (!loggedIn) {
    return (
      <main className="m-12 flex flex-col items-center h-full justify-center">
        <LoginForm />
      </main>
    );
  }
  return (
    <main className="h-screen w-screen">
      <DnD />
    </main>
  );
}
