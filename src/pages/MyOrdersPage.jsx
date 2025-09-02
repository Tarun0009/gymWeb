import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const MyOrdersPage = () => {
  const { user } = useAuth();

  if (!user) return <p className="text-center mt-6">Please login to view orders.</p>;

  if (!user.orders || user.orders.length === 0) {
    return <p className="text-center mt-6">You have no orders yet.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      <div className="space-y-4">
        {user.orders.map((order) => (
          <div key={order.id} className="border p-4 rounded shadow">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Total:</strong> ₹{order.subtotal}</p>
            <Link
              to={`/order/${order.id}`}
              className="text-blue-600 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;
