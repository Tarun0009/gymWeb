// src/data/products.js
import slugify from "slugify";

const baseProducts = [
  {
    name: "Whey Protein Isolate - Chocolate",
    category: "Supplements",
    brand: "Optimum Nutrition",
    price: 2499,
    images: [
      "https://placehold.co/400x300/8A2BE2/FFFFFF?text=Whey+Protein+1",
      "https://placehold.co/400x300/4B0082/FFFFFF?text=Whey+Protein+2"
    ],
    description: "High quality whey protein isolate for muscle recovery and growth.",
    specs: [
      "25g protein per serving",
      "Low carbs, low fat",
      "Supports lean muscle growth"
    ],
    discount: 20,
    stock: 30,
  },
  {
    name: "Gym Gloves - Black",
    category: "Accessories",
    brand: "Nike",
    price: 499,
    images: [
      "https://placehold.co/400x300/000000/FFFFFF?text=Gloves+1",
      "https://placehold.co/400x300/111111/FFFFFF?text=Gloves+2"
    ],
    description: "Durable gym gloves for better grip and hand protection.",
    specs: ["Breathable fabric", "Adjustable wrist strap", "Anti-slip palm"],
    discount: 10,
    stock: 50,
  },
  {
    name: "Gym T-Shirt - Dry Fit Black",
    category: "Gymwear",
    brand: "Adidas",
    price: 799,
    images: [
      "https://placehold.co/400x300/000000/FFFFFF?text=Gym+Tshirt+1",
      "https://placehold.co/400x300/222222/FFFFFF?text=Gym+Tshirt+2"
    ],
    description: "Moisture-wicking gym t-shirt with a slim fit.",
    specs: ["100% polyester", "Machine washable", "Quick dry fabric"],
    discount: 25,
    stock: 100,
  },
];

// Generate 100 products
const allProducts = Array.from({ length: 100 }, (_, i) => {
  const base = baseProducts[i % baseProducts.length];
  const id = i + 1;
  const slug = slugify(base.name + " " + id, { lower: true });

  return {
    id,
    slug,
    name: `${base.name} ${id}`,
    category: base.category,
    brand: base.brand,
    images: base.images,
    description: base.description,
    specs: base.specs,
    originalPrice: base.price,
    discount: base.discount,
    finalPrice: Math.round(base.price - (base.price * base.discount) / 100),
    stock: base.stock - (i % 3), // simulate variations
    inStock: (base.stock - (i % 3)) > 0,
    rating: +(Math.random() * (5 - 3.5) + 3.5).toFixed(1), // number 3.5 - 5.0
    reviews: Math.floor(Math.random() * 500) + 50,
    isFeatured: Math.random() < 0.2, // 20% chance to be featured
    isTopRated: Math.random() < 0.15, // 15% chance to be top rated
    isLatest: id > 80, // last 20 products are latest
  };
});

export default allProducts;
