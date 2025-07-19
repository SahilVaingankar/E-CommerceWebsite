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

  const newItem: CartItems = {
    ...item,
    quantity: item.quantity ?? 1,
  };

  cartItems.push(newItem);

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
