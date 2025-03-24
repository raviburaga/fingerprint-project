import React from "react";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  const navigate = useNavigate();

  // Team Members Data
  const teamMembers = [
    {
      name: "John Doe",
      role: "AI Engineer",
      description: "Developed the fingerprint recognition model using CNN.",
      image: "https://placehold.co/200",
    },
    {
      name: "Alice Smith",
      role: "Frontend Developer",
      description: "Designed and implemented the UI for seamless interaction.",
      image: "https://placehold.co/200",
    },
    {
      name: "Michael Lee",
      role: "Backend Developer",
      description: "Built the authentication and database handling system.",
      image: "https://placehold.co/200",
    },
    {
      name: "Sophia Wang",
      role: "Hardware Specialist",
      description: "Integrated the fingerprint scanner with the backend.",
      image: "https://placehold.co/200",
    },
    {
      name: "David Kim",
      role: "Security Analyst",
      description: "Implemented encryption and secure user authentication.",
      image: "https://placehold.co/200",
    },
  ];

  // Slider Settings with enhanced accessibility and responsiveness
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, dots: false } },
    ],
  };

  // Animation variants for consistent animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-gray-900 to-black text-white overflow-hidden">
      {/* Header Particles/Orbs for visual enhancement */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-500/20 blur-3xl"
            style={{
              width: `${Math.random() * 400 + 200}px`,
              height: `${Math.random() * 400 + 200}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 20}s infinite linear`,
              opacity: 0.5,
            }}
          />
        ))}
      </div>

      {/* Hero Section with Improved Glassmorphism */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-600/30 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-purple-600/20 blur-3xl"></div>
        </motion.div>

        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-10 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12">
              {/* Left Content */}
              <motion.div
                className="md:w-1/2 text-center md:text-left"
                initial="hidden"
                animate="visible"
                variants={fadeInLeft}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 leading-tight">
                  Touch-to-Type: <br />
                  <span className="text-white/90">Fingerprint-Based Blood Group Detection</span>
                </h1>
                <p className="mt-5 text-lg text-gray-300 leading-relaxed">
                  A non-invasive method to determine blood type using fingerprint patterns. Powered by AI and biometric technology, our system enhances accessibility and provides accurate, rapid results.
                </p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-blue-500/30 transition duration-300 font-medium"
                >
                  Learn More
                </motion.button>
              </motion.div>

              {/* Right Content */}
              <motion.div
                className="md:w-1/2 flex justify-center"
                initial="hidden"
                animate="visible"
                variants={fadeInRight}
              >
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full transform -translate-x-4 translate-y-4"></div>
                  <img
                    src="https://placehold.co/500x400/111/EEE?text=Fingerprint+Scanning"
                    alt="Fingerprint Scanning"
                    className="relative z-10 rounded-2xl shadow-2xl w-full transform transition duration-500 hover:-translate-y-2 hover:shadow-blue-500/30"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              How It Works
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "👆",
                title: "Scan Fingerprint",
                description: "Place your finger on our scanner for quick biometric reading."
              },
              {
                icon: "🧠",
                title: "AI Analysis",
                description: "Our advanced AI analyzes unique fingerprint patterns to identify blood markers."
              },
              {
                icon: "📊",
                title: "Get Results",
                description: "Receive accurate blood group results within seconds on your device."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-blue-500/20 transition duration-300"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Technologies Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-blue-600/20 blur-3xl"></div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="relative z-10 max-w-6xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Technologies Behind Our System
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: "⚡", name: "Fingerprint Scanning" },
              { icon: "🧠", name: "AI & Deep Learning" },
              { icon: "🔍", name: "Computer Vision" },
              { icon: "🤖", name: "Neural Networks" },
              { icon: "🔐", name: "Secure Cloud Storage" }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-2xl border border-white/20 shadow-xl text-center"
              >
                <div className="text-4xl mb-3">{tech.icon}</div>
                <p className="text-lg font-medium">{tech.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="max-w-6xl mx-auto"
        >
          <div className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-8 sm:p-12 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Why Choose Us?
              </span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "✅", title: "Non-Invasive & Painless", desc: "No needles or blood samples required." },
                { icon: "✅", title: "Accurate & Reliable", desc: "Over 99% accuracy in clinical trials." },
                { icon: "✅", title: "AI-Powered Detection", desc: "Advanced algorithms for precise results." },
                { icon: "✅", title: "Fast Results in Seconds", desc: "No waiting for lab reports." }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-lg hover:shadow-blue-500/20 transition duration-300"
                >
                  <div className="text-2xl mb-3">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full bg-blue-600/20 blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl"></div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="relative z-10 max-w-6xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Meet Our Team
            </span>
          </h2>

          <div className="backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-8 shadow-2xl">
            <Slider {...sliderSettings} className="team-slider">
              {teamMembers.map((member, index) => (
                <div key={index} className="px-2 py-4">
                  <motion.div 
                    whileHover={{ y: -10 }}
                    className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-lg rounded-xl p-6 border border-white/10 shadow-xl h-full flex flex-col items-center text-center"
                  >
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md transform scale-90"></div>
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="relative w-24 h-24 rounded-full object-cover border-2 border-white/50"
                      />
                    </div>
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-blue-400 mb-3">{member.role}</p>
                    <p className="text-gray-300 text-sm">{member.description}</p>
                  </motion.div>
                </div>
              ))}
            </Slider>
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="backdrop-blur-xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-3xl border border-white/20 p-10 sm:p-16 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Experience the Future?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Try our system today and get accurate blood group results in just a few seconds!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/finger")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg px-10 py-4 cursor-pointer rounded-full shadow-lg hover:shadow-blue-500/50 transition duration-300 font-medium"
            >
              Start Now
            </motion.button>
          </div>
        </motion.div>
      </section>

     

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 20px) rotate(10deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        /* Override Slick slider styles for better aesthetics */
        .team-slider .slick-dots li button:before {
          color: white;
        }
        
        .team-slider .slick-prev:before, 
        .team-slider .slick-next:before {
          color: #60a5fa;
          font-size: 24px;
        }
      `}</style>
    </div>
  );
};

export default HomePage;