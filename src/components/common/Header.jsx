import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, ChevronDown, Menu, User } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Badge } from "../ui/badge";
import { useCart } from "../../context/CartContext";

const categories = [
  { name: "All Products", path: "/products" },
  { name: "Gymwear", path: "/products/gymwear" },
  { name: "Accessories", path: "/products/accessories" },
  { name: "Supplements", path: "/products/supplements" },
  { name: "Equipment", path: "/products/equipment" },
];

const Header = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const timerRef = useRef(null);


  const { cartItems, cartCount } = useCart();

  const handleMouseEnter = () => {
    clearTimeout(timerRef.current);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 150);
  };

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-md border-b border-gray-800">
      <div className="max-w-8xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        
        {/* Mobile Menu + Logo */}
        <div className="flex items-center">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-gray-800"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-gray-950 text-white w-64">
              <div className="space-y-6 mt-8">
                {/* Mobile Search */}
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="bg-gray-800 text-white border-gray-700 pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>

                {/* Mobile Nav */}
                <div className="flex flex-col space-y-4 text-lg font-medium">
                  <Link to="/" className="hover:text-yellow-500" onClick={() => setIsSheetOpen(false)}>Home</Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.path}
                      to={cat.path}
                      className="hover:text-yellow-500"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                  <Link to="/about" className="hover:text-yellow-500" onClick={() => setIsSheetOpen(false)}>About</Link>
                  <Link to="/contact" className="hover:text-yellow-500" onClick={() => setIsSheetOpen(false)}>Contact</Link>
                  <Link to="/cart" className="flex items-center gap-2 hover:text-yellow-500" onClick={() => setIsSheetOpen(false)}>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Cart</span>
                    {cartCount > 0 && (
                      <Badge className="bg-yellow-500 text-black font-semibold">{cartCount}</Badge>
                    )}
                  </Link>
                  <Link to="/login" onClick={() => setIsSheetOpen(false)}>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 rounded-lg text-black font-semibold">
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 ml-4 md:ml-0 group">
            <img
              src="https://via.placeholder.com/40x40.png?text=💪"
              alt="BeFitBeStrong Logo"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-2xl font-extrabold group-hover:text-yellow-400 hidden sm:block">
              BeFit<span className="text-yellow-400">BeStrong</span>
            </span>
          </Link>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 justify-center px-8">
          <div className="relative w-full max-w-xl">
            <Input
              type="text"
              placeholder="Search products, brands, or supplements..."
              className="w-full bg-gray-800 text-white border-gray-700 focus:ring-2 focus:ring-yellow-500 rounded-full pl-5 pr-12 h-10"
            />
            <Button
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 rounded-full w-8 h-8"
            >
              <Search className="w-4 h-4 text-black" />
            </Button>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 font-medium text-sm">
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/products" className="flex items-center gap-1 hover:text-yellow-500 py-2">
              Products <ChevronDown className="w-4 h-4" />
            </Link>
            {isHovering && (
              <div className="absolute top-full left-0 w-56 bg-gray-800 text-white border border-gray-700 rounded-md shadow-xl py-2 z-50">
                {categories.map((cat) => (
                  <Link
                    key={cat.path}
                    to={cat.path}
                    className="block px-4 py-2 hover:bg-gray-700 hover:text-yellow-500"
                    onClick={() => setIsHovering(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/about" className="hover:text-yellow-500">About Us</Link>
          <Link to="/contact" className="hover:text-yellow-500">Contact</Link>

          {/* Cart */}
          <Link to="/cart" className="relative p-2">
            <ShoppingCart className="w-6 h-6 hover:text-yellow-500" />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-yellow-500 text-black font-semibold rounded-full text-xs px-1">
                {cartCount}
              </Badge>
            )}
          </Link>

          {/* Login */}
          <Link to="/login">
            <Button className="bg-yellow-500 hover:bg-yellow-600 rounded-lg px-4 py-2 text-black font-semibold">
              <User className="w-4 h-4 mr-2" /> Login
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
