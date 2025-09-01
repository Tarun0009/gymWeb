// src/pages/ProductsPage.jsx
import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AlertCircle } from "lucide-react";
import productsData from "../data/products"; // your allProducts generator

// ---------------- Sidebar Filters ----------------
const FiltersSidebar = ({
  search,
  setSearch,
  categories,
  setCategories,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sort,
  setSort,
  uniqueCategories,
  disableFilters,
}) => {
  return (
    <aside className="w-64 bg-white rounded-xl shadow-md p-4 border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {disableFilters ? (
        <p className="text-sm text-gray-500">
          Filters are disabled for this category (Featured / Latest / Top Rated).
        </p>
      ) : (
        <>
          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <h4 className="font-medium mb-2">Categories</h4>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={categories.length === 0}
                  onChange={() => setCategories([])}
                />
                All Products
              </label>

              {uniqueCategories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={categories.includes(cat)}
                    onChange={() =>
                      setCategories((prev) =>
                        prev.includes(cat)
                          ? prev.filter((c) => c !== cat)
                          : [...prev, cat]
                      )
                    }
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="mt-4">
            <h4 className="font-medium mb-2">Price Range</h4>
            <div className="flex items-center gap-2 text-sm">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-20 px-2 py-1 border rounded-md"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-20 px-2 py-1 border rounded-md"
              />
            </div>
          </div>

          {/* Sort */}
          <div className="mt-4">
            <h4 className="font-medium mb-2">Sort By</h4>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full px-2 py-1 border rounded-md text-sm"
            >
              <option value="default">Default</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </>
      )}
    </aside>
  );
};

// ---------------- Main Page ----------------
const ProductsPage = () => {
  const { category } = useParams();
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("default");
  const [visibleCount, setVisibleCount] = useState(12);

  // Normalize products
  const products = useMemo(
    () =>
      productsData.map((p) => ({
        ...p,
        category: p.category.trim(),
        finalPrice: p.finalPrice,
        rating: p.rating || 0,
        isFeatured: !!p.isFeatured,
        isLatest: !!p.isLatest,
        isTopRated: !!p.isTopRated,
      })),
    []
  );

  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  const isSpecialCategory = ["featured", "latest", "top-rated"].includes(
    category?.toLowerCase()
  );

  // Reset filters on category change
  useEffect(() => {
    if (isSpecialCategory) {
      setCategories([]);
      setSearch("");
      setMinPrice("");
      setMaxPrice("");
      setSort("default");
    } else if (category && category.toLowerCase() !== "all") {
      setCategories([category.charAt(0).toUpperCase() + category.slice(1)]);
    } else {
      setCategories([]);
    }
    setVisibleCount(12);
  }, [category]);

  // Filter & sort
  const filteredProducts = useMemo(() => {
    let result = [...products];
    const catLower = category?.toLowerCase();

    if (catLower === "featured") result = result.filter((p) => p.isFeatured);
    else if (catLower === "latest") result = result.filter((p) => p.isLatest);
    else if (catLower === "top-rated")
      result = result.filter((p) => p.isTopRated);
    else {
      if (search)
        result = result.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        );
      if (categories.length > 0)
        result = result.filter((p) => categories.includes(p.category));
      if (minPrice) result = result.filter((p) => p.finalPrice >= parseFloat(minPrice));
      if (maxPrice) result = result.filter((p) => p.finalPrice <= parseFloat(maxPrice));
    }

    // Sorting
    if (sort === "priceLowHigh") result.sort((a, b) => a.finalPrice - b.finalPrice);
    if (sort === "priceHighLow") result.sort((a, b) => b.finalPrice - a.finalPrice);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [products, search, categories, minPrice, maxPrice, sort, category]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const getTitle = () => {
    if (!category) return "All Products";
    const lower = category.toLowerCase();
    if (lower === "featured") return "Featured Products";
    if (lower === "latest") return "Latest Collection";
    if (lower === "top-rated") return "Top Rated Products";
    if (lower === "all") return "All Products";
    return category.charAt(0).toUpperCase() + category.slice(1) + " Products";
  };

  return (
    <div className="container mx-auto px-4 py-8 flex gap-8">
      <FiltersSidebar
        search={search}
        setSearch={setSearch}
        categories={categories}
        setCategories={setCategories}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        sort={sort}
        setSort={setSort}
        uniqueCategories={uniqueCategories}
        disableFilters={isSpecialCategory}
      />

      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">{getTitle()}</h1>

        {displayedProducts.length === 0 ? (
          <div className="flex justify-center py-20">
            <Alert variant="destructive" className="max-w-md">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle>No Products Found</AlertTitle>
              <AlertDescription>
                No products match your search or filters. Try adjusting them.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {visibleCount < filteredProducts.length && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
