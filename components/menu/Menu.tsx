import { validate } from "@/app/actions";
import Logout from "../Logout";
import { ModeToggle } from "./ModeToggle";
import RegisterButton from "./RegisterButton";

export default async function Menu() {
  const { loggedIn } = await validate();
  return (
    <div className="fixed flex items-center p-2 w-screen z-10 border-b">
      <h1 className="text-2xl font-bold">Bucket List</h1>
      <div className="flex-grow" />
      <div className="flex gap-2 items-center">
        {loggedIn ? <Logout /> : <RegisterButton />}
        <ModeToggle />
      </div>
    </div>
  );
}
