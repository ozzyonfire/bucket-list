import { validate } from "@/app/actions";
import Logout from "../Logout";
import NewListButton from "./NewListButton";
import { ModeToggle } from "./ModeToggle";
import RegisterButton from "./RegisterButton";
import Toolbar from "./Toolbar";

export default async function Menu() {
  const { loggedIn } = await validate();
  return (
    <div className="fixed flex items-center p-2 w-screen z-10 border-b gap-2">
      <h1 className="text-2xl font-bold">Bucket List</h1>
      <Toolbar />
      <div className="flex-grow" />
      <div className="flex gap-2 items-center">
        <NewListButton />
        {loggedIn ? <Logout /> : <RegisterButton />}
        <ModeToggle />
      </div>
    </div>
  );
}
