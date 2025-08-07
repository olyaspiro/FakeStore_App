import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import useAuth from "../features/useAuth"; 

const CartAndOrderHistory = ({ cartItems, clearCart }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // ✅ Place Order
  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please log in to place an order.");
      return;
    }

    const order = {
      userId: user.uid,
      email: user.email,
      products: cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      totalAmount,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "orders"), order);
      alert("Order placed successfully!");
      clearCart(); // ⬅️ clear cart if you have this function
      fetchOrders(); // refresh order history
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order");
    }
  };

  // 📜 Fetch user's orders
  const fetchOrders = async () => {
    if (!user) return;

    try {
      const q = query(collection(db, "orders"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const fetchedOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  return (
    <div className="container">
      {/* 🛒 Cart Section */}
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="product-list">
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.title} - ${item.price} × {item.quantity}
              </li>
            ))}
          </ul>
          <p><strong>Total:</strong> ${totalAmount.toFixed(2)}</p>
          <button onClick={handlePlaceOrder}>Place Order</button>
        </>
      )}

      <hr />

      {/* 📜 Order History Section */}
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="product-list">
          {orders.map((order) => (
            <li key={order.id} onClick={() => setSelectedOrder(order)} style={{ cursor: "pointer" }}>
              <strong>Order ID:</strong> {order.id}<br />
              <strong>Date:</strong> {order.createdAt?.toDate().toLocaleString() || "N/A"}<br />
              <strong>Total:</strong> ${order.totalAmount?.toFixed(2)}
            </li>
          ))}
        </ul>
      )}

      {selectedOrder && (
        <div className="order-details">
          <h3>Order Details</h3>
          <ul>
            {selectedOrder.products.map((product, index) => (
              <li key={index}>
                {product.title} - ${product.price} × {product.quantity}
              </li>
            ))}
          </ul>
          <p><strong>Total:</strong> ${selectedOrder.totalAmount.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default CartAndOrderHistory;
