import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ username: "", email: "", password: "" });
    setMessage("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const endpoint = isLogin ? "/api/login" : "/api/register";
      const { data } = await axios.post(endpoint, formData);

      setMessage(data.message);
      // Simulate success message for demonstration
      setMessage(isLogin ? "Login successful!" : "Registration successful!");
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-950 via-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-500/20 blur-3xl"
            style={{
              width: `${Math.random() * 400 + 200}px`,
              height: `${Math.random() * 400 + 200}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 20}s infinite linear`,
              opacity: 0.4,
            }}
          />
        ))}
      </div>

      {/* Accent Circles */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-purple-600/30 blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-40 h-40 rounded-full bg-blue-600/30 blur-3xl"></div>

      {/* Auth Card with Advanced Glassmorphism */}
      <motion.div 
        className="relative z-10 max-w-md w-full mx-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-8 overflow-hidden">
          {/* Card Inner Glow */}
          <div className="absolute inset-0 z-0 opacity-50">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-500/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-500/20 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <motion.h2 
              className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
              variants={itemVariants}
            >
              {isLogin ? "Welcome Back" : "Create Account"}
            </motion.h2>

            {message && (
              <motion.div 
                className={`mb-6 p-3 rounded-lg text-center ${message.includes("successful") ? "bg-green-500/20 text-green-200" : "bg-red-500/20 text-red-200"}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {message}
              </motion.div>
            )}

            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-5"
              variants={containerVariants}
            >
              {!isLogin && (
                <motion.div variants={itemVariants}>
                  <label className="text-sm text-gray-300 mb-1 block">Username</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full p-4 pl-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 shadow-inner"
                      required
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 pointer-events-none transition-opacity duration-300"></div>
                  </div>
                </motion.div>
              )}

              <motion.div variants={itemVariants}>
                <label className="text-sm text-gray-300 mb-1 block">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-4 pl-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 shadow-inner"
                    required
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 pointer-events-none transition-opacity duration-300"></div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="text-sm text-gray-300 mb-1 block">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-4 pl-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 shadow-inner"
                    required
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 pointer-events-none transition-opacity duration-300"></div>
                </div>
              </motion.div>

              <motion.button
                type="submit"
                className="w-full relative mt-6 overflow-hidden group"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative px-6 py-4 text-white font-medium text-center">
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    isLogin ? "Sign In" : "Create Account"
                  )}
                </div>
              </motion.button>
            </motion.form>

            <motion.div 
              className="mt-6 text-center"
              variants={itemVariants}
            >
              <p className="text-gray-300">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button 
                  onClick={toggleForm} 
                  className="text-blue-400 font-medium hover:text-purple-400 transition-colors duration-300 focus:outline-none"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </motion.div>

            {/* Optional: Social Login Buttons */}
            {isLogin && (
              <motion.div 
                className="mt-8 pt-6 border-t border-white/10"
                variants={itemVariants}
              >
                <p className="text-sm text-center text-gray-400 mb-4">Or continue with</p>
                <div className="flex justify-center space-x-4">
                  {["Google", "Apple", "Facebook"].map((provider) => (
                    <motion.button
                      key={provider}
                      className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors duration-300"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span className="text-sm">{provider.charAt(0)}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute -z-10 w-32 h-32 -top-16 -right-16 bg-blue-500/30 rounded-full blur-3xl"></div>
        <div className="absolute -z-10 w-32 h-32 -bottom-16 -left-16 bg-purple-500/30 rounded-full blur-3xl"></div>
      </motion.div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(15px, 15px) rotate(5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default AuthPage;