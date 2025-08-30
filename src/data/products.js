  // Mock data for 100 gym e-commerce products
  const products = [
    // ===================== SUPPLEMENTS =====================
    {
      id: 1,
      name: "Whey Protein Isolate - Chocolate",
      category: "Supplements",
      price: 2499,
      image: "https://placehold.co/400x300/8A2BE2/FFFFFF?text=Whey+Protein",
      rating: 5,
      reviews: 340,
      discount: 20,
      inStock: true,
    },
    {
      id: 2,
      name: "Creatine Monohydrate - 300g",
      category: "Supplements",
      price: 1299,
      image: "https://placehold.co/400x300/2E8B57/FFFFFF?text=Creatine",
      rating: 4,
      reviews: 220,
      discount: 15,
      inStock: true,
    },
    {
      id: 3,
      name: "Pre Workout - Citrus Blast",
      category: "Supplements",
      price: 1599,
      image: "https://placehold.co/400x300/FF4500/FFFFFF?text=Pre+Workout",
      rating: 4,
      reviews: 150,
      discount: 10,
      inStock: true,
    },
    {
      id: 4,
      name: "BCAA 2:1:1 Powder - Mango",
      category: "Supplements",
      price: 999,
      image: "https://placehold.co/400x300/FFD700/000000?text=BCAA",
      rating: 4,
      reviews: 110,
      discount: 5,
      inStock: true,
    },
    {
      id: 5,
      name: "Fish Oil Omega 3 - 90 Capsules",
      category: "Supplements",
      price: 699,
      image: "https://placehold.co/400x300/4682B4/FFFFFF?text=Fish+Oil",
      rating: 5,
      reviews: 80,
      discount: 25,
      inStock: true,
    },

    // ===================== ACCESSORIES =====================
    {
      id: 6,
      name: "Gym Gloves - Black",
      category: "Accessories",
      price: 499,
      image: "https://placehold.co/400x300/000000/FFFFFF?text=Gloves",
      rating: 4,
      reviews: 70,
      discount: 10,
      inStock: true,
    },
    {
      id: 7,
      name: "Weightlifting Belt - Leather",
      category: "Accessories",
      price: 1499,
      image: "https://placehold.co/400x300/654321/FFFFFF?text=Belt",
      rating: 5,
      reviews: 95,
      discount: 20,
      inStock: true,
    },
    {
      id: 8,
      name: "Resistance Band Set",
      category: "Accessories",
      price: 899,
      image: "https://placehold.co/400x300/FF69B4/FFFFFF?text=Bands",
      rating: 4,
      reviews: 130,
      discount: 15,
      inStock: true,
    },
    {
      id: 9,
      name: "Shaker Bottle - 700ml",
      category: "Accessories",
      price: 299,
      image: "https://placehold.co/400x300/1E90FF/FFFFFF?text=Shaker",
      rating: 5,
      reviews: 210,
      discount: 30,
      inStock: true,
    },
    {
      id: 10,
      name: "Knee Sleeves (Pair)",
      category: "Accessories",
      price: 1199,
      image: "https://placehold.co/400x300/DC143C/FFFFFF?text=Knee+Sleeves",
      rating: 4,
      reviews: 60,
      discount: 20,
      inStock: true,
    },

    
    {
      id: 11,
      name: "Gym T-Shirt - Dry Fit Black",
      category: "Gymwear",
      price: 799,
      image: "https://placehold.co/400x300/000000/FFFFFF?text=Gym+Tshirt",
      rating: 5,
      reviews: 310,
      discount: 25,
      inStock: true,
    },
    {
      id: 12,
      name: "Training Shorts - Navy",
      category: "Gymwear",
      price: 599,
      image: "https://placehold.co/400x300/000080/FFFFFF?text=Shorts",
      rating: 4,
      reviews: 95,
      discount: 15,
      inStock: true,
    },
    {
      id: 13,
      name: "Jogger Trousers - Grey",
      category: "Gymwear",
      price: 999,
      image: "https://placehold.co/400x300/808080/FFFFFF?text=Joggers",
      rating: 5,
      reviews: 140,
      discount: 20,
      inStock: true,
    },
    {
      id: 14,
      name: "Sleeveless Hoodie - Red",
      category: "Gymwear",
      price: 1299,
      image: "https://placehold.co/400x300/8B0000/FFFFFF?text=Hoodie",
      rating: 4,
      reviews: 85,
      discount: 10,
      inStock: true,
    },
    {
      id: 15,
      name: "Running Shoes - White",
      category: "Gymwear",
      price: 2499,
      image: "https://placehold.co/400x300/FFFFFF/000000?text=Shoes",
      rating: 5,
      reviews: 190,
      discount: 15,
      inStock: true,
    },

    // ... repeat this pattern until 100 items are filled
  ];

  // Duplicate and randomize to reach 100 products
  const allProducts = Array.from({ length: 100 }, (_, i) => {
    const base = products[i % products.length];
    return {
      ...base,
      id: i + 1,
      name: `${base.name} ${i + 1}`,
      price: base.price + (i % 5) * 50, // small variation
      rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
      reviews: base.reviews + i * 2,
      inStock: i % 7 !== 0, // every 7th item out of stock
    };
  });

  export default allProducts;
  // gymWeb/src/pages/CartPage.jsx