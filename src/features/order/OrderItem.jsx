import { formatCurrency } from "../../utils/helpers";
//eslint-disable-next-line
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-4   ">
      <div className="flex justify-between font-PizzaFont ">
        <p className="text-gray-600 ">
          <span className='font-bold'>{quantity}&times;</span> {name}
        </p>
        <p className='font-semibold'>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
