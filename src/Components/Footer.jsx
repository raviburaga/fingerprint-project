import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Footer Component
export const Footer = () => {
  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Team", path: "/team" },
        { name: "Careers", path: "/careers" },
        { name: "News", path: "/news" }
      ]
    },
    {
      title: "Technology",
      links: [
        { name: "How it Works", path: "/technology" },
        { name: "Research", path: "/research" },
        { name: "Patents", path: "/patents" },
        { name: "Publications", path: "/publications" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", path: "/docs" },
        { name: "FAQ", path: "/faq" },
        { name: "Support", path: "/support" },
        { name: "Contact", path: "/contact" }
      ]
    }
  ];

  // Animation variants (matching HomePage)
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-gradient-to-br from-indigo-950 via-gray-900 to-black overflow-hidden"
    >
      {/* Animated background orbs matching homepage */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-500/20 blur-3xl"
            style={{
              width: `${Math.random() * 300 + 150}px`,
              height: `${Math.random() * 300 + 150}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 15}s infinite linear ${i % 2 === 0 ? '' : 'reverse'}`,
              opacity: 0.4,
            }}
          />
        ))}
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand Column */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Link to="/" className="flex items-center group mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition duration-300">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Touch-to-Type
                </span>
              </Link>
              <p className="text-gray-300 mb-6 max-w-sm">
                Revolutionizing blood group detection with cutting-edge fingerprint analysis technology powered by artificial intelligence.
              </p>
              
              {/* Social Media Icons with improved styling matching homepage */}
              <div className="flex space-x-4">
                {["twitter", "facebook", "instagram", "linkedin"].map((social, index) => (
                  <motion.a 
                    key={social}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    href={`https://${social}.com`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-900/70 to-purple-900/70 backdrop-blur-md border border-white/20 hover:shadow-lg hover:shadow-blue-500/20 transition duration-300"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            {/* Links Columns with animations */}
            {footerLinks.map((column, colIndex) => (
              <motion.div 
                key={column.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (colIndex * 0.1), duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <motion.li 
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (colIndex * 0.1) + (linkIndex * 0.05), duration: 0.5 }}
                    >
                      <Link
                        to={link.path}
                        className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-1 rounded-lg transition duration-300 inline-block"
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Bottom section with styled links */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm backdrop-blur-md bg-white/5 rounded-xl border border-white/10 p-6 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="mb-4 md:mb-0">© 2025 Touch-to-Type. All rights reserved.</p>
          <div className="flex space-x-2">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
              <Link 
                key={item} 
                to={`/${item.toLowerCase().replace(/\s/g, '-')}`}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1 rounded-lg text-sm transition-all duration-300 text-gray-300 hover:text-white hover:bg-gradient-to-r from-blue-900/30 to-purple-900/30"
              >
                {item}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Floating animation styles */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 20px) rotate(10deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
      `}</style>
    </motion.footer>
  );
};