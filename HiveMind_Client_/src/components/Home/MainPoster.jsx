import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MainPoster = () => {
  const items = [
    {
      name: "Tech Hackathon 2023",
      description: "Join our 48-hour coding marathon to build innovative solutions and win exciting prizes!",
      image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      cta: "Register Now",
      tags: ["Coding", "Innovation", "Prize"]
    },
    {
      name: "Startup Pitch Competition",
      description: "Pitch your startup idea to investors and get funding for your dream project!",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
      cta: "Apply Today",
      tags: ["Entrepreneurship", "Funding", "Networking"]
    },
    {
      name: "AI Workshop Series",
      description: "Learn cutting-edge AI techniques from industry experts in this 4-week intensive workshop.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80",
      cta: "Learn More",
      tags: ["Artificial Intelligence", "Workshop", "Hands-on"]
    },
    {
      name: "Tech Hackathon 2023",
      description: "Join our 48-hour coding marathon to build innovative solutions and win exciting prizes!",
      image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      cta: "Register Now",
      tags: ["Coding", "Innovation", "Prize"]
    },
    {
      name: "Tech Hackathon 2023",
      description: "Join our 48-hour coding marathon to build innovative solutions and win exciting prizes!",
      image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      cta: "Register Now",
      tags: ["Coding", "Innovation", "Prize"]
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const nextPoster = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
      setIsVisible(true);
    }, 300);
  };

  const prevPoster = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
      setIsVisible(true);
    }, 300);
  };

  useEffect(() => {
    if (!isHovered) {
      const intervalId = setInterval(nextPoster, 5000);
      return () => clearInterval(intervalId);
    }
  }, [currentIndex, isHovered]);

  const currentItem = items[currentIndex];

  return (
    <div
      className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image with Gradient Overlay */}
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentItem.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <AnimatePresence>
        <motion.div
          key={`content-${currentIndex}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: isVisible ? 1 : 0 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 h-full flex flex-col justify-end p-8 text-white"
        >
          {/* Tags */}
          <div className="flex gap-2 mb-3">
            {currentItem.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title and Description */}
          <h2 className="text-3xl font-bold mb-2">{currentItem.name}</h2>
          <p className="text-lg mb-6 max-w-[600px]">{currentItem.description}</p>

          {/* CTA Button */}
          <button
            className="self-start px-6 py-3 rounded-lg font-medium transition-all duration-300 border-2
             bg-gradient-to-r from-slate-900 to-blue-900 
             hover:from-slate-800 hover:to-blue-800
             active:from-slate-700 active:to-blue-700
             shadow-lg hover:shadow-xl"
          >
            {currentItem.cta}
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {isHovered && (
        <>
          <button
            onClick={prevPoster}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextPoster}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Progress Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsVisible(true);
              }, 300);
            }}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white w-6' : 'bg-white/50'}`}
          />
        ))}
      </div>

      {/* See All Link */}
      <div className="absolute top-4 right-4 z-20">
        <button className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-medium transition-colors duration-300">
          See all events
        </button>
      </div>
    </div>
  );
};

export default MainPoster;