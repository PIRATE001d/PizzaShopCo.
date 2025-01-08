import { atom } from 'jotai';

// Check if the environment is the browser before accessing localStorage
const isBrowser = typeof window !== 'undefined';

/* eslint-disable no-undef */

// Initial state for the cart, get from localStorage if available
const initialCartState = isBrowser
  ? JSON.parse(localStorage.getItem('cart')) || []
  : [];



// Atom to hold the cart state
export const cartAtom = atom(initialCartState);

// Atom for adding an item to the cart
export const addItemAtom = atom(
  null,
  (get, set, newItem) => {
    const cart = get(cartAtom);
    
    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex(item => item.id === newItem.id);
    
    if (existingItemIndex !== -1) {
      // Item already exists, increase the quantity and update total price
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      updatedCart[existingItemIndex].totalPrice = updatedCart[existingItemIndex].unitPrice * updatedCart[existingItemIndex].quantity;
      set(cartAtom, updatedCart);
      if (isBrowser) {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
    } else {
      // Item doesn't exist, add as a new item
      set(cartAtom, [...cart, newItem]);
      if (isBrowser) {
        localStorage.setItem('cart', JSON.stringify([...cart, newItem]));
      }
    }
  }
);

// Atom for deleting an item from the cart
export const deleteItemAtom = atom(
  null,
  (get, set, itemId) => {
    const cart = get(cartAtom);
    const updatedCart = cart.filter(item => item.id !== itemId);
    set(cartAtom, updatedCart);
    // Update localStorage
    if (isBrowser) {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  }
);

// Atom for increasing the quantity of an item
export const increaseItemQuantityAtom = atom(
  null,
  (get, set, itemId) => {
    const cart = get(cartAtom);
    
    // Find the item in the cart
    const updatedCart = cart.map(item =>
      item.id === itemId 
        ? { 
            ...item, 
            quantity: item.quantity + 1, 
            totalPrice: (item.quantity + 1) * item.unitPrice // Recalculate total price after increasing quantity
          }
        : item
    );
    
    set(cartAtom, updatedCart);
    
    // Update localStorage if running in the browser
    if (isBrowser) {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  }
);

// Atom for decreasing the quantity of an item
export const decreaseItemQuantityAtom = atom(
  null,
  (get, set, itemId) => {
    const cart = get(cartAtom);
    
    // Find the item in the cart and decrease the quantity only if it's greater than 1
    const updatedCart = cart.map(item =>
      item.id === itemId && item.quantity > 1
        ? { 
            ...item, 
            quantity: item.quantity - 1, 
            totalPrice: (item.quantity - 1) * item.unitPrice // Recalculate total price after decreasing quantity
          }
        : item
    );
    
    set(cartAtom, updatedCart);
    
    // Update localStorage if running in the browser
    if (isBrowser) {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  }
);


// Atom for clearing the cart
export const clearCartAtom = atom(
  null,
  (get, set) => {
    set(cartAtom, []);
    if (isBrowser) {
      localStorage.removeItem('cart');
    }
  }
);

// Helper function to calculate total price for each item
const calculateTotalPrice = (item) => item.unitPrice * item.quantity;

// Updated Atom for cart with dynamic totalPrice calculation
export const cartWithTotalPriceAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart.map(item => ({
    ...item,
    totalPrice: calculateTotalPrice(item),
  }));
});
