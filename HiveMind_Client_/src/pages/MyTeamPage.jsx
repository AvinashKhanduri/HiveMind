import { FaUsers, FaUniversity, FaProjectDiagram, FaCalendarAlt, FaMapMarkerAlt, FaEnvelope, FaUserTie, FaClipboardList, FaEdit, FaExternalLinkAlt, FaHeart, FaChartLine, FaShare, FaReact, FaFire, FaLeaf, FaBrain, FaEye, FaGithub } from 'react-icons/fa';
import TeamMemberTable from "../components/Teams/TeamMemberTable"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import CustomizeTeam from '../components/Teams/modals/CustomizeTeam';
import { useState } from 'react';
import StartNewProjectModal from '../components/Teams/modals/StartNewProjectModal';
import { useNavigate } from 'react-router';



// Team member avatars (circular with +more)
const TeamAvatars = ({ members }) => (
  <div className='flex -space-x-2 mt-2'>
    {members.slice(0, 4).map((member, i) => (
      <img
        key={i}
        src={member.avatar}
        alt={member.name}
        className='w-6 h-6 rounded-full border-2 border-slate-800'
      />
    ))}
    {members.length > 4 && (
      <div className='w-6 h-6 rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center text-xs'>
        +{members.length - 4}
      </div>
    )}
  </div>
);

// Progress bar for projects
const ProgressBar = ({ progress }) => (
  <div className='w-full bg-slate-700 rounded-full h-1.5 mt-2'>
    <div
      className='bg-gradient-to-r from-blue-500 to-pink-500 h-1.5 rounded-full'
      style={{ width: `${progress}%` }}
    />
  </div>
);

