import { FaUser, FaUniversity, FaEdit, FaProjectDiagram, FaMapMarkerAlt, FaEnvelope, FaUserTie, FaClipboardList, FaGlobe, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

const EditProfilePage = ({ setIndex }) => {
    const navigate = useNavigate();
    const coverInputRef = useRef();
    const avatarInputRef = useRef();

    // Initial user data
    const [userData, setUserData] = useState({
        name: 'Alex Johnson',
        title: 'Full Stack Developer & AI Researcher',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        coverImage: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?fit=crop&w=1350&q=80',
        university: 'Massachusetts Institute of Technology',
        department: 'Computer Science & AI',
        bio: 'Passionate about building intelligent systems that solve real-world problems. Currently focused on NLP applications for education. Open to collaborations on innovative projects and research.',
        location: 'Boston, MA (Remote available)',
        email: 'alex.johnson@example.com',
        skills: [
            { name: 'React/Next.js', level: 90 },
            { name: 'Node.js', level: 85 },
            { name: 'Python', level: 95 },
            { name: 'Machine Learning', level: 88 }
        ],
        socialLinks: {
            github: 'github.com/alexjohnson',
            linkedin: 'linkedin.com/in/alexjohnson',
            twitter: 'twitter.com/alexjohnson',
            portfolio: 'alexjohnson.dev'
        },
        availability: 'Open for projects'
    });

    const [newSkill, setNewSkill] = useState({ name: '', level: 50 });
    const [isUploading, setIsUploading] = useState(false);

    // Clean up object URLs on unmount
    useEffect(() => {
        return () => {
            if (userData.avatar.startsWith('blob:')) {
                URL.revokeObjectURL(userData.avatar);
            }
            if (userData.coverImage.startsWith('blob:')) {
                URL.revokeObjectURL(userData.coverImage);
            }
        };
    }, [userData.avatar, userData.coverImage]);

    const triggerCoverInput = () => coverInputRef.current.click();
    const triggerAvatarInput = () => avatarInputRef.current.click();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSocialLinkChange = (platform, value) => {
        setUserData(prev => ({
            ...prev,
            socialLinks: { ...prev.socialLinks, [platform]: value }
        }));
    };

    const handleSkillChange = (index, field, value) => {
        const updatedSkills = [...userData.skills];
        updatedSkills[index][field] = field === 'level' ? parseInt(value) : value;
        setUserData(prev => ({ ...prev, skills: updatedSkills }));
    };

    const addSkill = () => {
        if (newSkill.name.trim()) {
            setUserData(prev => ({
                ...prev,
                skills: [...prev.skills, { ...newSkill }]
            }));
            setNewSkill({ name: '', level: 50 });
        }
    };

    const removeSkill = (index) => {
        setUserData(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }));
    };

    const handleImageUpload = async (e, type) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Reset input to allow re-uploading same file
        e.target.value = '';

        // Validate file
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file (JPEG, PNG, etc.)');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            alert('Image size should be less than 5MB');
            return;
        }

        setIsUploading(true);
        try {
            // Simulate upload (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Create preview URL
            const imageUrl = URL.createObjectURL(file);
            setUserData(prev => ({ ...prev, [type]: imageUrl }));
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Saving profile:', userData);
        setIndex(0); // Redirect back to profile
    };

    return (
        <div className="space-y-6 pb-10">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Edit Profile</h1>
                <button
                    onClick={() => setIndex(0)}
                    className="text-gray-400 hover:text-white"
                >
                    Cancel
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Cover Image Section */}
              <div className="relative rounded-2xl overflow-hidden h-48 bg-slate-800">
  {/* Cover Image */}
  <img 
    src={userData.coverImage} 
    alt="Cover" 
    className="w-full h-full object-cover"
  />
  
  {/* Cover Image Upload Section - positioned top-right */}
  <div className="absolute top-4 right-4 z-10">
    <input
      ref={coverInputRef}
      type="file"
      accept="image/*"
      onChange={(e) => handleImageUpload(e, 'coverImage')}
      className="hidden"
    />
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="button"
      onClick={triggerCoverInput}
      className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-lg border border-white/20 flex items-center gap-2 cursor-pointer"
      disabled={isUploading}
    >
      {isUploading ? 'Uploading...' : 'Change Cover'}
    </motion.button>
  </div>
