// src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import { Card, CardContent } from "../components/ui/card";

const HomePage = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Resistance Bands",
      price: 19.99,
      image: "https://via.placeholder.com/300/2ecc71/FFFFFF?text=Bands",
    },
    {
      id: 2,
      name: "Performance T-Shirt",
      price: 29.99,
      image: "https://via.placeholder.com/300/3498db/FFFFFF?text=T-Shirt",
    },
    {
      id: 3,
      name: "Whey Protein Isolate",
      price: 49.99,
      image: "https://via.placeholder.com/300/e67e22/FFFFFF?text=Protein",
    },
    {
      id: 4,
      name: "Lifting Gloves",
      price: 22.0,
      image: "https://via.placeholder.com/300/9b59b6/FFFFFF?text=Gloves",
    },
  ];

  const categories = [
    {
      id: 1,
      name: "Apparel",
      color: "from-blue-500 to-indigo-500",
    },
    {
      id: 2,
      name: "Accessories",
      color: "from-green-500 to-teal-500",
    },
    {
      id: 3,
      name: "Supplements",
      color: "from-orange-500 to-pink-500",
    },
    {
      id: 4,
      name: "Equipment",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-3xl p-12 md:p-20 text-center shadow-lg overflow-hidden">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Unleash Your <span className="text-blue-400">Potential</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
          Premium Gym Accessories, Apparel & Supplements for Serious Athletes.
        </p>
        <Link to="/products">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-md transition-all duration-300 hover:scale-105">
            Shop Now
          </button>
        </Link>
      </section>

      {/* Featured Products */}
      <section className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="rounded-2xl shadow-sm hover:shadow-lg transition-all cursor-pointer group overflow-hidden"
            >
              <CardContent
                className={`bg-gradient-to-r ${category.color} text-white p-10 flex items-center justify-center h-32 text-lg font-semibold group-hover:scale-105 transition-transform duration-300`}
              >
                {category.name}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