// Status badge
const Badge = ({ text, color }) => (
  <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block bg-${color}-500/10 text-${color}-400`}>
    {text}
  </span>
);

// Role availability pill
const RolePill = ({ count }) => (
  <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${count > 0 ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}>
    {count > 0 ? `${count} roles open` : 'No openings'}
  </span>
);

const MyTeamPage = () => {
  const teamInfo = {
    name: 'Innovators Hub',
    description: 'We are a passionate group of students from MIT working on cutting-edge AI & ML research projects. Our team specializes in building intelligent systems that solve real-world problems through interdisciplinary collaboration. Currently developing three projects including an NLP-powered research assistant and computer vision for medical diagnostics.',
    university: 'Massachusetts Institute of Technology',
    department: 'Computer Science & AI Lab',
    totalMembers: 8,
    members: [
      { avatar: 'https://randomuser.me/api/portraits/women/44.jpg', name: 'Sarah Chen' },
      { avatar: 'https://randomuser.me/api/portraits/men/32.jpg', name: 'James Wilson' },
      { avatar: 'https://randomuser.me/api/portraits/women/68.jpg', name: 'Priya Patel' },
      { avatar: 'https://randomuser.me/api/portraits/men/75.jpg', name: 'David Kim' },
      { avatar: 'https://randomuser.me/api/portraits/women/90.jpg', name: 'Maria Garcia' },
      { avatar: 'https://randomuser.me/api/portraits/men/22.jpg', name: 'Thomas Lee' },
      { avatar: 'https://randomuser.me/api/portraits/women/33.jpg', name: 'Emma Johnson' },
      { avatar: 'https://randomuser.me/api/portraits/men/55.jpg', name: 'Daniel Brown' }
    ],
    projectsCount: 3,
    projectsCompleted: 65, // percentage
    foundedOn: 'June 10, 2025',
    active: true,
    locationMode: 'remote',
    contactEmail: 'contact@innovatorshub.tech',
    openRoles: ['Frontend Developer', 'Data Scientist', 'UX Designer'],
    lastActive: '2 hours ago',
    skills: ['AI/ML', 'Python', 'TensorFlow', 'React', 'NLP', 'Computer Vision'],
    upcomingEvents: [
      { name: 'MIT Hackathon', date: 'Nov 15-17' },
      { name: 'AI Conference', date: 'Dec 5' }
    ]
  };
  const [isCustomizeTeamModalOpen, setIsCustomizeTeamModalOpen] = React.useState(false);
  const [isStartNewProjectModal,setStartNewProjectModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [expanded, setExpanded] = React.useState(false);
  const [teamData, setTeamData] = useState(teamInfo);
  const navigate = useNavigate();

  return (
    <>
      {/* Top section */}
      <div className='relative 
  bg-gradient-to-r from-slate-900 to-blue-900 
  text-white p-6 rounded-2xl m-5 
  shadow-xl shadow-blue-900/20 
  border border-white/10 
  hover:shadow-blue-900/30 
  transition-all duration-300 
  group
  overflow-hidden'>

        {/* Shimmer overlay (new addition) */}
        <div className="
    absolute -inset-0 
    bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)]
    opacity-0 
    group-hover:opacity-100 
    transition-opacity duration-500
  "></div>


        {/* Header with animated gradient text */}
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-3xl font-bold'>
            <span className='bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient'>
              Team Dashboard
            </span>
          </h2>
          <button onClick={() => setIsCustomizeTeamModalOpen(true)} className=' z-10 flex items-center gap-2 bg-white/10 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5 border border-white/20 hover:border-pink-400'>
            <FaEdit className='text-xs' />
            Customize Team
          </button>
          
        </div>

        {/* Description with expandable feature */}
        <div className='relative mb-8'>
          <p className={`text-gray-300/90 ${teamInfo.description.length > 120 ? 'line-clamp-2' : ''} transition-all`}>
            {teamInfo.description}
          </p>
          {teamInfo.description.length > 120 && (
            <button
              className='text-pink-400 text-sm mt-1 hover:underline'
              onClick={() => setExpanded(!expanded)}
            >
              Read {expanded ? 'less' : 'more'}...
            </button>
          )}
        </div>

        {/* Grid with animated cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {[
            { icon: <FaUserTie className='text-blue-400' />, label: 'Team Name', value: teamInfo.name },
            { icon: <FaUniversity className='text-purple-400' />, label: 'University', value: `${teamInfo.university} / ${teamInfo.department}` },
            { icon: <FaUsers className='text-green-400' />, label: 'Members', value: `${teamInfo.totalMembers} Members`, extra: <TeamAvatars members={teamInfo.members} /> },
            { icon: <FaProjectDiagram className='text-yellow-400' />, label: 'Projects', value: teamInfo.projectsCount, extra: <ProgressBar progress={teamInfo.projectsCompleted} /> },
            { icon: <FaCalendarAlt className='text-red-400' />, label: 'Founded', value: teamInfo.foundedOn, extra: <Badge text={teamInfo.active ? 'Active' : 'Inactive'} color={teamInfo.active ? 'green' : 'gray'} /> },
            { icon: <FaMapMarkerAlt className='text-teal-400' />, label: 'Location', value: teamInfo.locationMode === 'remote' ? '🌍 Remote' : '🏢 On-campus' },
            { icon: <FaEnvelope className='text-pink-400' />, label: 'Contact', value: teamInfo.contactEmail, clickable: true },
            { icon: <FaClipboardList className='text-orange-400' />, label: 'Open Roles', value: teamInfo.openRoles?.length > 0 ? teamInfo.openRoles.join(', ') : 'None', extra: <RolePill count={teamInfo.openRoles?.length || 0} /> },
          ].map((item, index) => (
            <div
              key={index}
              className='bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 hover:border-pink-500/30 transition-all duration-200 hover:shadow-lg cursor-pointer group/card'
            >
              <div className='flex items-start gap-3'>
                <div className='p-2 bg-white/10 rounded-lg group-hover/card:bg-pink-500/20 transition-all'>
                  {item.icon}
                </div>
                <div>
                  <h3 className='text-sm text-gray-400'>{item.label}</h3>
                  <p className='text-white font-medium mt-1 flex items-center gap-2'>
                    {item.value}
                    {item.clickable && <FaExternalLinkAlt className='text-xs opacity-0 group-hover/card:opacity-100 transition' />}
                  </p>
                  {item.extra && <div className='mt-2'>{item.extra}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats footer */}
        <div className='mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-sm text-gray-400'>
          <div className='flex items-center gap-2'>
            <FaHeart className='text-pink-500' />
            <span>Last active: {teamInfo.lastActive}</span>
          </div>
          <div className='flex gap-4'>
            <button className='hover:text-pink-400 transition flex items-center gap-1'>
              <FaShare /> Share
            </button>
            <button className='hover:text-blue-400 transition flex items-center gap-1'>
              <FaChartLine /> Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Team Projects section */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-blue-900 backdrop-blur-lg p-6 shadow-lg space-y-6 mt-9">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-white text-2xl font-bold tracking-wide">🚀 Projects</h2>

          <button onClick={()=> setStartNewProjectModal(true)} className="bg-white/10 border-green-500  border-3 text-white text-sm px-4 py-2 rounded-full hover:shadow-[5px_5px_0px_0px_rgba(109,40,217)] w-full md:w-auto transition">
            ➕ Start New Project
          </button>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, idx) => (
            <div
              key={idx}
              className="relative bg-gradient-to-br from-slate-800 via-slate-800/90 to-slate-900 rounded-2xl p-5 text-white  hover:shadow-[0_15px_40px_rgba(2,132,199,0.4)] hover:scale-[1.02] transition-all duration-300 group overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Menu with dropdown */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={handleClick}
                  className="p-1 rounded-full bg-black/30 hover:bg-white/10 transition-colors"
                >
                  <MoreVertIcon className="text-white/80 hover:text-white" />
                </button>
              </div>

              {/* Project banner with overlay */}
              <div className="relative rounded-xl overflow-hidden h-40 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?fit=crop&w=600&q=80"
                  alt="Project Banner"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-4">
                  <div>
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Project Nova
                      </span>
                      <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    </h3>
                    <p className="text-gray-300 text-sm">AI-powered research collaboration platform</p>
                  </div>
                </div>
              </div>

              {/* Project description with expandable feature */}
              <div className="relative">
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">
                  Building an intelligent platform that connects researchers with complementary skills.
                  Features include real-time collaboration, automated literature reviews, and
                  AI-assisted hypothesis generation.
                </p>
                <button className="text-blue-400 text-xs hover:underline flex items-center gap-1">
                  <span>Show more</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Tech stack chips with icons */}
              <div className="flex flex-wrap gap-2 my-4">
                <span className="flex items-center gap-1 bg-blue-500/10 text-blue-300 px-3 py-1 rounded-full text-xs">
                  <FaReact className="text-blue-400" /> React
                </span>
                <span className="flex items-center gap-1 bg-orange-500/10 text-orange-300 px-3 py-1 rounded-full text-xs">
                  <FaFire className="text-orange-400" /> Firebase
                </span>
                <span className="flex items-center gap-1 bg-green-500/10 text-green-300 px-3 py-1 rounded-full text-xs">
                  <FaLeaf className="text-green-400" /> Spring Boot
                </span>
                <span className="flex items-center gap-1 bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full text-xs">
                  <FaBrain className="text-purple-400" /> TensorFlow
                </span>
              </div>

              {/* Team progress section */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Development Progress</span>
                  <span>65%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-cyan-400 h-1.5 rounded-full"
                    style={{ width: '65%' }}
                  ></div>
                </div>
              </div>

              {/* Team members avatars + action buttons */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((_, i) => (
                    <img
                      key={i}
                      src={`https://randomuser.me/api/portraits/${i % 2 ? 'men' : 'women'}/${30 + i}.jpg`}
                      className="w-8 h-8 rounded-full border-2 border-slate-800 hover:border-blue-400 transition-all"
                      alt="Team member"
                    />
                  ))}
                  <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center text-xs hover:bg-slate-600">
                    +3
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>navigate("/project-detail")}  className=" z-10 bg-blue-600 hover:bg-blue-500 text-white text-sm px-3 py-1.5 rounded-lg transition-all flex items-center gap-1">
                    <FaEye size={12} /> View
                  </button>
                  <button className="bg-slate-700 hover:bg-slate-600 text-white text-sm px-3 py-1.5 rounded-lg transition-all flex items-center gap-1">
                    <FaGithub size={12} /> Code
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>


      <TeamMemberTable />

      {/* Menu  */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 3,
            sx: {
              overflow: 'visible',
              background: 'linear-gradient(135deg, #1e293b, #1e40af)',  // slate-800 to blue-900 gradient
              color: 'white',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              borderRadius: 2,
              minWidth: 180,
              '& .MuiMenuItem-root': {
                gap: '0.5rem',
                fontSize: '0.95rem',
                transition: 'background-color 0.2s',
              },
              '& .MuiMenuItem-root:hover': {
                backgroundColor: 'rgba(59,130,246,0.3)', // semi-transparent blue on hover
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                background: 'linear-gradient(135deg, #1e293b, #1e40af)',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => console.log('View')}>
          <VisibilityIcon fontSize="small" />
          View Details
        </MenuItem>

        <MenuItem onClick={() => console.log('Edit')}>
          <EditIcon fontSize="small" />
          Edit
        </MenuItem>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

        <MenuItem onClick={() => console.log('Delete')}>
          <DeleteIcon fontSize="small" color="error" />
          <span className="text-red-400">Delete</span>
        </MenuItem>
      </Menu>

      {/* customize team modal */}
      <CustomizeTeam
        open={isCustomizeTeamModalOpen}
        setOpen={setIsCustomizeTeamModalOpen}
        teamInfo={teamInfo}
        setTeamInfo={setTeamData}
      />

      {/* Start new project modal */}
      <StartNewProjectModal open={isStartNewProjectModal} onClose={()=>setStartNewProjectModal(false)} />

    </>
  );
};



export default MyTeamPage;
