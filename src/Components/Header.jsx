import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

// Header Component
export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Animation variants
  const fadeInDown = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Mobile menu animation variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto", 
      transition: { duration: 0.3 } 
    }
  };

  // Navigation links
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Technology", path: "/technology" },
    { title: "Research", path: "/research" },
    // { title: "Contact", path: "/contact" }
  ];

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={fadeInDown}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "py-5 backdrop-blur-xl bg-black/60 border-b border-white/10 shadow-lg" 
          : "py-3 backdrop-blur-md bg-black/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header background orbs for glassmorphism effect */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div 
            className="absolute -top-12 left-1/4 w-40 h-40 rounded-full bg-blue-600/20 blur-3xl"
            style={{
              animation: "float 15s infinite linear",
            }}
          />
          <div 
            className="absolute -bottom-10 right-1/3 w-48 h-48 rounded-full bg-purple-600/20 blur-3xl"
            style={{
              animation: "float 18s infinite linear reverse",
            }}
          />
        </div>

        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition duration-300">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Touch-to-Type
              </span>
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link 
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    location.pathname === link.path 
                      ? "text-white bg-gradient-to-br from-blue-900/70 to-purple-900/70 backdrop-blur-md border border-white/20 shadow-lg shadow-blue-500/10" 
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.title}
                </Link>
              </motion.div>
            ))}
          </nav>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="hidden md:block"
          >
            <Link to="/finger">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-blue-500/30 transition duration-300"
              >
                Try Now
              </motion.button>
            </Link>
          </motion.div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 rounded-lg bg-gradient-to-br from-blue-900/70 to-purple-900/70 backdrop-blur-md border border-white/20 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={mobileMenuVariants}
          className="md:hidden mt-2 px-4 pb-4 overflow-hidden"
        >
          <div className="bg-gradient-to-br from-black/80 to-purple-900/40 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg p-4 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link 
                key={link.title}
                to={link.path}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path 
                    ? "text-white bg-gradient-to-br from-blue-900/70 to-purple-900/70 backdrop-blur-md border border-white/20 shadow-lg shadow-blue-500/10" 
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            <Link 
              to="/finger"
              className="mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-full text-sm font-medium shadow-lg hover:shadow-blue-500/30 transition duration-300 flex justify-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Try Now
            </Link>
          </div>
        </motion.div>
      )}
      
      {/* Floating animation styles */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 20px) rotate(10deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
      `}</style>
    </motion.header>
  );
};