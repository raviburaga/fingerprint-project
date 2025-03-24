import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Finger() {
  const [option, setOption] = useState("upload");
  const [singleFile, setSingleFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Animation variants for consistent animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const handleFileChange = (file) => {
    if (!file) return;
    setSingleFile(file);
    setResult("");
    setConfidence(null);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!singleFile) return;
  
    setProcessing(true);
    setResult("");
    setConfidence(null);
    setErrorMessage(""); // Clear previous errors
  
    const formData = new FormData();
    formData.append("image", singleFile);
  
    try {
      const response = await axios.post("http://127.0.0.1:5000/upload-single", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("Upload Response:", response.data);
  
      if (response.data.error) {
        setErrorMessage(response.data.error);
      } else {
        setResult(response.data.result || "Unknown Result");
        setConfidence(response.data.confidence ?? null);
        setImagePreview(response.data.input_image ? `data:image/bmp;base64,${response.data.input_image}` : null);
      }
    } catch (error) {
      console.error("Upload Error:", error.response?.data || error.message);
      setErrorMessage("Failed to upload. Please try again.");
    }
  
    setProcessing(false);
  };
  
  const handleStartScan = async () => {
    setScanning(true);
    setResult("");
    setConfidence(null);
    setErrorMessage(""); // Clear any previous errors
  
    try {
      const response = await axios.post("http://127.0.0.1:5000/scan-fingerprint");
  
      console.log("Scan Response:", response.data);
  
      if (response.data.error) {
        setErrorMessage(response.data.error);
      } else {
        setResult(response.data.result || "Unknown Result");
        setConfidence(response.data.confidence ?? null);
      }
    } catch (error) {
      console.error("Scan Error:", error.response?.data || error.message);
      setErrorMessage("Scanner error. Please check connection.");
    }
  
    setScanning(false);
  };
  
  // Show Overlay when dragging anywhere on screen
  useEffect(() => {
    const handleDragEnter = (e) => {
      e.preventDefault();
      setShowOverlay(true);
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      setShowOverlay(false);
    };

    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragleave", handleDragLeave);
    };
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setShowOverlay(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-gray-900 to-black text-white overflow-hidden">
      {/* Background Particles/Orbs for visual enhancement */}
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

      {/* Main Content Section */}
      <section className="relative min-h-screen flex justify-center items-center p-4 md:p-8">
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

        {/* Main glassmorphism card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-2xl backdrop-blur-lg bg-white/10 rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl overflow-hidden"
        >
          {/* Title */}
          <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Fingerprint Blood Group Detection</h1>

          {/* Toggle Switch */}
          <div className="relative w-full max-w-xs mx-auto h-12 mb-8 rounded-full bg-white/10 border border-white/30 p-1">
            <div 
              className={`absolute top-1 left-1 h-10 w-1/2 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 shadow-md transition-all duration-300 transform ${option === "scanner" ? "translate-x-full" : ""}`}
            ></div>
            <div className="relative flex h-full">
              <button 
                className={`w-1/2 h-full rounded-full cursor-pointer font-medium transition-colors duration-300 z-10 ${option === "upload" ? "text-white" : "text-gray-400"}`} 
                onClick={() => setOption("upload")}
              >
                Upload Image
              </button>
              <button 
                className={`w-1/2 h-full rounded-full cursor-pointer font-medium transition-colors duration-300 z-10 ${option === "scanner" ? "text-white" : "text-gray-400"}`} 
                onClick={() => setOption("scanner")}
              >
                Use Scanner
              </button>
            </div>
          </div>

          {/* File Upload Area */}
          {option === "upload" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all mb-4 ${dragging ? "border-blue-400 bg-blue-900/20" : "border-white/30 hover:border-blue-400/50 hover:bg-blue-900/10"}`}
              onClick={() => document.getElementById("fileInput").click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".bmp"
                id="fileInput"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files[0])}
              />
              <svg className="w-12 h-12 text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p className="text-sm md:text-base font-medium text-gray-200">
                <span className="font-bold">Click to Browse</span> or Drag & Drop
              </p>
              <p className="text-xs text-gray-400 mt-1">Only .bmp fingerprint images supported</p>
            </motion.div>
          )}

          {/* Scanner Button */}
          {option === "scanner" && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center my-8"
            >
              <motion.button 
                onClick={handleStartScan} 
                disabled={scanning}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-blue-500/30 transition duration-300 font-medium disabled:opacity-70 disabled:transform-none overflow-hidden relative"
              >
                <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                {scanning ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Scanning...
                  </div>
                ) : (
                  <>Start Scan</>
                )}
              </motion.button>
            </motion.div>
          )}

          {/* Upload Button */}
          {singleFile && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center my-4"
            >
              <motion.button 
                onClick={handleUpload} 
                disabled={processing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-blue-500/30 transition duration-300 font-medium disabled:opacity-70"
              >
                {processing ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : "Analyze Fingerprint"}
              </motion.button>
            </motion.div>
          )}

          {/* Processing Animation */}
          {processing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center my-6"
            >
              <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-gray-300 italic">Analyzing fingerprint pattern...</p>
            </motion.div>
          )}

          {/* Image Preview */}
          {imagePreview && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="my-6"
            >
              <h5 className="text-lg font-medium text-gray-200 mb-2">Uploaded Fingerprint:</h5>
              <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20">
                <img src={imagePreview} alt="Fingerprint" className="max-h-48 mx-auto rounded" />
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-900/30 backdrop-blur-sm text-red-300 p-4 rounded-lg flex items-start my-4 border border-red-500/30"
            >
              <svg className="w-5 h-5 text-red-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {/* Results */}
          {result && !errorMessage && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-6 backdrop-blur-lg bg-white/10 p-4 rounded-xl border border-white/20"
            >
              <h5 className="text-lg font-medium text-gray-200 mb-2">Predicted Blood Group:</h5>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 py-2">{result}</div>
                {confidence !== null && (
                  <div className="w-full mt-2">
                    <div className="flex justify-between text-sm text-gray-300 mb-1">
                      <span>Confidence</span>
                      <span>{confidence.toFixed(2)}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-800/50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${confidence}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Full-Screen Drag & Drop Overlay */}
      {showOverlay && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 backdrop-filter backdrop-blur-sm z-50 flex items-center justify-center"
          onDrop={handleDrop} 
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="bg-white/10 border border-white/30 p-12 rounded-3xl text-center">
            <svg className="w-16 h-16 text-blue-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p className="text-xl font-medium text-white">Drop fingerprint image here</p>
          </div>
        </motion.div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 20px) rotate(10deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}

export default Finger;