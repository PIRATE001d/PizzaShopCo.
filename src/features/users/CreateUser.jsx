import ButtonRE from "../../ui/ButtonRE";
import { useAtom } from "jotai";
import { UserNameAtom, UpdateUsenameAtom } from "./userSlice";
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";


function CreateUser() {
  //eslint-disable-next-line
  const [username, setUsername] = useAtom(UserNameAtom); // Atom to store the username
  const [, updateUsername] = useAtom(UpdateUsenameAtom); // Atom to update the username
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState(username || ""); // Local state for input value, initialized with the username

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      updateUsername(inputValue); // Update the atom with the input value when Enter is pressed
      setInputValue(''); // Update the local state with the input value
      navigate('/menu');

    }
  }

  return (
    <form>
      <p>👋 Welcome! Please start by telling us your name:</p>

      <div>
{ username ?<Link to="/menu">  <ButtonRE  >Continue Ordering . {username}</ButtonRE> </Link>  : <> <input
        type="text"
        placeholder="Your full name"
        className="inputField"
        onChange={(e) => setInputValue(e.target.value)} // Update local state when the user types
        onKeyDown={handleKeyPress} // Listen for the Enter key press
        />

      {inputValue !== "" && (
        <div className="mt-4 py-2">
          <ButtonRE>Start ordering</ButtonRE>
        </div>
      )} </> }

      
      </div>
    </form>
  );
}

export default CreateUser;
