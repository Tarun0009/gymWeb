// src/pages/OrderConfirmationPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OrderConfirmationPage = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("latestOrder");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">No recent order found.</h2>
        <Link
          to="/products"
          className="mt-4 inline-block px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-8">
      {/* Success Banner */}
      <div className="text-center border-b pb-6">
        <h1 className="text-3xl font-bold text-green-600">
          🎉 Order Placed Successfully!
        </h1>
        <p className="mt-2 text-gray-600">
          Thank you for shopping with us. A confirmation email will be sent shortly.
        </p>
      </div>

      {/* Order Info */}
      <div className="mt-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
        <p>
          <strong>Order ID:</strong> {order.id || "ORD" + Date.now()}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {order.date
            ? new Date(order.date).toLocaleString()
            : new Date().toLocaleString()}
        </p>
        <p>
          <strong>Payment:</strong>{" "}
          {order.paymentMethod
            ? order.paymentMethod.toUpperCase()
            : "Not Provided"}
        </p>
      </div>

      {/* Shipping Info */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg text-gray-800">Shipping Address</h3>
        <div className="mt-2 text-gray-700">
          <p>{order.address?.name}</p>
          <p>{order.address?.phone}</p>
          <p>
            {order.address?.street}, {order.address?.city},{" "}
            {order.address?.state} - {order.address?.pincode}
          </p>
          <p>{order.address?.country}</p>
        </div>
      </div>

      {/* Items */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg text-gray-800">Items Ordered</h3>
        <div className="mt-2 border rounded-lg divide-y">
          {order.items?.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-3"
            >
              <div>
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Qty: {item.quantity} × ₹{item.price}
                </p>
              </div>
              <p className="font-semibold text-gray-900">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-6 border-t pt-4 flex justify-between text-lg font-bold">
        <span>Total:</span>
        <span>₹{order.subtotal}</span>
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-center gap-4">
        <Link
          to="/products"
          className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg"
        >
          Continue Shopping
        </Link>
        <Link
          to="/orders"
          className="px-6 py-2 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg"
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
