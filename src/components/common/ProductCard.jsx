import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";

function ProductCard({ product }) {
  // Destructure product props for cleaner code
  const { id, name, price, image, rating, reviews, discount = 15, inStock = true } = product;

  // State for wishlist
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Original price calculation
  const originalPrice = (price / (1 - discount / 100)).toFixed(2);

  // Currency formatter
  const formatPrice = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  // Add to cart handler (replace with global state later)
  const handleAddToCart = () => {
    console.log(`Product "${name}" added to cart.`);
  };

  // Generate SEO-friendly URL slug
  const slug = name ? name.replace(/\s+/g, "-").toLowerCase() : "product";

  return (
    <Card className="group rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white relative overflow-hidden">
      {/* Discount Badge */}
      {discount > 0 && (
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md z-10">
          {discount}% OFF
        </span>
      )}

      {/* Wishlist Button with tooltip */}
      <div className="absolute top-2 right-2 z-10 group/wishlist">
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="bg-white p-2 rounded-full shadow-md transition"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlisted}
        >
          <Heart
            className={`w-4 h-4 transition ${
              isWishlisted ? "text-red-500 fill-red-500" : "text-gray-500"
            }`}
          />
        </button>
        <span className="absolute right-0 top-10 opacity-0 group-hover/wishlist:opacity-100 transition text-xs bg-black text-white px-2 py-1 rounded">
          {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        </span>
      </div>

      {/* Product clickable area */}
      <Link to={`/product/${id}-${slug}`} className="block">
        {/* Product Image */}
        <div className="relative h-60 bg-gray-50 flex items-center justify-center overflow-hidden rounded-t-xl">
          <img
            loading="lazy"
            src={image}
            alt={`${name} product image`}
            className="h-full max-h-56 object-contain p-4 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/400x300/CCCCCC/666666?text=No+Image";
            }}
          />
        </div>

        {/* Info Section */}
        <CardHeader className="px-4 pt-3 pb-1">
          <CardTitle className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition">
            {name}
          </CardTitle>
        </CardHeader>

        <CardContent className="px-4 py-2">
          {/* Ratings */}
          <div className="flex items-center mb-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(rating || 4)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            <span className="ml-2 text-xs text-gray-500">
              ({reviews || 120})
            </span>
          </div>

          {/* Price Section */}
          <div className="flex items-baseline gap-2">
            <p className="text-lg font-bold text-gray-900">
              {formatPrice(price)}
            </p>
            {discount > 0 && (
              <>
                <p className="text-sm text-gray-500 line-through">
                  {formatPrice(originalPrice)}
                </p>
                <p className="text-sm text-green-600 font-semibold">
                  {discount}% off
                </p>
              </>
            )}
          </div>

          {/* Stock Info */}
          <p
            className={`text-xs font-medium mt-1 ${
              inStock ? "text-green-600" : "text-red-600"
            }`}
          >
            {inStock ? "In Stock" : "Out of Stock"}
          </p>
        </CardContent>
      </Link>

      {/* CTA Button */}
      <CardFooter className="px-4 pb-4 pt-2">
        <Button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`w-full text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 ${
            inStock
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          aria-label={`Add ${name} to cart`}
        >
          <ShoppingCart className="w-4 h-4" />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
