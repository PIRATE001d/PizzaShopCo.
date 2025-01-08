import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { cartAtom } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";


function CartOverview() { 
  const [cart,] = useAtom(cartAtom);

  const TotalCartQnty = cart.reduce((acc, item) => acc + item.quantity, 0);
  const TotalCartPrice = cart.reduce((acc, item) => {
    if (isNaN(item.totalPrice)) {
      console.error("Invalid totalPrice for item", item);
      return acc;
    }
    return acc + item.totalPrice;
  }, 0);

  const formattedTotalPrice = formatCurrency(TotalCartPrice);


  return (
    <div className="flex items-center justify-between bg-stone-800 text-stone-100 p-4  uppercase">
      <p className='text-stone-200 space-x-4 font-semibold'>
        <span className="font-semibold">{TotalCartQnty} pizzas</span>
        <span>{formattedTotalPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
