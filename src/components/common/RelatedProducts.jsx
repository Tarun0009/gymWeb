// src/components/common/RelatedProducts.jsx
import React, { useMemo } from "react";
import ProductCard from "./ProductCard";
import productsData from "../../data/products"; // Adjust the path as needed

const RelatedProducts = ({ currentProduct }) => {
  // Use useMemo to efficiently filter and get related products
  const relatedItems = useMemo(() => {
    if (!currentProduct) return [];

    // Filter products by category, excluding the current one, and take the first 4
    return productsData
      .filter(
        (product) =>
          product.category === currentProduct.category &&
          product.id !== currentProduct.id // Assuming 'id' is a unique identifier
      )
      .slice(0, 4);
  }, [currentProduct]);

  if (relatedItems.length === 0) {
    return null; // Don't render the section if no related products are found
  }

  return (
    <div className="mt-20">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center lg:text-left">
        You Might Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;