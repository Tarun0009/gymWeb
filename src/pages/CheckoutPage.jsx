// src/pages/CheckoutPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handlePlaceOrder = () => {
    // validate shipping info
    for (let key in shippingInfo) {
      if (!shippingInfo[key]) {
        alert(`Please fill ${key}`);
        return;
      }
    }

    // build order object
    const order = {
      id: "ORD" + Date.now(),
      date: new Date().toLocaleString(),
      paymentMethod,
      address: {
        name: shippingInfo.fullName,
        email: shippingInfo.email,
        phone: shippingInfo.phone,
        street: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        pincode: shippingInfo.zip,
        country: shippingInfo.country,
      },
      items: cartItems,
      subtotal: totalAmount,
    };

    // save order in localStorage
    localStorage.setItem("latestOrder", JSON.stringify(order));

    // clear cart + redirect
    clearCart();
    navigate("/order-confirmation");
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + (item.finalPrice || item.price) * (item.quantity || 1),
    0
  );

  const placeholderImage =
    "https://via.placeholder.com/100x100.png?text=Product";

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">Your cart is empty!</h2>
        <Link
          to="/products"
          className="text-blue-600 hover:text-blue-800 mt-4 block"
        >
          Start Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping & Payment */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="fullName"
                value={shippingInfo.fullName}
                onChange={handleChange}
                placeholder="Full Name"
              />
              <Input
                name="email"
                type="email"
                value={shippingInfo.email}
                onChange={handleChange}
                placeholder="Email Address"
              />
              <Input
                name="phone"
                type="tel"
                value={shippingInfo.phone}
                onChange={handleChange}
                placeholder="Phone Number"
              />
              <Input
                name="address"
                value={shippingInfo.address}
                onChange={handleChange}
                placeholder="Street Address"
              />
              <Input
                name="city"
                value={shippingInfo.city}
                onChange={handleChange}
                placeholder="City"
              />
              <Input
                name="state"
                value={shippingInfo.state}
                onChange={handleChange}
                placeholder="State"
              />
              <Input
                name="zip"
                value={shippingInfo.zip}
                onChange={handleChange}
                placeholder="PIN Code"
              />
              <Input
                name="country"
                value={shippingInfo.country}
                onChange={handleChange}
                disabled
              />
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="flex flex-col gap-3">
              {["card", "upi", "cod"].map((method) => (
                <label key={method} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                    className="accent-yellow-500"
                  />
                  {method === "card"
                    ? "Credit / Debit Card"
                    : method === "upi"
                    ? "UPI / Wallet"
                    : "Cash on Delivery"}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col sticky top-20">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex-1 overflow-y-auto max-h-96 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-200 pb-2"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.images?.[0] || placeholderImage}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity || 1} × ₹{item.finalPrice || item.price}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">
                  ₹{(item.finalPrice || item.price) * (item.quantity || 1)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between font-medium text-gray-700">
              <span>Subtotal</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="flex justify-between font-medium text-gray-700">
              <span>Shipping</span>
              <span className="text-green-600 font-semibold">Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          <Button
            className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg py-3"
            onClick={handlePlaceOrder}
          >
            Place Your Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
