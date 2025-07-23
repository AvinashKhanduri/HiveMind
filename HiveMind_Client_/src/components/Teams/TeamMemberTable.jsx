import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const TeamMemberTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigator = useNavigate();
  const members = [
    {
      name: 'Neil Sims',
      email: 'neil.sims@flowbite.com',
      position: 'React Developer',
      status: 'Online',
      statusColor: 'bg-green-500',
      img: 'https://randomuser.me/api/portraits/men/32.jpg',
      task: 'Build Login Page',
      deadline: '2025-07-01',
    },
    {
      name: 'Bonnie Green',
      email: 'bonnie@flowbite.com',
      position: 'Designer',
      status: 'Online',
      statusColor: 'bg-green-500',
      img: 'https://randomuser.me/api/portraits/women/44.jpg',
      task: 'Create Dashboard UI',
      deadline: '2025-07-03',
    },
    {
      name: 'Leslie Livingston',
      email: 'leslie@flowbite.com',
      position: 'SEO Specialist',
      status: 'Offline',
      statusColor: 'bg-red-500',
      img: 'https://randomuser.me/api/portraits/women/65.jpg',
      task: 'Optimize Landing Page SEO',
      deadline: '2025-07-05',
    }
  ];

  const filteredMembers = members.filter((user) =>{
    if(searchQuery.trim()=="") return true;
      else return  user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
      
      
      
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
            placeholder="Search for users"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-200 uppercase bg-gradient-to-r from-slate-900 to-blue-900 backdrop-blur-lg border-b border-gray-600">
          <tr>
            <th className="px-6 py-3 rounded-tl-lg">🧑‍💼 Name</th>
            <th className="px-6 py-3">💼 Role</th>
            <th className="px-6 py-3">📋 Task</th>
            <th className="px-6 py-3">⏰ Deadline</th>
            <th className="px-6 py-3">📶 Status</th>
            <th className="px-6 py-3 rounded-tr-lg">⚙️ Action</th>
          </tr>
        </thead>
        <tbody className="bg-gradient-to-r from-slate-900 to-blue-900">
          {filteredMembers.map((user, index) => (
            <tr key={index} className="border-b border-gray-600">
              <th className="flex items-center px-6 py-4 font-medium text-white whitespace-nowrap">
                <img className="w-10 h-10 rounded-full" src={user.img} alt={`${user.name} image`} />
                <div className="ps-3">
                  <div className="text-base font-semibold">{user.name}</div>
                  <div className="font-normal text-gray-400">{user.email}</div>
                </div>
              </th>
              <td className="px-6 py-4 text-white">{user.position}</td>
              <td className="px-6 py-4 text-white">{user.task}</td>
              <td className="px-6 py-4 text-white">{user.deadline}</td>
              <td className="px-6 py-4 text-white">
                <div className="flex items-center">
                  <div className={`h-2.5 w-2.5 rounded-full ${user.statusColor} me-2`}></div>
                  {user.status}
                </div>
              </td>
              <td className="px-6 py-4">
                <a onClick={()=>navigator("/edit-member")} className="font-medium text-blue-500 hover:underline flex items-center gap-1">
                  ✏️ Edit User
                </a>
              </td>
            </tr>
          ))}
          {filteredMembers.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-4 text-white">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeamMemberTable;
