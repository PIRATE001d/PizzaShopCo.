import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/users/UserName";


function Header() {
  return (
    <header className=" flex items-center font-PizzaFont justify-between px-4 py-3 border-b-2 border-stone-200 bg-yellow-500 uppercase " >
      <Link to="/" className='tracking-[5px]'>Pizza Shop Co.</Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
