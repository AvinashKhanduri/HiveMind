
import { useState } from 'react';
import { FaGithub, FaLinkedin, FaCode, FaUniversity, FaBriefcase, FaRegStar, FaStar,FaJava, FaEye, FaHandshake } from 'react-icons/fa';
import { SiReact, SiSpring, SiMongodb, SiTailwindcss, SiPython } from 'react-icons/si';
import { useNavigate } from 'react-router';

const techIcons = {
  'React': <SiReact className="text-blue-400" />,
  'Spring Boot': <SiSpring className="text-green-500" />,
  'MongoDB': <SiMongodb className="text-green-600" />,
  'Tailwind CSS': <SiTailwindcss className="text-cyan-400" />,
  'Java': <FaJava className="text-red-500" />,
  'Python': <SiPython className="text-yellow-400" />,
};

const UserProfileCard = ({ user }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeTab, setActiveTab] = useState('skills');
  const navigate = useNavigate();

  // Static profile picture (no random changes)
  const profilePic = user.profilePicture || "https://randomuser.me/api/portraits/men/1.jpg";

  return (
    <div 
      className={`w-full rounded-2xl overflow-hidden mt-4 transition-all duration-500 ${isHovered ? 'shadow-[0_10px_30px_-5px_rgba(59,130,246,0.5)]' : 'shadow-lg'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 p-4 sm:p-6 md:p-8">
        <div className="relative z-10">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Static Profile Picture */}
              <div className="relative">
                <div className={`absolute -inset-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 blur transition-all duration-700 ${isHovered ? 'opacity-60' : 'opacity-20'}`}></div>
                <img 
                  src={profilePic} 
                  alt={user.name}
                  className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-blue-400 object-cover z-10"
                />
              </div>
              
              {/* Name & Title */}
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                  {user.name}
                </h2>
                <div className="flex items-center gap-2 text-blue-300 text-sm sm:text-base">
                  {user.role === 'student' ? (
                    <FaUniversity className="text-sm" />
                  ) : (
                    <FaBriefcase className="text-sm" />
                  )}
                  <span>{user.organization}</span>
                </div>
              </div>
            </div>
            
            {/* Favorite Button */}
            <button 
              onClick={() => setIsFavorited(!isFavorited)}
              className="self-start sm:self-center text-xl sm:text-2xl focus:outline-none transition-transform hover:scale-110"
            >
              {isFavorited ? (
                <FaStar className="text-yellow-400" />
              ) : (
                <FaRegStar className="text-blue-300 hover:text-yellow-400" />
              )}
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-4 flex border-b border-blue-800">
            <button
              className={`px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium transition-all ${activeTab === 'skills' ? 'text-blue-300 border-b-2 border-blue-400' : 'text-blue-400 hover:text-blue-200'}`}
              onClick={() => setActiveTab('skills')}
            >
              Skills
            </button>
            <button
              className={`px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium transition-all ${activeTab === 'projects' ? 'text-blue-300 border-b-2 border-blue-400' : 'text-blue-400 hover:text-blue-200'}`}
              onClick={() => setActiveTab('projects')}
            >
              Projects
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-3 min-h-[80px]">
            {activeTab === 'skills' ? (
              <div className="flex flex-wrap gap-2">
                {user.techStack.map((tech, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 bg-blue-900/40 rounded-lg border border-blue-700 transition-all hover:bg-blue-800/50 hover:border-blue-500"
                  >
                    <span className="text-sm sm:text-base">
                      {techIcons[tech] || <FaCode className="text-blue-300" />}
                    </span>
                    <span className="text-blue-100 text-xs sm:text-sm font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {user.projects?.slice(0, 2).map((project, index) => (
                  <a 
                    key={index}
                    href={project.url || '#'}
                    className="block p-2 sm:p-3 bg-blue-900/30 rounded-lg border border-blue-800 hover:border-blue-500 transition-all group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h4 className="text-blue-200 text-xs sm:text-sm font-medium group-hover:text-white">{project.name}</h4>
                    <p className="text-blue-400 text-xs mt-1 line-clamp-1 sm:line-clamp-2">{project.description}</p>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Social & Action Buttons */}
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex gap-3">
              <a href={user.github || '#'} className="text-xl text-blue-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href={user.linkedin || '#'} className="text-xl text-blue-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              {/* Creative "View Profile" Button */}
              <button onClick={()=>navigate("/user-profile")} className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <FaEye className="text-xs sm:text-sm" />
                <span>View Profile</span>
              </button>
              
              {/* Creative "Connect" Button */}
              <button className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 bg-transparent border-2 border-blue-500 hover:bg-blue-500/20 text-blue-300 font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <FaHandshake className="text-xs sm:text-sm" />
                <span>Connect</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



const UsersPage = () => {
  const users = [
  {
    name: "Sophia Lee",
    gender: "female",
    profilePicture: "",
    role: "student",
    organization: "Stanford AI Lab",
    isVerified: true,
    techStack: ["TensorFlow", "Python", "Keras", "Pandas"],
    projects: [
      { name: "Image Classifier", description: "Built using CNN and TensorFlow", url: "#" },
      { name: "Data Visualizer", description: "Used D3.js and Python to visualize datasets", url: "#" },
    ],
    github: "https://github.com/sophia-lee",
    linkedin: "https://linkedin.com/in/sophia-lee"
  },
  {
    name: "Ravi Sharma",
    gender: "male",
    profilePicture: "",
    role: "developer",
    organization: "IIT Bombay",
    isVerified: false,
    techStack: ["Node.js", "Express", "React", "MongoDB"],
    projects: [
      { name: "Job Portal", description: "Full-stack portal with search and filter", url: "#" },
      { name: "Blog API", description: "REST API using Express and MongoDB", url: "#" },
    ],
    github: "https://github.com/ravisharma",
    linkedin: "https://linkedin.com/in/ravisharma"
  },
  {
    name: "Emily Zhang",
    gender: "female",
    profilePicture: "",
    role: "mentor",
    organization: "Harvard Data Science",
    isVerified: true,
    techStack: ["R", "SQL", "Tableau", "Python"],
    projects: [
      { name: "COVID Dashboard", description: "Real-time analytics with Tableau", url: "#" },
      { name: "Survey Analysis", description: "R scripts for analyzing public opinion", url: "#" },
    ],
    github: "https://github.com/emilyzhang",
    linkedin: "https://linkedin.com/in/emilyzhang"
  },
  {
    name: "Mohammed Alvi",
    gender: "male",
    profilePicture: "",
    role: "student",
    organization: "BITS Pilani",
    isVerified: true,
    techStack: ["Flutter", "Dart", "Firebase"],
    projects: [
      { name: "Chat App", description: "Real-time messaging with Flutter and Firebase", url: "#" },
      { name: "Food Delivery App", description: "Built with Flutter, maps, and Stripe integration", url: "#" },
    ],
    github: "https://github.com/mohammedalvi",
    linkedin: "https://linkedin.com/in/mohammedalvi"
  },
  {
    name: "Ananya Sen",
    gender: "female",
    profilePicture: "",
    role: "developer",
    organization: "Google Summer of Code",
    isVerified: false,
    techStack: ["Go", "Kubernetes", "Docker", "Linux"],
    projects: [
      { name: "Container Manager", description: "CLI tool to manage Docker containers", url: "#" },
      { name: "Kube Monitor", description: "Dashboard for Kubernetes cluster metrics", url: "#" },
    ],
    github: "https://github.com/ananyasen",
    linkedin: "https://linkedin.com/in/ananyasen"
  },
];


    return (
        <>
        
            {users.map((user, index) => (
      <UserProfileCard key={index} user={user} />
    
    ))}
        </>
    )
}

export default UsersPage;