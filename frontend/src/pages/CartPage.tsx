import { useState } from "react";
import PurchaseForm from "../components/PurchaseForm";
import { toast } from "react-toastify";
import { useStore } from "../stores/store.ts";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";

interface CartItems {
  images: string[];
  title: string;
  price: number;
  quantity?: number;
}

const CartPage = () => {
  const navigate = useNavigate();
  const { openPurchaseForm, purchaseFormContext } = useStore();

  const [cartItems, setCartItems] = useState<CartItems[]>(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  const updateQuantity = (title: string, change: number) => {
    const updatedItems = cartItems.map((item: CartItems) =>
      item.title === title
        ? {
            ...item,
            quantity: Math.min(30, Math.max(1, item.quantity! + change)),
          }
        : item
    );

    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const increment = (title: string) => updateQuantity(title, 1);
  const decrement = (title: string) => updateQuantity(title, -1);

  const remove = (title: string) => {
    const removeItems = cartItems.filter(
      (item: CartItems) => item.title !== title
    );

    setCartItems(removeItems);
    localStorage.setItem("cartItems", JSON.stringify(removeItems));
  };

  return (
    <div className="flex justify-center items-center h-screen w-full px-2 py-15 bg-gradient-to-br from-indigo-500 to-lime-500">
      <BiArrowBack
        className="hidden sm:block absolute top-13 left-1 h-10 w-10 rounded-full bg-white/50 cursor-pointer hover:bg-gray-200"
        onClick={() => navigate(-1)}
      />
      <div className="flex flex-col gap-1 mt-17 bg-white h-full w-full max-w-300 p-2 md:p-4  overflow-y-auto shadow-2xl">
        <div className="flex justify-between">
          {" "}
          <h1>Shopping Cart</h1>
          <p
            className="text-red-500 cursor-pointer"
            onClick={() => {
              localStorage.removeItem("cartItems");
              setCartItems([]);
            }}>
            Remove all
          </p>
        </div>
        <div className="flex flex-col p-2 gap-2 grow h-10 border overflow-y-auto">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="grid grid-cols-4 gap-2 items-center">
                <img src={item.images[0]} alt="" className="h-15 w-auto" />
                <h2 className="text-xs font-black">{item.title}</h2>
                <div className="flex gap-1">
                  <button
                    className="bg-gray-300 rounded-full h-7 w-7 pb-1 disabled:bg-gray-100 disabled:cursor-not-allowed cursor-pointer"
                    onClick={() => {
                      decrement(item.title);
                    }}
                    disabled={item.quantity! === 1}>
                    -
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    className="bg-gray-300 rounded-full h-7 w-7 pb-1 disabled:bg-gray-100 disabled:cursor-not-allowed cursor-pointer"
                    onClick={() => increment(item.title)}
                    disabled={item.quantity! > 30}>
                    +
                  </button>
                </div>
                {/* <div className=""> */}
                <p className="flex flex-col text-center text-sm font-semibold">
                  ${item.price * (item.quantity || 1)}
                  <span
                    className="m-auto text-red-500 border-b text-xs cursor-pointer"
                    onClick={() => remove(item.title)}>
                    Remove
                  </span>
                </p>
                {/* </div> */}
              </div>
            ))
          ) : (
            <p className="text-gray-500 flex justify-center items-center w-full h-full">
              Cart is Empty
            </p>
          )}
          {/* <div className="grid grid-cols-4">
            <div className=" border-t-2 col-start-2 col-span-3"></div>
          </div> */}
          <div className="grid grid-cols-4 gap-2 items-center font-semibold border-t-2">
            <p className="col-start-3 ">
              Items: {cartItems.reduce((acc, curr) => acc + curr.quantity!, 0)}
            </p>
            <p className="col-start-4 text-center ">
              $
              {cartItems
                .reduce((acc, curr) => acc + curr.price * curr.quantity!, 0)
                .toFixed(2)}
            </p>
          </div>
          <p className="text-xs">
            (Please check the price before purchasing, the price shown in cart
            might be outdated)
          </p>
        </div>
        <button
          className="ms-auto bg-sky-300 py-1 px-2 rounded-lg cursor-pointer"
          onClick={() => {
            console.log(openPurchaseForm);
            cartItems.length > 0
              ? openPurchaseForm("Cart")
              : toast.error("Cart is Empty");
          }}>
          CheckOut
        </button>
        {purchaseFormContext === "Cart" && <PurchaseForm />}
      </div>
    </div>
  );
};

export default CartPage;
