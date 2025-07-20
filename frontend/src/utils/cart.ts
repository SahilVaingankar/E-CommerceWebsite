interface CartItems {
  images: string[];
  title: string;
  price: number;
  quantity?: number;
}

export const addToCart = (item: CartItems) => {
  const storedCartItems = localStorage.getItem("cartItems");
  const cartItems: CartItems[] = storedCartItems
    ? JSON.parse(storedCartItems)
    : [];

  const itemExists = cartItems.some(
    (cartItem) => cartItem.title === item.title
  );

  const updatedCart = itemExists
    ? cartItems.map((cartItem) =>
        cartItem.title === item.title
          ? { ...cartItem, quantity: cartItem.quantity! + 1 }
          : cartItem
      )
    : [...cartItems, { ...item, quantity: item.quantity ?? 1 }];

  localStorage.setItem("cartItems", JSON.stringify(updatedCart));
};
