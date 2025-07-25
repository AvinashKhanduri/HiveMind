import { FaUsers, FaUniversity, FaProjectDiagram, FaCalendarAlt, FaMapMarkerAlt, FaEnvelope, FaUserTie, FaClipboardList, FaEdit, FaExternalLinkAlt, FaHeart, FaChartLine, FaShare, FaReact, FaFire, FaLeaf, FaBrain, FaEye, FaGithub, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router';
import ProjectCard from '../cards/ProjectCard';


// Progress bar for skills
const SkillBar = ({ skill, level }) => (
  <div className="mb-2">
    <div className="flex justify-between text-sm mb-1">
      <span className=' text-white'>{skill}</span>
      <span className="text-gray-400">{level}%</span>
    </div>
    <div className="w-full bg-slate-700 rounded-full h-1.5">
      <div
        className="bg-gradient-to-r  from-blue-500 to-pink-500 h-1.5 rounded-full"
        style={{ width: `${level}%` }}
      />
    </div>
  </div>
);

// Project card component

const UserProfile = ({setIndex}) => {
  const userInfo = {
    name: 'Alex Johnson',
    title: 'Full Stack Developer & AI Researcher',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    coverImage: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?fit=crop&w=1350&q=80',
    university: 'Massachusetts Institute of Technology',
    department: 'Computer Science & AI',
    bio: 'Passionate about building intelligent systems that solve real-world problems. Currently focused on NLP applications for education. Open to collaborations on innovative projects and research.',
    location: 'Boston, MA (Remote available)',
    email: 'alex.johnson@example.com',
    joinedDate: 'January 2023',
    skills: [
      { name: 'React/Next.js', level: 90 },
      { name: 'Node.js', level: 85 },
      { name: 'Python', level: 95 },
      { name: 'Machine Learning', level: 88 },
      { name: 'NLP', level: 82 },
      { name: 'Cloud Architecture', level: 75 }
    ],
    projects: [
      {
        id: 1,
        name: 'EduAI Platform',
        role: 'Lead Developer',
        description: 'AI-powered personalized learning platform using NLP to adapt content to student needs.',
        tech: ['React', 'Python', 'TensorFlow', 'AWS'],
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?fit=crop&w=600&q=80'
      },
      {
        id: 2,
        name: 'Research Paper Analyzer',
        role: 'ML Engineer',
        description: 'Tool that summarizes and connects concepts across academic papers using transformer models.',
        tech: ['Python', 'PyTorch', 'HuggingFace', 'FastAPI'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=600&q=80'
      }
    ],
    currentTeam: {
      name: 'AI Innovators',
      role: 'Technical Lead',
      members: 6,
      activeProjects: 3
    },
    socialLinks: {
      github: 'github.com/alexjohnson',
      linkedin: 'linkedin.com/in/alexjohnson',
      twitter: 'twitter.com/alexjohnson',
      portfolio: 'alexjohnson.dev'
    },
    availability: 'Open for projects',
    lastActive: 'Active now'
  };

  const [expandedBio, setExpandedBio] = React.useState(false);
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-10">
      {/* Cover section with profile header */}
      <div className="relative rounded-2xl overflow-hidden">
        <img 
          src={userInfo.coverImage} 
          alt="Cover" 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
        
        <div className="relative px-6 pb-6 -mt-16">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="relative group">
              <img 
                src={userInfo.avatar} 
                alt={userInfo.name}
                className="w-32 h-32 rounded-2xl border-4 border-slate-800 object-cover"
              />
              <button className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <FaEdit size={12} />
              </button>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-white">{userInfo.name}</h1>
                  <p className="text-blue-300">{userInfo.title}</p>
                </div>
                <button 
                  onClick={() => setIndex(1)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5 border border-white/20 hover:border-pink-400"
                >
                  <FaEdit className="text-xs" />
                  Edit Profile
                </button>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-4 text-sm">
                <span className="flex items-center gap-2 text-gray-300">
                  <FaUniversity className="text-purple-400" />
                  {userInfo.university}
                </span>
                <span className="flex items-center gap-2 text-gray-300">
                  <FaMapMarkerAlt className="text-teal-400" />
                  {userInfo.location}
                </span>
                <span className="flex items-center gap-2 text-gray-300">
                  <FaCalendarAlt className="text-red-400" />
                  Joined {userInfo.joinedDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* About section */}
          <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-6 shadow-xl shadow-blue-900/20 border border-white/10">
            <h2 className="text-xl font-bold mb-4 flex text-white items-center gap-2">
              <FaUserTie className="text-blue-400" />
              About
            </h2>
            <div className="relative">
              <p className={`text-gray-300 ${expandedBio ? '' : 'line-clamp-4'}`}>
                {userInfo.bio}
              </p>
              {userInfo.bio.length > 200 && (
                <button
                  className="text-pink-400 text-sm mt-2 hover:underline"
                  onClick={() => setExpandedBio(!expandedBio)}
                >
                  {expandedBio ? 'Show less' : 'Read more...'}
                </button>
              )}
            </div>
            
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 3 }} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm text-gray-400 mb-2">Skills</h3>
                <div className="space-y-3">
                  {userInfo.skills.slice(0, 4).map((skill, i) => (
                    <SkillBar key={i} skill={skill.name} level={skill.level} />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm text-gray-400 mb-2">Additional Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Availability</span>
                    <span className="text-green-400">{userInfo.availability}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Status</span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      {userInfo.lastActive}
                    </span>
                  </div>
                  {userInfo.currentTeam && (
                    <div className="flex justify-between">
                      <span className="text-white">Current Team</span>
                      <span 
                        className="text-blue-400 hover:underline cursor-pointer"
                        onClick={() => navigate('/teams/ai-innovators')}
                      >
                        {userInfo.currentTeam.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Projects section */}
          <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-6 shadow-xl shadow-blue-900/20 border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl text-white font-bold flex items-center gap-2">
                <FaProjectDiagram className="text-yellow-400" />
                Projects
              </h2>
              
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userInfo.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Current Team */}
          {userInfo.currentTeam && (
            <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-6 shadow-xl shadow-blue-900/20 border border-white/10">
              <h2 className="text-xl text-white font-bold mb-4 flex items-center gap-2">
                <FaUsers className="text-green-400" />
                Current Team
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 text-green-500 h-16 rounded-xl bg-white/10 border-2 flex items-center justify-center text-2xl font-bold">
                    {userInfo.currentTeam.name.charAt(0)}
                  </div>
                  <div>
                    <h3 
                      className="text-lg text-white font-medium hover:text-blue-400 cursor-pointer"
                      onClick={() => navigate('/teams/ai-innovators')}
                    >
                      {userInfo.currentTeam.name}
                    </h3>
                    <p className="text-sm text-gray-400">{userInfo.currentTeam.role}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-slate-900 rounded-lg p-3">
                    <div className="text-2xl font-bold text-white">{userInfo.currentTeam.members}</div>
                    <div className="text-xs text-gray-200 ">Members</div>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-3">
                    <div className="text-2xl font-bold text-white">{userInfo.currentTeam.activeProjects}</div>
                    <div className="text-xs text-gray-200">Projects</div>
                  </div>
                </div>
                
                <button 
                  className="w-full bg-white/10 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                  onClick={() => navigate('/teams/ai-innovators')}
                >
                  View Team Dashboard
                </button>
              </div>
            </div>
          )}

          {/* Contact & Social */}
          <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-6 shadow-xl shadow-blue-900/20 border border-white/10">
            <h2 className="text-xl font-bold mb-4 flex text-white items-center gap-2">
              <FaEnvelope className="text-pink-400" />
              Contact
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 hover:bg-slate-800/50 rounded-lg transition">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a href={`mailto:${userInfo.email}`} className="text-white hover:underline">
                    {userInfo.email}
                  </a>
                </div>
              </div>
              
              {Object.entries(userInfo.socialLinks).map(([platform, link]) => {
                const icons = {
                  github: <FaGithub className="text-gray-300" />,
                  linkedin: <FaLinkedin className="text-blue-400" />,
                  twitter: <FaTwitter className="text-sky-400" />,
                  portfolio: <FaGlobe className="text-green-400" />
                };
                
                return (
                  <div key={platform} className="flex items-center gap-3 p-3 hover:bg-slate-800/50 rounded-lg transition">
                    <div className={`p-2 ${platform === 'github' ? 'bg-gray-500/10' : platform === 'linkedin' ? 'bg-blue-500/10' : platform === 'twitter' ? 'bg-sky-500/10' : 'bg-green-500/10'} rounded-lg`}>
                      {icons[platform]}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 capitalize">{platform}</p>
                      <a 
                        href={`https://${link}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white hover:underline"
                      >
                        {link}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default UserProfile;