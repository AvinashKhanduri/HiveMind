import { FaGithub, FaExternalLinkAlt, FaRegBookmark, FaBookmark, FaRegStar, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(project.likes || 42); // Default value

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative bg-gradient-to-br from-slate-800 via-slate-800/90 to-slate-900 rounded-2xl p-5 text-white shadow-lg hover:shadow-[0_15px_40px_rgba(2,132,199,0.4)] transition-all duration-300 group overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/projects/${project.id}`)}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.1)_0%,transparent_70%)] opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : ''}`}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Floating action buttons */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleBookmark}
          className="p-2 bg-slate-800/50 backdrop-blur-sm rounded-full hover:bg-pink-600/20 transition-colors"
        >
          {isBookmarked ? (
            <FaBookmark className="text-pink-400" />
          ) : (
            <FaRegBookmark className="text-gray-400 hover:text-pink-400" />
          )}
        </motion.button>
      </div>

      {/* Project image with parallax effect */}
      <div className="relative rounded-xl overflow-hidden h-32 mb-4">
        <motion.img
          src={project.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=600&q=80"}
          alt={project.name}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-4">
          <div>
            <motion.h3 
              className="text-xl font-bold"
              initial={{ y: 0 }}
              animate={{ y: isHovered ? -5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.name}
            </motion.h3>
            <p className="text-gray-300 text-sm">{project.role}</p>
          </div>
        </div>
      </div>

      {/* Project description with read more */}
      <div className="relative mb-4 min-h-[3.5rem]">
        <p className={`text-gray-300 text-sm transition-all duration-300 ${isHovered ? 'line-clamp-4' : 'line-clamp-2'}`}>
          {project.description}
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-900/90 to-transparent pointer-events-none"
        />
      </div>

      {/* Tech stack tags with hover effects */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech, i) => (
          <motion.span
            key={i}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
            className="bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded-full text-xs cursor-default transition-colors"
          >
            {tech}
          </motion.span>
        ))}
      </div>

      {/* Interactive footer */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className="flex items-center gap-1 text-sm"
          >
            {isLiked ? (
              <FaStar className="text-yellow-400" />
            ) : (
              <FaRegStar className="text-gray-400 hover:text-yellow-400" />
            )}
            <span className={isLiked ? 'text-yellow-400' : 'text-gray-400'}>{likeCount}</span>
          </motion.button>
        </div>

        <div className="flex gap-2">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            >
              <FaGithub className="text-white" />
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-1 text-sm"
            >
              <FaExternalLinkAlt size={12} />
            </motion.a>
          )}
        </div>
      </div>

      {/* Progress indicator (optional) */}
      {project.progress && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-1.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-gradient-to-r from-blue-400 to-cyan-400 h-1.5 rounded-full"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectCard;