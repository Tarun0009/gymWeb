// src/components/common/ProductCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useCart } from "../../context/CartContext";

function ProductCard({ product }) {
  const {
    id,
    name,
    brand,
    images = [],
    rating = 0,
    reviews = 0,
    finalPrice,
    originalPrice,
    discount = 0,
    inStock = false,
    isFeatured,
    isLatest,
    isTopRated,
  } = product;

  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  const formatPrice = (value) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value || 0);

  const handleAddToCart = () => {
    if (!id) return console.error("Product id is missing!");
    addToCart({
      id,
      name,
      price: finalPrice,
      image: images[0] || "https://placehold.co/400x300?text=No+Image",
      quantity: 1,
    });
  };

  return (
    <Card className="group rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white relative overflow-hidden">
      {/* Badges */}
      {discount > 0 && (
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md z-10">
          {discount}% OFF
        </span>
      )}
      {isTopRated && (
        <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md z-10">
          Top Rated
        </span>
      )}
      {isFeatured && (
        <span className="absolute top-10 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md z-10">
          Featured
        </span>
      )}
      {isLatest && (
        <span className="absolute top-18 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md z-10">
          New Arrival
        </span>
      )}

      {/* Wishlist */}
      <div className="absolute top-2 right-12 z-10 group/wishlist">
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="bg-white p-2 rounded-full shadow-md transition"
        >
          <Heart className={`w-4 h-4 transition ${isWishlisted ? "text-red-500 fill-red-500" : "text-gray-500"}`} />
        </button>
      </div>

      <Link to={`/product/${id}`} className="block">
        <div className="relative h-60 bg-gray-50 flex items-center justify-center overflow-hidden rounded-t-xl">
          <img
            loading="lazy"
            src={images[0] || "https://placehold.co/400x300?text=No+Image"}
            alt={`${name} image`}
            className="h-full max-h-56 object-contain p-4 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/400x300/CCCCCC/666666?text=No+Image";
            }}
          />
        </div>

        <CardHeader className="px-4 pt-3 pb-1">
          <CardTitle className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition">
            {brand ? `${brand} – ` : ""}{name}
          </CardTitle>
        </CardHeader>

        <CardContent className="px-4 py-2">
          <div className="flex items-center mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className="ml-2 text-xs text-gray-500">({reviews})</span>
          </div>

          <div className="flex items-baseline gap-2">
            <p className="text-lg font-bold text-gray-900">{formatPrice(finalPrice)}</p>
            {discount > 0 && (
              <>
                <p className="text-sm text-gray-500 line-through">{formatPrice(originalPrice)}</p>
                <p className="text-sm text-green-600 font-semibold">{discount}% off</p>
              </>
            )}
          </div>

          <p className={`text-xs font-medium mt-1 ${inStock ? "text-green-600" : "text-red-600"}`}>
            {inStock ? "In Stock" : "Out of Stock"}
          </p>
        </CardContent>
      </Link>

      <CardFooter className="px-4 pb-4 pt-2">
        <Button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`w-full text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 ${inStock ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
        >
          <ShoppingCart className="w-4 h-4" />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
