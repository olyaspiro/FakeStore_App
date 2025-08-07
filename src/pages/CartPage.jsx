import React from "react";
import CartAndOrderHistory from "../components/CartAndOrderHistory";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, clearCart, updateQuantity } from "../cartSlice";


const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const clearCartFunction = () => {
    dispatch(clearCart());
  };

  return (
    <CartAndOrderHistory cartItems={cartItems} clearCart={clearCartFunction} />
  );
};

export default CartPage;
