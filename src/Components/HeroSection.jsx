import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative h-screen flex items-center justify-center px-6 md:px-10 lg:px-16 ">
      {/* Blurred Glass Effect */}
      <div className="absolute inset-0  backdrop-blur-xl rounded-xl shadow-xl w-full"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-5xl mx-auto">
        {/* Left Section: Project Title & Description */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
            Touch-to-Type: <br />
            <span className="text-blue-400">Fingerprint-Based Blood Group Detection</span>
          </h1>
          <p className="mt-5 text-lg text-gray-300 leading-relaxed max-w-lg">
            A non-invasive method to determine blood type using fingerprint patterns. Powered by AI and biometric technology, our system enhances accessibility and provides accurate, rapid results.
          </p>
          <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition">
            Learn More
          </button>
        </motion.div>

        {/* Right Section: Large Image */}
        <motion.div
          className="md:w-1/2 flex justify-center mt-8 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://placehold.co/500x400/111/EEE?text=Fingerprint+Scanning"
            alt="Fingerprint Scanning"
            className="rounded-xl shadow-lg w-[80%] md:w-[90%] lg:w-full"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
