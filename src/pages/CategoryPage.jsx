import React from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import products from "../data/products";

const CategoryPage = () => {
  const { category } = useParams();

  // Convert URL param -> readable category
  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  // Filter products by category (All Products shows everything)
  const filteredProducts =
    category === "all"
      ? products
      : products.filter(
          (product) => product.category.toLowerCase() === category.toLowerCase()
        );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {formattedCategory === "All"
          ? "All Products"
          : `${formattedCategory} Products`}
      </h1>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No products found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
