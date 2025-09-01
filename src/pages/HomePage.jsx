// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import slugify from "slugify";
import products from "../data/products";
import { Card, CardContent } from "../components/ui/card";
import ProductCard from "../components/common/ProductCard";

const HomePage = () => {
  const navigate = useNavigate();
  const INITIAL_COUNT = 6;

  // Product sections
  const featuredAll = products.filter((p) => p.isFeatured);
  const latestAll = products.filter((p) => p.isLatest);
  const topRatedAll = products.filter((p) => p.isTopRated);

  const [featuredCount, setFeaturedCount] = useState(INITIAL_COUNT);
  const [latestCount, setLatestCount] = useState(INITIAL_COUNT);
  const [topRatedCount, setTopRatedCount] = useState(INITIAL_COUNT);

  // Banner carousel
  const banners = [
    "https://placehold.co/1600x400/FF6B6B/FFFFFF?text=Summer+Sale",
    "https://placehold.co/1600x400/4ECDC4/FFFFFF?text=Up+to+50%25+Off",
    "https://placehold.co/1600x400/556270/FFFFFF?text=New+Arrivals",
  ];
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const categories = [
    { id: 1, name: "Gymwear", color: "from-blue-500 to-indigo-600" },
    { id: 2, name: "Accessories", color: "from-green-400 to-teal-500" },
    { id: 3, name: "Supplements", color: "from-orange-400 to-pink-500" },
    { id: 4, name: "Equipment", color: "from-purple-500 to-pink-500" },
  ];

  const SectionHeader = ({ title, link }) => (
    <div className="flex justify-between items-center mb-6 md:mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
      {link && (
        <Link
          to={link}
          className="text-blue-600 font-semibold hover:underline text-sm md:text-base"
        >
          View All
        </Link>
      )}
    </div>
  );

  const handleLoadMore = (section) => {
    if (section === "featured") setFeaturedCount((prev) => prev + INITIAL_COUNT);
    if (section === "latest") setLatestCount((prev) => prev + INITIAL_COUNT);
    if (section === "topRated") setTopRatedCount((prev) => prev + INITIAL_COUNT);
  };

  const ProductCarousel = ({ products, count, section }) => {
    const visibleProducts = products.slice(0, count);
    return (
      <div className="relative">
        <div className="flex space-x-6 overflow-x-auto scrollbar-hide pb-2">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[220px] md:w-[240px] lg:w-[260px] h-[430px] transition-transform hover:scale-105"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        {count < products.length && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handleLoadMore(section)}
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-shadow shadow-md"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-24">
      
      {/* Hero / Banner Carousel */}
      <section className="relative rounded-3xl overflow-hidden shadow-xl">
        <img
          src={banners[currentBanner]}
          alt="Hero Banner"
          className="w-full h-80 md:h-[500px] object-cover transition-all duration-700"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 animate-fadeIn">
            Unleash Your <span className="text-yellow-400">Potential</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-6 max-w-2xl">
            Premium Gym Accessories, Apparel & Supplements for Serious Athletes
          </p>
          <Link to="/products">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-full text-lg shadow-lg transition-all duration-300 hover:scale-105">
              Shop Now
            </button>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section>
        <SectionHeader title="Shop by Category" link="/products" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              onClick={() =>
                navigate(`/products/${slugify(category.name, { lower: true })}`)
              }
              className="cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-transform hover:scale-105 group"
            >
              <CardContent
                className={`bg-gradient-to-r ${category.color} text-white p-8 flex items-center justify-center h-32 font-semibold text-lg`}
              >
                {category.name}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <SectionHeader title="Featured Products" link="/products?filter=featured" />
        <ProductCarousel products={featuredAll} count={featuredCount} section="featured" />
      </section>

      {/* Latest Collection */}
      <section>
        <SectionHeader title="Latest Collection" link="/products?filter=latest" />
        <ProductCarousel products={latestAll} count={latestCount} section="latest" />
      </section>

      {/* Top Rated Products */}
      <section className="bg-gray-50 rounded-2xl p-6 shadow-inner">
        <SectionHeader title="Top Rated Products" link="/products?filter=top-rated" />
        <ProductCarousel products={topRatedAll} count={topRatedCount} section="topRated" />
      </section>
    </div>
  );
};

export default HomePage;