</div>

                {/* Avatar Section - fixed positioning */}
                <div className="relative flex items-end -mt-16 px-6 z-20"> {/* Increased z-index */}
                    <div className="relative group">
                        <img
                            src={userData.avatar}
                            alt="Avatar"
                            className="w-32 h-32 rounded-2xl border-4 border-slate-800 object-cover"
                        />
                        <input
                            ref={avatarInputRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'avatar')}
                            className="hidden"
                        />
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={triggerAvatarInput}
                            className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
                            disabled={isUploading}
                        >
                            <FaEdit size={12} />
                        </motion.button>
                    </div>
                </div>

                {/* Main Form Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Basic Info */}
                        <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-6 shadow-xl shadow-blue-900/20 border border-white/10">
                            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                                <FaUserTie className="text-blue-400" />
                                Basic Information
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={userData.name}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Title/Headline</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={userData.title}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Bio</label>
                                    <textarea
                                        name="bio"
                                        value={userData.bio}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Education & Location */}
                        <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-6 shadow-xl shadow-blue-900/20 border border-white/10">
                            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                                <FaUniversity className="text-purple-400" />
                                Education & Location
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">University</label>
                                    <input
                                        type="text"
                                        name="university"
                                        value={userData.university}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Department</label>
                                    <input
                                        type="text"
                                        name="department"
                                        value={userData.department}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={userData.location}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Availability</label>
                                    <select
                                        name="availability"
                                        value={userData.availability}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Open for projects">Open for projects</option>
                                        <option value="Available part-time">Available part-time</option>
                                        <option value="Not currently available">Not currently available</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Skills Section */}
                        <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-6 shadow-xl shadow-blue-900/20 border border-white/10">
                            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                                <FaClipboardList className="text-orange-400" />
                                Skills
                            </h2>

                            <div className="space-y-4">
                                {userData.skills.map((skill, index) => (
                                    <div key={index} className="group relative">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={skill.name}
                                                onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                                                className="flex-1 bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeSkill(index)}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={skill.level}
                                                onChange={(e) => handleSkillChange(index, 'level', e.target.value)}
                                                className="w-full"
                                            />
                                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                                <span>0%</span>
                                                <span>{skill.level}%</span>
                                                <span>100%</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="border-t border-white/10 pt-4">
                                    <h3 className="text-sm font-medium text-gray-400 mb-2">Add New Skill</h3>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newSkill.name}
                                            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                                            placeholder="Skill name"
                                            className="flex-1 bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={addSkill}
                                            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact & Social Links */}
                        <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-6 shadow-xl shadow-blue-900/20 border border-white/10">
                            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                                <FaEnvelope className="text-pink-400" />
                                Contact & Social Links
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                            <FaGithub />
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                value={userData.socialLinks.github}
                                                onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                                                placeholder="github.com/username"
                                                className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                            <FaLinkedin />
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                value={userData.socialLinks.linkedin}
                                                onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                                                placeholder="linkedin.com/in/username"
                                                className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-sky-500/10 rounded-lg text-sky-400">
                                            <FaTwitter />
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                value={userData.socialLinks.twitter}
                                                onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                                                placeholder="twitter.com/username"
                                                className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                                            <FaGlobe />
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                value={userData.socialLinks.portfolio}
                                                onChange={(e) => handleSocialLinkChange('portfolio', e.target.value)}
                                                placeholder="yourportfolio.com"
                                                className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="mt-6 flex justify-end">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="bg-gradient-to-r from-blue-600 to-pink-600 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-blue-600/30 transition-all"
                    >
                        Save Changes
                    </motion.button>
                </div>
            </form>
        </div>
    );
};

export default EditProfilePage;