// src/data/products.js

const categories = ["Supplements", "Accessories", "Gymwear", "Equipment"];
const brands = {
  Supplements: ["Optimum Nutrition", "Myprotein", "MuscleBlaze", "Dymatize"],
  Accessories: ["Nike", "Adidas", "Reebok", "Under Armour"],
  Gymwear: ["Nike", "Adidas", "Under Armour", "Puma"],
  Equipment: ["Bowflex", "ProForm", "Domyos", "NordicTrack"]
};
const types = {
  Supplements: ["Whey Protein", "Creatine", "BCAA", "Pre-Workout"],
  Accessories: ["Gym Gloves", "Resistance Bands", "Weight Belt", "Water Bottle"],
  Gymwear: ["T-Shirt", "Hoodie", "Joggers", "Socks"],
  Equipment: ["Dumbbell Set", "Kettlebell", "Treadmill", "Elliptical"]
};
const colors = ["Black", "White", "Blue", "Red", "Gray", "Green", "Pink", "Yellow", "Orange"];

let idCounter = 1;

const generateProduct = (category) => {
  const brandList = brands[category];
  const typeList = types[category];

  const brand = brandList[Math.floor(Math.random() * brandList.length)];
  const type = typeList[Math.floor(Math.random() * typeList.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];

  const name = `${brand} ${color} ${type}`;

  const originalPrice = Math.floor(Math.random() * (3000 - 500 + 1) + 500);
  const discount = Math.floor(Math.random() * 50);
  const finalPrice = Math.floor(originalPrice * (1 - discount / 100));

  const stock = Math.floor(Math.random() * 200);
  const inStock = stock > 0;

  const rating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
  const reviews = Math.floor(Math.random() * 500);

  const isFeatured = Math.random() > 0.85;
  const isTopRated = parseFloat(rating) > 4.5 && reviews > 50;
  const isLatest = Math.random() > 0.7;

  const images = [
    `https://placehold.co/400x300/F0F9FF/0B69FF?text=${type}+${idCounter}`,
    `https://placehold.co/400x300/E0F2FE/0B69FF?text=${type}+${idCounter}`
  ];

  return {
    id: idCounter++,
    name,
    category,
    brand,
    images,
    description: `High-quality ${type.toLowerCase()} from ${brand} designed for optimal performance.`,
    specs: ["Premium material", "Ergonomic design", "Multi-purpose"],
    originalPrice,
    discount,
    finalPrice,
    stock,
    inStock,
    rating: parseFloat(rating),
    reviews,
    isFeatured,
    isTopRated,
    isLatest
  };
};

// Generate 200 products (50 per category)
const allProducts = [];

categories.forEach((cat) => {
  for (let i = 0; i < 50; i++) {
    allProducts.push(generateProduct(cat));
  }
});

export default allProducts;
  