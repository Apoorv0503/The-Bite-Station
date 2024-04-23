import React from "react";
import ItemList from "./ItemList";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();
  const handleClearCart=()=>{
      dispatch(clearCart());
  }

  return (
    <div className="flex w-6/12 justify-between flex-col mx-auto border border-solid border-grat-200">
      <div className="flex justify-between mx-5 my-3">
      <h1 className="text-3xl my-3 font-semibold">Cart</h1>
      <button
        className=" px-2  m-2 bg-black text-white rounded-lg"
        onClick={handleClearCart}
      >
        Clear Cart
      </button>
      </div>
      {cartItems?.length === 0 && (
        <h1 className="mx-auto my-3"> Cart is empty. Add Items to the cart!</h1>
      )}
      <ItemList items={cartItems} readOnly={false} />
    </div>
  );
};

export default Cart;
