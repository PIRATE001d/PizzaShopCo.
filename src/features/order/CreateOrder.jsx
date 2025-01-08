import { Form } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { UserNameAtom, LoadAdressAtom, AdressAtom } from "../users/userSlice";
import { cartAtom } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";

function CreateOrder() {
  const [username] = useAtom(UserNameAtom);
  const [cart] = useAtom(cartAtom);
  const [adressState, setAdresseState] = useAtom(AdressAtom);
  const [, loadAddress] = useAtom(LoadAdressAtom);
  const navigate = useNavigate();
  const isSubmitting = navigate.state === "submitting";

  // Early return if the cart is empty
  if (cart.length === 0) return <EmptyCart />;

  // Fetch address on button click
  const handleFetchAddress = async () => {
    try {
      const addressData = await loadAddress(); 
      if (addressData && addressData.results && addressData.results.length > 0) {
        const formattedAddress = addressData.results[0].formatted;
  
        // Set the fetched address into the form state
        setAdresseState((prev) => ({
          ...prev,
          address: formattedAddress, 
        }));
      } 
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-6 py-9 font-PizzaFont">
      <h2 className="text-2xl font-bold text-yellow-500 mb-6 text-center">
        Ready to order? Let’s go!
      </h2>

      <Form method="POST" className="space-y-4">
        {/* First Name */}
        <div>
          <label
            className="block text-stone-700 font-medium mb-1"
            htmlFor="customer"
          >
            First Name
          </label>
          <input
            type="text"
            name="customer"
            id="customer"
            defaultValue={username}
            required
            className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-300"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label
            className="block text-stone-700 font-medium mb-2"
            htmlFor="phone"
          >
            Phone number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            required
            className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-300"
          />
        </div>

        {/* Address */}
        <div className="relative w-full">
          <label
            className="block text-stone-700 font-medium mb-2"
            htmlFor="address"
          >
            Address
          </label>

          {/* Input field container */}
          <input
            type="text"
            name="address"
            id="address"
            value={adressState.address || ""}
            onChange={(e) => setAdresseState({ address: e.target.value })}
            required
            className="w-full px-4 py-2 pl-3 pr-12 border border-stone-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-300"
          />

          {/* Button inside the input with blending effect */}
          <button
            type="button"
            className="absolute right-0 top-[3.3rem] text-center uppercase transform -translate-y-1/2 py-2 bg-yellow-400 text-white rounded-r-md opacity-80 hover:opacity-50 transition-opacity"
            style={{ borderLeft: "none" }}
            onClick={handleFetchAddress}
          >
            Your position
          </button>
        </div>

        {/* Priority Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="w-5 h-5 text-yellow-500 accent-current rounded focus:ring-yellow-200"
          />
          <label htmlFor="priority" className="text-stone-700 text-[0.7rem]">
            Want to give your order priority?
          </label>
        </div>

        {/* Hidden Field for Cart Data */}
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
  type="hidden"
  name="position"
  value={adressState.position?.latitude && adressState.position?.longitude 
      ? `${adressState.position.latitude}, ${adressState.position.longitude}` 
      : ""}
/>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inputBtn w-full ${
              isSubmitting
                ? "bg-stone-400 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500"
            }`}
          >
            {isSubmitting ? "Placing Order" : "Order now"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function Action({ request }) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const cart = data.cart ? JSON.parse(data.cart) : [];
    const transformedCart = cart.map((item) => ({
      pizzaId: item.id || item.pizzaId,
      quantity: item.quantity,
      name: item.name,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
    }));
    if (transformedCart.some((item) => !item.pizzaId)) {
      throw new Error("Invalid cart data: Some items are missing a pizzaId.");
    }

    const order = {
      ...data,
      cart: transformedCart,
      priority: data.priority === "on",
      position: data.position,

    };
    console.log("Order data:", order);

    const newOrder = await createOrder(order);
    if (!newOrder) {
      throw new Error("Failed creating your order");
    }
    return redirect(`/order/${newOrder.id}`);
  } catch (error) {
    console.error("Error in Action function:", error);
    console.log("Error details:", error.response?.data || error.message);
    throw new Error("Failed creating your order");
  }
}

export default CreateOrder;
