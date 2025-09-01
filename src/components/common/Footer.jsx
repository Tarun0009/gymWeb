// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Linkedin, Award, Copyright } from "lucide-react";

const Footer = () => {
  const sections = [
    {
      title: "About Us",
      links: [
        { name: "Our Story", path: "/about" },
        { name: "Blog", path: "/blog" },
        { name: "Careers", path: "/careers" },
        { name: "Partners", path: "/partners" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { name: "Home", path: "/" },
        { name: "Shop All", path: "/products" },
        { name: "Top Rated", path: "/top-rated" },
        { name: "New Arrivals", path: "/new-arrivals" },
      ],
    },
    {
      title: "Help & Support",
      links: [
        { name: "Contact Us", path: "/contact" },
        { name: "FAQs", path: "/faqs" },
        { name: "Shipping & Returns", path: "/shipping" },
        { name: "My Account", path: "/profile" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, url: "#" },
    { icon: <Twitter className="w-5 h-5" />, url: "#" },
    { icon: <Facebook className="w-5 h-5" />, url: "#" },
    { icon: <Linkedin className="w-5 h-5" />, url: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 lg:pt-16">
      <div className="container mx-auto px-6">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 pb-8">
          
          {/* Brand + Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-8 h-8 text-yellow-500" />
              <h3 className="text-2xl font-bold text-white">BeFitBeStrong</h3>
            </div>
            <p className="text-sm leading-relaxed">
              Premium destination for gymwear, supplements, and fitness accessories. High-quality products to fuel your workouts.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                  aria-label="social link"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          {sections.map((section, index) => (
            <div key={index} className="mt-6 md:mt-0">
              <h4 className="text-lg font-semibold text-white mb-4 border-b-2 border-yellow-500 inline-block pb-1">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-sm hover:text-yellow-500 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 text-center flex flex-col md:flex-row text-sm text-gray-400">
          <div className="flex text-center gap-1 mb-2 md:mb-0">
            <Copyright className="w-4 h-4s"  /> 2025 BeFitBeStrong. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
