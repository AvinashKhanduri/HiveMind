import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const TeamTable = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigator = useNavigate();
    const teams = [
        {
            teamName: 'Innovators Hub',
            teamLeader: 'Neil Sims',
            membersCount: 5,
            universityDept: 'MIT / Computer Science',
            focusArea: 'AI & ML Research',
            skillsNeeded: ['Data Scientist', 'ML Engineer'],
            achievements: ['🏆 Hackathon Winner', '🚀 MVP Built'],
            status: 'Recruiting',
            communication: 'Slack',
            locationMode: 'Remote',
            createdOn: '2025-06-10',
            tags: ['Hackathon', 'AI', 'Research'],
        },
        {
            teamName: 'Pixel Pioneers',
            teamLeader: 'Bonnie Green',
            membersCount: 4,
            universityDept: 'Stanford / Design Department',
            focusArea: 'UI/UX Design for Web Apps',
            skillsNeeded: ['Frontend Developer', 'UX Researcher'],
            achievements: ['🎨 Best UI Award'],
            status: 'Active',
            communication: 'Discord',
            locationMode: 'Hybrid',
            createdOn: '2025-06-15',
            tags: ['Startup', 'Design', 'Web'],
        },
        {
            teamName: 'SEO Syndicate',
            teamLeader: 'Leslie Livingston',
            membersCount: 3,
            universityDept: 'Harvard / Marketing',
            focusArea: 'SEO & Digital Marketing',
            skillsNeeded: ['Content Writer'],
            achievements: ['📈 Increased Traffic by 200%'],
            status: 'Full',
            communication: 'WhatsApp',
            locationMode: 'On-Campus',
            createdOn: '2025-06-20',
            tags: ['Research', 'Marketing'],
        }
    ];

    const filteredTeams = teams.filter((team) => {
        if (searchQuery.trim() == "") return true;
        else return team.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            team.teamLeader.toLowerCase().includes(searchQuery.toLowerCase())

    }


    );

    return (
        <div className="relative overflow-x-auto sm:rounded-lg shadow-xl">
            <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 mt-5 mb-3 mr-4 ml-4">
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search-users"
                        className="block p-2 ps-10 text-sm border border-gray-300 rounded-lg w-80 bg-gray-900 text-white focus:ring-blue-700 focus:border-blue-700"
                        placeholder="Team name or Leader name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-200 uppercase bg-gradient-to-r from-slate-900 to-blue-900 backdrop-blur-lg border-b border-gray-600">
                    <tr>
                        <th className="px-6 py-3 rounded-tl-lg">🧑‍💼 Team Name</th>
                        <th className="px-6 py-3">💼 Team Leader</th>
                        <th className="px-6 py-3">📋 Members Count</th>
                        <th className="px-6 py-3">⏰ University / Department</th>
                        <th className="px-6 py-3">🎯 Focus Area</th>
                        <th className="px-6 py-3">📌 Skills Needed</th>
                        <th className="px-6 py-3">🏆 Achievements</th>
                        <th className="px-6 py-3">📶 Status</th>
                      
                        <th className="px-6 py-3 rounded-tr-lg">⚙️ Details</th>

                    </tr>
                </thead>
                <tbody className="bg-gradient-to-r from-slate-900 to-blue-900">
                    {filteredTeams.map((team, index) => (
                        <tr key={index} className="border-b border-gray-600">
                            <td className="px-6 py-4 text-white font-medium whitespace-nowrap">
                                🧑‍💼 {team.teamName}
                            </td>
                            <td className="px-6 py-4 text-white">{team.teamLeader}</td>
                            <td className="px-6 py-4 text-white">{team.membersCount}</td>
                            <td className="px-6 py-4 text-white">{team.universityDept}</td>
                            <td className="px-6 py-4 text-white">{team.focusArea}</td>
                            <td className="px-6 py-4 text-white">
                                {team.skillsNeeded.map((skill, i) => (
                                    <span key={i} className="bg-gray-700 text-xs font-medium me-1 px-2.5 py-0.5 rounded">
                                        {skill}
                                    </span>
                                ))}
                            </td>
                            <td className="px-6 py-4 text-white">
                                {team.achievements.map((ach, i) => (
                                    <span key={i} className="block">{ach}</span>
                                ))}
                            </td>
                            <td className="px-6 py-4 text-white">{team.status}</td>
                          
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => navigator(`/teams-detail`)}
                                    className="font-medium text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-md px-3 py-1 hover:bg-white/20 flex items-center gap-1 transition"
                                >
                                    Details
                                </button>

                            </td>
                        </tr>
                    ))}

                    {filteredTeams.length === 0 && (
                        <tr>
                            <td colSpan="9" className="text-center py-4 text-white">
                                No Teams found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TeamTable;
