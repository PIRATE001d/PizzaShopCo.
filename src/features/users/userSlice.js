import { getAddress } from '../../services/apiGeocoding';
import { atom } from 'jotai';

// 1. Get the user's geolocation position
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// 2. Fetch the address based on geolocation
async function fetchAddress() {
  const positionObj = await getPosition(); 
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  const addressObj = await getAddress(position); 
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  return { position, address };
}

// Jotai atom to store the address data and state
export const AdressAtom = atom({
  position: null,
  address: null,
  isLoadingAddress: false,
  error: null,
});

// Jotai async atom to load the address
export const LoadAdressAtom = atom(null, async (get, set) => {
  try {
    // Set loading state to true
    set(AdressAtom, (prev) => ({
      ...prev,
      isLoadingAddress: true,
    }));

    // Fetch the address and set it to the atom
    const data = await fetchAddress();
    set(AdressAtom, {
      position: data.position,
      address: data.address,
      isLoadingAddress: false,
      error: null,
    });
  } catch (error) {
    // Handle error case
    set(AdressAtom, (prev) => ({
      ...prev,
      isLoadingAddress: false,
      error: error.message,
    }));
  }
});





/* eslint-disable no-undef */


// Check if the environment is the browser before accessing localStorage
const isBrowser = typeof window !== 'undefined';

// Get the saved username from the localStorage (if available)
const savedUsername = isBrowser ? localStorage.getItem('username') || "" : "";

// Atom to store the username, initialized with savedUsername from localStorage (if available)
export const UserNameAtom = atom(savedUsername);

// Atom to update the username and store it in localStorage (only in the browser)
export const UpdateUsenameAtom = atom(
  null,
  (get, set, newUserName) => {
    if (newUserName && isBrowser) {
      // Update the atom and localStorage only if in the browser
      localStorage.setItem('username', newUserName);
      set(UserNameAtom, newUserName);
    }
  }
);

// Initial cart state for the user (empty cart by default)
const getCartFromLocalStorage = () => {
  const username = savedUsername;
  if (username && isBrowser) {
    const cart = localStorage.getItem(`${username}-cart`);
    return cart ? JSON.parse(cart) : []; // Retrieve user's cart from localStorage or return an empty array
  }
  return [];
};

// Atom to hold the cart state, initialized with cart data from localStorage
export const cartAtom = atom(getCartFromLocalStorage);

// Atom for adding an item to the cart
export const addItemAtom = atom(
  null,
  (get, set, newItem) => {
    const cart = get(cartAtom);
    const updatedCart = [...cart, newItem];
    set(cartAtom, updatedCart);

    // Store updated cart in localStorage for the current username
    if (savedUsername && isBrowser) {
      localStorage.setItem(`${savedUsername}-cart`, JSON.stringify(updatedCart));
    }
  }
);

// Other cart operations, such as deleting items, increasing or decreasing quantity, can follow a similar pattern:
export const deleteItemAtom = atom(
  null,
  (get, set, itemId) => {
    const cart = get(cartAtom);
    const updatedCart = cart.filter(item => item.id !== itemId);
    set(cartAtom, updatedCart);

    if (savedUsername && isBrowser) {
      localStorage.setItem(`${savedUsername}-cart`, JSON.stringify(updatedCart));
    }
  }
);
