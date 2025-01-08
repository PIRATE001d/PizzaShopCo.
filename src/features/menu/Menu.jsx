import { getMenu } from "../../services/apiRestaurant";
import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();

  console.log(menu);

  return (
    <ul>
      {menu && menu.length > 0 ? (
        menu.map((pizza) => <MenuItem key={pizza.id} item={pizza} />)
      ) : (
        <li>No pizzas in the menu</li>
      )}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
