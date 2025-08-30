import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Star,
  Heart,
  Share2,
  Truck,
  ShieldCheck,
  RotateCcw,
  Tag,
  Gift,
  ChevronRight,
  ChevronLeft,
  XCircle,
  CheckCircle2,
} from "lucide-react";

// Dummy data for a real-world feel
const pincodeData = {
  "110001": "Delivery in 3-4 days",
  "400001": "Delivery in 5-6 days",
};

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate API call

        const dummyProduct = {
          _id: id,
          name: `Pro-Fit Training T-Shirt`,
          brand: "Gymshark",
          description:
            "A high-performance training T-shirt designed for durability, sweat resistance, and all-day comfort. Its breathable fabric and ergonomic design make it perfect for intense workouts.",
          highlights: [
            "Premium Dry-Fit fabric",
            "Anti-Sweat Technology",
            "4-Way Stretch Material",
            "Lightweight & Breathable",
          ],
          price: 999,
          originalPrice: 1499,
          discount: 33, // 100 * (1499-999) / 1499
          stock: 20,
          category: "Gym Apparel",
          rating: 4.5,
          reviews: 120,
          images: [
            "https://via.placeholder.com/600/3498db/FFFFFF?text=Product+Front",
            "https://via.placeholder.com/600/8e44ad/FFFFFF?text=Product+Side",
            "https://via.placeholder.com/600/e74c3c/FFFFFF?text=Product+Back",
            "https://via.placeholder.com/600/27ae60/FFFFFF?text=Details",
          ],
        };

        setProduct(dummyProduct);
        setSelectedImage(dummyProduct.images[0]);
      } catch (err) {
        setError("Product not found or an error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handlePincodeCheck = () => {
    const status = pincodeData[pincode] || "Unavailable";
    setPincodeStatus(status);
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl text-gray-700">
        Loading product details...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-20 text-xl text-red-500">
        Product not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* === COLUMN 1: IMAGE GALLERY === */}
        <div className="flex flex-col items-center">
          <Card className="overflow-hidden border shadow-lg w-full max-w-lg">
            <CardContent className="p-0">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-[500px] object-cover bg-gray-50 transition-transform duration-300 hover:scale-105"
              />
            </CardContent>
          </Card>
          
          {/* Thumbnails */}
          <div className="flex gap-3 mt-4 overflow-x-auto w-full max-w-lg">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`View ${index + 1}`}
                className={`w-24 h-24 object-cover rounded-md cursor-pointer border-2 transition ${
                  selectedImage === image ? "border-blue-600" : "border-gray-200 hover:border-blue-400"
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        {/* === COLUMN 2: PRODUCT DETAILS === */}
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase font-semibold tracking-wider">{product.brand}</p>
              <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
                {product.name}
              </h1>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="rounded-full">
                <Heart className="w-5 h-5 text-red-500" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Ratings */}
          <div className="flex items-center gap-2">
            {Array(5).fill(0).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 font-medium">
              {product.rating} ({product.reviews} Reviews)
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed max-w-prose">
            {product.description}
          </p>

          {/* Highlights */}
          <div>
            <h3 className="text-lg font-bold mb-2">Highlights</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {product.highlights.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* === COLUMN 3: THE BUY BOX === */}
        <aside className="space-y-6">
          <Card className="p-6 shadow-xl border rounded-lg">
            <div className="flex items-baseline gap-2 mb-2">
              <p className="text-4xl font-extrabold text-blue-600">
                ₹{product.price}
              </p>
              {product.discount > 0 && (
                <>
                  <p className="text-lg text-gray-500 line-through">
                    ₹{product.originalPrice}
                  </p>
                  <span className="text-green-600 font-semibold text-sm">
                    ({product.discount}% OFF)
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-gray-500 mb-6">Inclusive of all taxes</p>

            {/* Delivery Availability */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2 text-gray-700 font-medium">
                <Truck className="w-5 h-5 text-gray-500" />
                Check Delivery:
              </div>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter Pincode"
                  className="flex-1"
                />
                <Button onClick={handlePincodeCheck}>Check</Button>
              </div>
              {pincodeStatus && (
                <div className="mt-2 text-sm flex items-center gap-2">
                  {pincodeStatus === "Unavailable" ? (
                    <>
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="text-red-500">Delivery Unavailable</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-green-600">{pincodeStatus}</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Quantity */}
            {product.stock > 0 ? (
              <div className="mb-6">
                <p className="text-green-600 font-semibold mb-3">
                  In Stock ({product.stock} items)
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                      className="px-3 py-1 border-r hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-1">{quantity}</span>
                    <button
                      onClick={() =>
                        setQuantity((q) => (q < product.stock ? q + 1 : product.stock))
                      }
                      className="px-3 py-1 border-l hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-red-600 font-semibold mb-6">Out of Stock</p>
            )}

            {/* Action Buttons */}
            <Button
              className="w-full mb-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
              disabled={product.stock === 0}
            >
              Add to Cart
            </Button>
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
              disabled={product.stock === 0}
            >
              Buy Now
            </Button>
          </Card>
          
          {/* Services & Offers */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Truck className="w-5 h-5 text-gray-500" />
              <div className="flex flex-col text-sm">
                <span className="font-medium text-gray-800">Fast Delivery</span>
                <span className="text-gray-600">Get it by Tuesday, 5 Sep</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <RotateCcw className="w-5 h-5 text-gray-500" />
              <div className="flex flex-col text-sm">
                <span className="font-medium text-gray-800">10-Day Returns</span>
                <span className="text-gray-600">Easy returns and exchanges</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ShieldCheck className="w-5 h-5 text-gray-500" />
              <div className="flex flex-col text-sm">
                <span className="font-medium text-gray-800">1-Year Warranty</span>
                <span className="text-gray-600">Against manufacturing defects</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

     
    </div>
  );
};

export default ProductDetailsPage;