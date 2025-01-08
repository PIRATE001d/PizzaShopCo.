import { getOrder } from "../../services/apiRestaurant";
import { useLoaderData } from "react-router-dom";
import OrderItem from "./OrderItem";
//IIDSAT

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";

function Order() {
  const order = useLoaderData();

  const {
    status,
    id,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="max-w-xl mx-auto  p-6  space-y-6">
      {/* Status Section */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Order {id}  Status</h2>
        <div className="flex items-center justify-between">
          {priority && (
            <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm">
              Priority
            </span>
          )}
          <span
            className={`px-3 py-1 text-sm rounded-full ${
              status === "delivered"
                ? "bg-green-500 text-white"
                : "bg-blue-500 text-white"
            }`}
          >
            {status} order
          </span>
        </div>
      </div>

      {/* Delivery Time Section */}
      <div className="bg-gray-100 p-4 rounded-lg flex flex-wrap items-center justify-between ">
        <p className="text-gray-700 text-lg font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-gray-500 text-sm">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="divide-stone-200 divide-y">
        {cart.map((item) => (
          <OrderItem key={item.pizzaId} item={item} />
        ))}

      </ul>

      {/* Price Section */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-gray-700 text-lg">
          Price pizza:{" "}
          <span className="font-semibold">{formatCurrency(orderPrice)}</span>
        </p>
        {priority && (
          <p className="text-gray-700 text-lg">
            Price priority:{" "}
            <span className="font-semibold">
              {formatCurrency(priorityPrice)}
            </span>
          </p>
        )}
        <p className="text-gray-700 text-lg font-medium">
          To pay on delivery:{" "}
          <span className="font-bold text-green-500">
            {formatCurrency(orderPrice + priorityPrice)}
          </span>
        </p>
      </div>
    </div>
  );
}

export const loader = async ({ params }) => {
  try {
    const order = await getOrder(params.OrderId);
    console.log("order", order);
    return order;
  } catch (error) {
    throw new Error("Error loading order");
  }
};

export default Order;
