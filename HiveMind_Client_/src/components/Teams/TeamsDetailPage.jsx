import React from 'react';
import { useParams } from 'react-router-dom';
import {
    FaFlask,
    FaUniversity,
    FaUsers,
    FaUserPlus,
    FaEye,
    FaStar,
    FaChevronDown,
    FaCrown,
    FaEnvelope,
    FaCopy,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaEdit
} from 'react-icons/fa';



export default function TeamDetailPage() {
    const teamInfo = {
        name: "Innovators Hub",
        description: "We are a passionate group of students from MIT working on cutting-edge AI & ML research projects. Our team specializes in building intelligent systems that solve real-world problems through interdisciplinary collaboration.",
        university: "Massachusetts Institute of Technology",
        department: "Computer Science & AI Lab",
        totalMembers: 8,
        members: [
            {
                name: "Neil Sims",
                role: "Team Leader",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                email: "leader@innovatorshub.com"
            },
            {
                name: "Sarah Chen",
                role: "AI Researcher",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg"
            },
            {
                name: "James Wilson",
                role: "Backend Developer",
                avatar: "https://randomuser.me/api/portraits/men/22.jpg"
            },
            {
                name: "Priya Patel",
                role: "Data Scientist",
                avatar: "https://randomuser.me/api/portraits/women/68.jpg"
            },
            // Add more members as needed
        ],
        projectsCount: 3,
        projectsCompleted: 65, // percentage
        foundedOn: "June 10, 2025",
        active: true,
        locationMode: "remote", // or "on-campus"
        contactEmail: "contact@innovatorshub.tech",
        openRoles: ["Frontend Developer", "Data Scientist", "UX Designer"],
        lastActive: "2 hours ago",
        skills: ["AI/ML", "Python", "TensorFlow", "React", "NLP", "Computer Vision"],
        upcomingEvents: [
            { name: "MIT Hackathon", date: "Nov 15-17" },
            { name: "AI Conference", date: "Dec 5" }
        ],
        socialLinks: {
            github: "https://github.com/innovators-hub",
            website: "https://innovatorshub.tech"
        }
    };

    return (
        <>
            {/* Top section */}
            <div className="relative bg-gradient-to-r from-slate-900 via-blue-900/80 to-blue-900 min-h-48 rounded-2xl m-5 mt-7 shadow-xl overflow-hidden group transition-all duration-500 hover:shadow-[0_10px_30px_rgba(56,189,248,0.3)]">
                {/* Animated background elements */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Floating dots pattern */}
                <div className="absolute inset-0 opacity-10">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-white"
                            style={{
                                width: `${Math.random() * 4 + 1}px`,
                                height: `${Math.random() * 4 + 1}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                                animationDelay: `${Math.random() * 5}s`
                            }}
                        />
                    ))}
                </div>

                <div className="flex flex-col md:flex-row justify-start items-start p-6 gap-6 relative z-10">
                    {/* Team logo with interactive border */}
                    <div
                        className="relative h-32 w-32 min-w-[8rem] rounded-full border-4 border-blue-400/30 group-hover:border-blue-400/50 overflow-hidden transition-all duration-500 shadow-lg"
                        style={{
                            backgroundImage: 'url("https://cdn4.vectorstock.com/i/1000x1000/65/38/creative-colorful-people-group-team-logo-vector-22436538.jpg")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        {/* Shine effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Online status indicator */}
                        <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-blue-900 animate-pulse"></div>
                    </div>

                    {/* Text Content */}
                    <div className="text-white flex flex-col space-y-2">
                        {/* Team name with gradient text */}
                        <h2 className="text-3xl font-bold leading-tight bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent">
                            Innovators Hub
                        </h2>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-1">
                            <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                                <FaFlask className="text-xs" /> AI & ML Research
                            </span>
                            <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                                <FaUniversity /> UTU
                            </span>
                            <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                                <FaUsers /> 8 Members
                            </span>
                        </div>

                        {/* Description with read more */}
                        <div className="relative">
                            <p className="text-gray-200 text-sm max-w-3xl mt-1 line-clamp-3">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quos ab tempore nihil dignissimos
                                libero esse nostrum blanditiis nemo quaerat. Neque facilis ipsum obcaecati quos recusandae. Et porro recusandae soluta.
                            </p>
                            <button className="text-blue-300 hover:text-blue-100 text-xs mt-1 flex items-center gap-1 transition-colors">
                                Read more <FaChevronDown className="text-xs" />
                            </button>
                        </div>

                        {/* Interactive buttons */}
                        <div className="flex gap-3 mt-4">
                            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2 group/btn">
                                <FaUserPlus className="transition-transform group-hover/btn:scale-110" />
                                Join Team
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2 group/btn">
                                <FaEye className="transition-transform group-hover/btn:scale-110" />
                                View Projects
                            </button>
                        </div>
                    </div>
                </div>

                {/* Floating action button */}
                <button className="absolute bottom-4 right-4 bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 z-20">
                    <FaStar className="text-lg" />
                </button>

                {/* Add to your CSS or style tag */}
                <style jsx>{`
    @keyframes float {
      0% { transform: translateY(0) translateX(0); }
      50% { transform: translateY(-20px) translateX(10px); }
      100% { transform: translateY(0) translateX(0); }
    }
  `}</style>
            </div>

            {/* Team Info */}
            <div className='relative bg-gradient-to-r from-slate-900 to-blue-900 p-6 min-h-48 rounded-2xl m-5 mt-7 shadow-xl overflow-hidden group transition-all duration-500 hover:shadow-[0_10px_30px_rgba(56,189,248,0.3)]'>
                {/* Animated background elements */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_rgba(56,189,248,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Section header */}
                <div className='relative z-10'>
                    <div className='flex items-center gap-3'>
                        <div className='bg-pink-600/20 p-2 rounded-lg'>
                            <FaUsers className='text-pink-400 text-xl' />
                        </div>
                        <h2 className='text-2xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent'>
                            Team Information
                        </h2>
                    </div>
                    <hr className='border-gray-700 mt-3 mb-6 group-hover:border-pink-500/50 transition-colors duration-500' />
                </div>

                {/* Information grid */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-white relative z-10'>
                    {/* Team Leader Column */}
                    <div className='space-y-5'>
                        <div className='bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 hover:border-pink-500/30 transition-all duration-300'>
                            <p className='text-gray-400 text-xs uppercase tracking-wider font-medium flex items-center gap-2'>
                                <FaCrown className='text-yellow-400' /> Team Leader
                            </p>
                            <div className='flex items-center gap-3 mt-2'>
                                <div className='w-10 h-10 rounded-full bg-blue-400 overflow-hidden'>
                                    <img
                                        src='https://randomuser.me/api/portraits/men/32.jpg'
                                        alt='Team Leader'
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                                <p className='text-lg font-medium'>Neil Sims</p>
                            </div>
                        </div>

                        <div className='bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 hover:border-pink-500/30 transition-all duration-300'>
                            <p className='text-gray-400 text-xs uppercase tracking-wider font-medium flex items-center gap-2'>
                                <FaEnvelope className='text-blue-400' /> Contact Email
                            </p>
                            <div className='mt-2 flex items-center gap-2'>
                                <p className='text-lg font-medium'>leader@innovatorshub.com</p>
                                <button className='text-blue-300 hover:text-blue-100 transition-colors'>
                                    <FaCopy className='text-sm' />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Team Size & University Column */}
                    <div className='space-y-5'>
                        <div className='bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 hover:border-pink-500/30 transition-all duration-300'>
                            <p className='text-gray-400 text-xs uppercase tracking-wider font-medium flex items-center gap-2'>
                                <FaUsers className='text-green-400' /> Total Members
                            </p>
                            <div className='mt-2 flex items-center justify-between'>
                                <p className='text-lg font-medium'>5 Members</p>
                                <div className='flex -space-x-2'>
                                    {[1, 2, 3, 4].map((_, i) => (
                                        <img
                                            key={i}
                                            src={`https://randomuser.me/api/portraits/${i % 2 ? 'men' : 'women'}/${30 + i}.jpg`}
                                            className='w-7 h-7 rounded-full border-2 border-slate-800'
                                            alt='Team member'
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className='bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 hover:border-pink-500/30 transition-all duration-300'>
                            <p className='text-gray-400 text-xs uppercase tracking-wider font-medium flex items-center gap-2'>
                                <FaUniversity className='text-purple-400' /> University
                            </p>
                            <div className='mt-2'>
                                <p className='text-lg font-medium'>MIT</p>
                                <p className='text-sm text-gray-300'>Computer Science</p>
                            </div>
                        </div>
                    </div>

                    {/* Team Status Column */}
                    <div className='space-y-5'>
                        <div className='bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 hover:border-pink-500/30 transition-all duration-300'>
                            <p className='text-gray-400 text-xs uppercase tracking-wider font-medium flex items-center gap-2'>
                                <FaMapMarkerAlt className='text-teal-400' /> Location Mode
                            </p>
                            <div className='mt-2 flex items-center gap-2'>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${teamInfo.locationMode === 'remote' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                    {teamInfo.locationMode === 'remote' ? '🌍 Remote' : '🏢 On-campus'}
                                </span>
                            </div>
                        </div>

                        <div className='bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 hover:border-pink-500/30 transition-all duration-300'>
                            <p className='text-gray-400 text-xs uppercase tracking-wider font-medium flex items-center gap-2'>
                                <FaCalendarAlt className='text-red-400' /> Founded On
                            </p>
                            <div className='mt-2 flex items-center gap-2'>
                                <p className='text-lg font-medium'>June 10, 2025</p>
                                <span className='text-xs bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded-full'>
                                    New
                                </span>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            {/* Member required and join team section */}
            <div className='flex flex-col bg-gradient-to-r from-slate-900 to-blue-900 p-5 backdrop-blur-md rounded-2xl m-5 mt-7'>

                <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3'>

                    <p className='text-pink-600 text-2xl'>🚀 Team is Hiring Members!</p>

                    <button className='bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md shadow-lg transition w-full md:w-auto'>
                        Join Team
                    </button>
                </div>

                <hr className='border-gray-300 mb-5' />

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-white'>

                    {/* Example Role Card */}
                    {
                        [1, 2, 3].map((card) =>

                            <div className='bg-white/7 backdrop-blur-5xl  rounded-xl p-4 shadow-md hover:scale-105 transition duration-300 space-y-3'>
                                <h3 className='text-xl font-semibold'>💻 Frontend Developer</h3>

                                <div>
                                    <p className='text-gray-400 text-sm'>Required Skills:</p>
                                    <div className='flex flex-wrap gap-2 mt-1 text-xs'>
                                        <span className='bg-white/10 px-2 py-0.5 rounded-full'>⚛️ React</span>
                                        <span className='bg-white/10 px-2 py-0.5 rounded-full'>🎨 Tailwind CSS</span>
                                        <span className='bg-white/10 px-2 py-0.5 rounded-full'>🔧 REST APIs</span>
                                    </div>
                                </div>

                                <p className='text-gray-300 text-sm'>We're looking for a passionate frontend developer to build interactive UIs for our AI project.</p>
                            </div>

                        )
                    }


                    {/* More Role Cards... */}

                </div>
            </div>

            {/* Team Projects section */}
            <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-blue-900 backdrop-blur-lg p-6 shadow-lg space-y-6">

                <div>
                    <h2 className="text-white text-2xl font-bold mb-2 tracking-wide">🚀 Projects</h2>

                </div>

                {/* Project Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Card - repeat as needed */}
                    {[1, 2, 3, 4, 5, 6].map((_, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 text-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:scale-[1.02] hover:shadow-2xl transition duration-300 space-y-4">

                            {/* Project Image */}
                            <img
                                src="https://images.unsplash.com/photo-1518770660439-4636190af475?fit=crop&w=600&q=80"
                                alt="Project Banner"
                                className="rounded-xl object-cover w-full h-40"
                            />

                            <div>
                                <h3 className="text-2xl font-bold">🚀 Project Name</h3>
                                <p className="text-gray-300 text-sm mt-1">A collaborative AI-based research platform</p>
                            </div>

                            <p className="text-gray-300 text-sm leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus perspiciatis aut
                                debitis modi, minus reprehenderit necessitatibus quae, tempora nihil facilis inventore.
                            </p>

                            <div className="flex flex-wrap gap-2 text-xs mt-2">
                                <span className="bg-blue-600/30 px-2 py-1 rounded-full">⚛️ React</span>
                                <span className="bg-orange-500/30 px-2 py-1 rounded-full">🔥 Firebase</span>
                                <span className="bg-green-500/30 px-2 py-1 rounded-full">🌱 Spring Boot</span>
                            </div>

                            <div className="flex gap-3 mt-3">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-md transition">
                                    View Details
                                </button>
                                <button className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-3 py-1 rounded-md transition">
                                    GitHub
                                </button>
                            </div>

                        </div>
                    ))}

                </div>
            </div>

            {/* Tem members */}
            <div className="mt-10 space-y-4  bg-gradient-to-r from-slate-900 to-blue-900 p-5 rounded-2xl">
                <h2 className="text-white text-2xl font-bold">👥 Team Members</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                    {[1, 2, 3, 4, 5, 6, 7, 8].map((_, idx) => (
                        <div
                            key={idx}
                            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl  p-4 text-white flex flex-col items-center text-center space-y-3 hover:scale-105 transition transform duration-300 ease-in-out shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]"
                        >
                            <img
                                src={`https://randomuser.me/api/portraits/${idx % 2 === 0 ? 'men' : 'women'}/${30 + idx}.jpg`}
                                alt="Member"
                                className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-md"
                            />

                            <h3 className="text-lg font-semibold">Neil Sims</h3>
                            <p className="text-sm text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, omnis!</p>

                            <div className="flex gap-2 text-xs text-gray-300">
                                <span className="bg-white/10 px-2 py-0.5 rounded-full">📧 neil@domain.com</span>
                                <span className="bg-white/10 px-2 py-0.5 rounded-full">🟢 Online</span>
                            </div>

                            <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md text-xs font-medium">
                                View Profile
                            </button>
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}
