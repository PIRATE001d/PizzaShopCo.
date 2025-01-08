import { useAtom } from "jotai";
import { UserNameAtom } from './userSlice'; 

function UserName() {
  const [username] = useAtom(UserNameAtom); // Access the atom that holds the username

  if (!username) return null; // Do not display if username is not set

  return (
    <div className="text-sm font-semibold hidden md:block">
      {username || 'Guest'}
    </div>
  );
}

export default UserName;
