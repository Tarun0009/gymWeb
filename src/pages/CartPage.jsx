// src/pages/CartPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();

  return (
    <div className="w-full min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <p className="text-lg text-gray-500 mb-4">Your cart is empty.</p>
            <Link
              to="/products"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Start shopping →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Cart Items */}
            <div className="lg:w-2/3 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center p-5 bg-white rounded-xl shadow hover:shadow-lg transition-shadow"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-md object-cover mr-5"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-3">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                        className="px-3 py-1 border rounded-md hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="mx-4 font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                        className="px-3 py-1 border rounded-md hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-lg font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="ml-6 text-red-500 hover:text-red-700 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="p-8 bg-white rounded-xl shadow-lg sticky top-20">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                <div className="flex justify-between text-lg mb-3">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg mb-4 border-b pb-4">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between text-2xl font-bold text-gray-900 mb-8">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                  Proceed to Checkout →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
