import { useState } from "react";

interface CartItems {
  images: string[];
  title: string;
  price: number;
  quantity?: number;
}

const CartPage = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const storedCartItems = localStorage.getItem("cartItems");
  const cartItems: CartItems[] = storedCartItems
    ? JSON.parse(storedCartItems)
    : [];

  const increment = (title: string) => {
    const updatedItems = cartItems.map((item: CartItems) =>
      item.title === title ? { ...item, quantity: item.quantity! - 1 } : item
    );

    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrement = (title: string) => {
    const updatedItems = cartItems.map((item: CartItems) =>
      item.title === title ? { ...item, quantity: item.quantity! - 1 } : item
    );

    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  return (
    <div className="flex justify-center items-center h-screen w-full p-2 bg-gradient-to-br from-indigo-500 to-lime-500">
      <div className="flex flex-col gap-1 mt-15 bg-white w-full p-2 min-h-100 overflow-y-auto shadow-2xl">
        <div className="flex justify-between">
          {" "}
          <h1>Shopping Cart</h1>
          <p
            className="text-red-500"
            onClick={() => {
              localStorage.removeItem("cartItems");
            }}>
            Remove all
          </p>
        </div>
        <div className="flex flex-col justify-center p-2 gap-2 grow h-full border overflow-y-auto">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="flex justify-between items-center gap-2">
                <img src={item.images[0]} alt="" className="h-15 w-auto" />
                <h2 className="text-xs font-black">{item.title}</h2>
                <div className="flex gap-1">
                  <button
                    className="bg-gray-300 rounded-full h-7 w-7 pb-1"
                    onClick={() => {
                      decrement(item.title);
                    }}>
                    -
                  </button>
                  <p>{item.quantity || quantity}</p>
                  <button
                    className="bg-gray-300 rounded-full h-7 w-7 pb-1"
                    onClick={() => increment(item.title)}>
                    +
                  </button>
                </div>
                <div className="flex flex-col text-center">
                  <p className="text-sm font-semibold">
                    ${item.price * (item.quantity || quantity)}
                  </p>
                  <div className="text-red-500 border-b text-xs">Remove</div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 flex justify-center items-center">
              Cart is Empty
            </p>
          )}
        </div>
        <button className="ms-auto bg-sky-300 py-1 px-2 rounded-lg">
          CheckOut
        </button>
      </div>
    </div>
  );
};

export default CartPage;
