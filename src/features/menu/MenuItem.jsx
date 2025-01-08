import { formatCurrency } from "../../utils/helpers";
import ButtonRE from "../../ui/ButtonRE";
import { useAtom } from "jotai";
import { addItemAtom } from "../cart/cartSlice";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from 'react-intersection-observer';

function MenuItem({ item, index }) {
  const { name, unitPrice, ingredients, soldOut, imageUrl, id } = item;
  const [, addItem] = useAtom(addItemAtom);

  // React Spring animation
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once when the item comes into view
    threshold: 0.1, // Trigger when 10% of the item is in view
  });

  // Animation styles
  const springProps = useSpring({
    opacity: inView ? 1 : 0, // Fade in when in view
    transform: inView ? "translateY(0)" : "translateY(30px)", // Slide up when in view
    delay: index * 100, // Staggered animation based on index
  });

  const handleAddToCart = () => {
    const newItem = {
      id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    addItem(newItem); // Add item to cart
    console.log("Added to cart", newItem);
  };

  return (
    <animated.li
      ref={ref} // Observe the scroll position of this element
      style={springProps}
      className="flex flex-row justify-between items-center gap-4 py-4 border-b border-gray-200"
    >
      <img
        src={imageUrl}
        alt={name}
        className={`h-27 w-27 ${soldOut ? "grayscale" : ""}`}
      />
      <div className="flex-1">
        <p className="font-bold">{name}</p>
        <p className="text-sm text-gray-500">{ingredients.join(", ")}</p>
        <div className="flex justify-between items-center mt-2">
          {!soldOut ? (
            <p className="text-lg">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-red-500">Sold out</p>
          )}
          {!soldOut ? (
            <ButtonRE onClick={handleAddToCart}>Add to cart</ButtonRE>
          ) : null}
        </div>
      </div>
    </animated.li>
  );
}

export default MenuItem;
