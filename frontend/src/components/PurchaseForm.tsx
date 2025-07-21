import { RxCross2 } from "react-icons/rx";
import { useStore } from "../stores/store.ts";

const PurchaseForm = () => {
  const { closePurchaseForm } = useStore();

  return (
    <form className="absolute mt-5 md:mt-7 top-1/2 left-1/2 -translate-1/2 w-[90%] max-w-3xl bg-white px-8 py-3 rounded-md shadow-2xl shadow-black space-y-4">
      <button
        className="absolute top-2 right-3 cursor-pointer"
        onClick={closePurchaseForm}>
        <RxCross2 className="h-10 w-10" />
      </button>
      <h2 className="text-2xl font-bold text-center">Checkout</h2>

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Street Address"
          className="w-full p-2 border rounded-md"
          required
        />
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="City"
            className="w-1/2 p-2 border rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Postal Code"
            className="w-1/2 p-2 border rounded-md"
            required
          />
        </div>
        <input
          type="text"
          placeholder="Country"
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Card Number"
          className="w-full p-2 border rounded-md"
          required
        />
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="MM/YY"
            className="w-1/2 p-2 border rounded-md"
            required
          />
          <input
            type="text"
            placeholder="CVV"
            className="w-1/2 p-2 border rounded-md"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
        Place Order
      </button>
    </form>
  );
};

export default PurchaseForm;
