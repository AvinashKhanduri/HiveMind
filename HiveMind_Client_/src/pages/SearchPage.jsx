// import React, { useState } from 'react';
// import { FiSearch, FiX, FiFilter, FiChevronDown, FiClock, FiStar, FiTrendingUp } from 'react-icons/fi';

// const SearchPage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [filtersOpen, setFiltersOpen] = useState(false);
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [recentSearches, setRecentSearches] = useState(['UI Design', 'Authentication', 'Dashboard Components']);

//   const mockResults = [
//     {
//       id: 1,
//       type: 'task',
//       title: 'Implement user authentication',
//       project: 'Campus Connect',
//       status: 'in_progress',
//       lastUpdated: '2 hours ago',
//       starred: true
//     },
//     {
//       id: 2,
//       type: 'document',
//       title: 'Project Requirements.pdf',
//       project: 'Campus Connect',
//       lastUpdated: '1 day ago',
//       starred: false
//     },
//     {
//       id: 3,
//       type: 'discussion',
//       title: 'UI Design Feedback',
//       project: 'Campus Connect',
//       lastUpdated: '3 days ago',
//       starred: true
//     },
//     {
//       id: 4,
//       type: 'task',
//       title: 'Dashboard redesign',
//       project: 'Admin Portal',
//       status: 'todo',
//       lastUpdated: '1 week ago',
//       starred: false
//     },
//   ];

//   const handleSearch = (e) => {
//     e.preventDefault();
//     const filtered = mockResults.filter(item =>
//       item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.project.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setSearchResults(filtered);
//   };

//   return (
//     <div className="min-h-screen bg-[#121212] text-white px-6 py-10">
//       <h1 className="text-2xl font-semibold mb-6">Search</h1>

//       {/* Search Bar */}
//       <form onSubmit={handleSearch} className="relative mb-6">
//         <div className="flex items-center border border-gray-700 rounded-lg px-4 py-2 bg-[#1e1e1e] focus-within:ring-2 focus-within:ring-indigo-500">
//           <FiSearch className="text-gray-400 mr-2" />
//           <input
//             type="text"
//             placeholder="Search tasks, documents, or discussions..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full bg-transparent text-sm placeholder-gray-400 focus:outline-none"
//           />
//           {searchQuery && (
//             <button type="button" onClick={() => setSearchQuery('')} className="text-gray-500 :text-white transition">
//               <FiX />
//             </button>
//           )}
//         </div>
//       </form>

//       {/* Recent Searches */}
//       {recentSearches.length > 0 && (
//         <div className="mb-6">
//           <p className="text-sm text-gray-400 mb-2">Recent Searches:</p>
//           <div className="flex gap-2 flex-wrap">
//             {recentSearches.map((term, idx) => (
//               <button
//                 key={idx}
//                 className="bg-gray-800 :bg-gray-700 px-3 py-1 rounded-full text-xs transition"
//                 onClick={() => setSearchQuery(term)}
//               >
//                 {term}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Filters Toggle */}
//       <div className="flex items-center justify-between mb-4">
//         <button
//           className="flex items-center gap-2 text-sm text-gray-400 :text-white"
//           onClick={() => setFiltersOpen(!filtersOpen)}
//         >
//           <FiFilter /> Filters <FiChevronDown className={`transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
//         </button>
//         <div className="flex items-center gap-4 text-sm">
//           <button
//             onClick={() => setActiveFilter('recent')}
//             className={`flex items-center gap-1 ${activeFilter === 'recent' ? 'text-indigo-400' : 'text-gray-400'} :text-white`}
//           >
//             <FiClock /> Recent
//           </button>
//           <button
//             onClick={() => setActiveFilter('starred')}
//             className={`flex items-center gap-1 ${activeFilter === 'starred' ? 'text-indigo-400' : 'text-gray-400'} :text-white`}
//           >
//             <FiStar /> Starred
//           </button>
//           <button
//             onClick={() => setActiveFilter('popular')}
//             className={`flex items-center gap-1 ${activeFilter === 'popular' ? 'text-indigo-400' : 'text-gray-400'} :text-white`}
//           >
//             <FiTrendingUp /> Popular
//           </button>
//         </div>
//       </div>

//       {/* Search Results */}
//       <div className="space-y-4">
//         {searchResults.length === 0 ? (
//           <p className="text-gray-500 text-sm">No results found. Try a different keyword.</p>
//         ) : (
//           searchResults.map((item) => (
//             <div key={item.id} className="bg-[#1e1e1e] border border-gray-700 rounded-lg p-4 :border-indigo-500 transition">
//               <div className="flex justify-between items-center mb-1">
//                 <h2 className="text-lg font-medium">{item.title}</h2>
//                 {item.starred && <FiStar className="text-yellow-400" />}
//               </div>
//               <p className="text-sm text-gray-400">{item.project}</p>
//               <p className="text-xs text-gray-500 mt-1">{item.lastUpdated}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchPage;


import { FiSearch, FiX, FiFilter, FiChevronDown, FiClock, FiStar, FiTrendingUp } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [recentSearches, setRecentSearches] = useState(['UI Design', 'Authentication', 'Dashboard Components']);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const searchInputRef = useRef(null);

  // Mock search results
  const mockResults = [
    {
      id: 1,
      type: 'task',
      title: 'Implement user authentication',
      project: 'Campus Connect',
      status: 'in_progress',
      lastUpdated: '2 hours ago',
      starred: true,
      preview: 'Need to implement JWT authentication for the mobile app backend',
      tags: ['backend', 'security', 'priority']
    },
    {
      id: 2,
      type: 'document',
      title: 'Project Requirements.pdf',
      project: 'Campus Connect',
      lastUpdated: '1 day ago',
      starred: false,
      preview: 'Finalized project requirements document with client sign-off',
      tags: ['requirements', 'pdf']
    },
    {
      id: 3,
      type: 'discussion',
      title: 'UI Design Feedback',
      project: 'Campus Connect',
      lastUpdated: '3 days ago',
      starred: true,
      preview: 'Team discussion about the new dashboard design concepts',
      tags: ['design', 'feedback']
    },
    {
      id: 4,
      type: 'task',
      title: 'Dashboard redesign',
      project: 'Admin Portal',
      status: 'todo',
      lastUpdated: '1 week ago',
      starred: false,
      preview: 'Redesign admin dashboard to include new analytics widgets',
      tags: ['frontend', 'design']
    },
  ];

  // Handle search with debounce
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      setIsTyping(false);
      const results = mockResults.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSearchResults(results);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsTyping(true);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    searchInputRef.current.focus();
  };

  const toggleStar = (id) => {
    setSearchResults(prev => prev.map(item => 
      item.id === id ? {...item, starred: !item.starred} : item
    ));
  };

  const removeRecentSearch = (search, e) => {
    e.stopPropagation();
    setRecentSearches(prev => prev.filter(s => s !== search));
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown' && searchResults.length > 0) {
      e.preventDefault();
      const nextIndex = selectedResult === null ? 0 : Math.min(selectedResult + 1, searchResults.length - 1);
      setSelectedResult(nextIndex);
    } else if (e.key === 'ArrowUp' && searchResults.length > 0) {
      e.preventDefault();
      const nextIndex = selectedResult === null ? searchResults.length - 1 : Math.max(selectedResult - 1, 0);
      setSelectedResult(nextIndex);
    } else if (e.key === 'Enter' && selectedResult !== null) {
      // Handle opening the selected result
      console.log('Opening:', searchResults[selectedResult]);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-6xl mx-auto animate-fadeIn">
        {/* Animated Search Header */}
        <div className="relative z-10 transform transition-all duration-500 :scale-[1.01]">
          <h1 className="text-3xl font-bold text-white mb-2 bg-clip-text  bg-gradient-to-r from-blue-300 to-purple-300">
            Discover Your Projects
          </h1>
          <p className="text-gray-300 mb-8 animate-pulse-slow">
            Find anything across all your workspaces with smart search
          </p>
          
          {/* Interactive Search Bar */}
          <div className="relative mb-8 group">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400 group-:text-blue-300 transition-colors" />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  className="bg-gray-800/70 border border-gray-700/50 text-white text-lg rounded-xl pl-12 pr-12 py-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm transition-all duration-300 group-:shadow-lg group-:border-blue-400/30"
                  placeholder="Search tasks, documents, projects..."
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-16 flex items-center pr-3 text-gray-400 :text-white transition-colors transform :scale-110"
                  >
                    <FiX size={20} />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 rounded-r-xl font-medium flex items-center :from-blue-500 :to-blue-600 transition-all duration-300 group-:shadow-blue-500/20 shadow-md"
                >
                  {isTyping ? (
                    <span className="flex items-center">
                      <span className="animate-pulse">Searching</span>
                      <span className="loading-dots ml-1">
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                      </span>
                    </span>
                  ) : (
                    'Search'
                  )}
                </button>
              </div>
            </form>

            {/* Animated search suggestions */}
            {!searchQuery && (
              <div className="absolute left-12 right-0 top-full mt-2 opacity-0 group-:opacity-100 transition-opacity duration-500">
                <div className="text-sm text-gray-400 flex space-x-4">
                  <span className="flex items-center">
                    <FiTrendingUp className="mr-1 text-blue-300" />
                    Try: "dashboard"
                  </span>
                  <span className="flex items-center">
                    <FiTrendingUp className="mr-1 text-blue-300" />
                    Or: "user auth"
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content with Floating Effect */}
        <div className="flex flex-col lg:flex-row gap-6 transform transition-all duration-700 :translate-y-[-5px]">
          {/* Filters Sidebar - Now with 3D tilt effect */}
       

          {/* Search Results with advanced interactions */}
          <div className="flex-1">
            {searchResults.length > 0 ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-white font-medium">
                    {searchResults.length} results for "{searchQuery}"
                  </h3>
                  <div className="text-sm text-gray-400 flex items-center">
                    <span>Sorted by:</span>
                    <button className="ml-1 text-white flex items-center :text-blue-300 transition-colors">
                      Relevance <FiChevronDown className="ml-1" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.map((result, index) => (
                    <div 
                      key={result.id}
                      className={`bg-gray-800/50 :bg-gray-700/70 backdrop-blur-lg rounded-xl border border-white/5 p-5 transition-all duration-300 :shadow-xl :border-blue-400/30 group cursor-pointer transform :-translate-y-1 ${
                        selectedResult === index ? 'ring-2 ring-blue-400 scale-[1.02]' : ''
                      }`}
                      onClick={() => setSelectedResult(index)}
                      onMouseEnter={() => setSelectedResult(index)}
                    >
                      <div className="flex justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              result.type === 'task' ? 'bg-blue-900/50 text-blue-300' :
                              result.type === 'document' ? 'bg-purple-900/50 text-purple-300' :
                              'bg-green-900/50 text-green-300'
                            } group-:shadow-md transition-shadow`}>
                              {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                            </span>
                            <span className="text-sm text-gray-400 group-:text-white transition-colors">
                              {result.project}
                            </span>
                          </div>
                          <h4 className="text-lg font-medium text-white group-:text-blue-300 transition-colors">
                            {result.title}
                          </h4>
                          <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                            {result.preview}
                          </p>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStar(result.id);
                          }}
                          className="text-gray-400 :text-yellow-400 transition-colors transform :scale-125"
                        >
                          <FiStar className={result.starred ? 'fill-yellow-400 text-yellow-400' : ''} />
                        </button>
                      </div>

                      <div className="flex items-center mt-4 text-sm text-gray-400">
                        <FiClock className="mr-1 group-:text-blue-300 transition-colors" />
                        <span className="mr-4 group-:text-white transition-colors">
                          Updated {result.lastUpdated}
                        </span>
                        {result.type === 'task' && (
                          <>
                            <div className={`w-2 h-2 rounded-full mr-1 ${
                              result.status === 'todo' ? 'bg-gray-500 group-:bg-blue-400' :
                              result.status === 'in_progress' ? 'bg-yellow-500 group-:bg-yellow-400' :
                              'bg-green-500 group-:bg-green-400'
                            } transition-colors`}></div>
                            <span className="capitalize group-:text-white transition-colors">
                              {result.status.replace('_', ' ')}
                            </span>
                          </>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {result.tags.map((tag, i) => (
                          <span 
                            key={i}
                            className="text-xs px-2 py-1 rounded-full bg-gray-700/50 text-gray-300 group-:bg-gray-600/70 group-:text-white transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-white/10 p-12 text-center transform transition-all duration-700 :shadow-2xl">
                <div className="max-w-md mx-auto">
                  <div className="relative inline-block mb-6">
                    <FiSearch size={48} className="mx-auto text-gray-500" />
                    <div className="absolute -inset-2 bg-blue-500/10 rounded-full animate-pulse-slow opacity-0 group-:opacity-100 transition-opacity"></div>
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">
                    {searchQuery ? 'No results found' : 'Start exploring your projects'}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {searchQuery 
                      ? 'Try different keywords or adjust your filters'
                      : 'Search for tasks, documents, and discussions across all your projects'
                    }
                  </p>
                  {!searchQuery && (
                    <div className="space-y-3 text-left max-w-xs mx-auto">
                      <p className="text-sm text-gray-400 flex items-center gap-2 px-4 py-2 rounded-lg :bg-gray-700/50 transition-colors cursor-pointer">
                        <FiTrendingUp className="text-blue-400 animate-bounce" /> 
                        Try: "dashboard components"
                      </p>
                      <p className="text-sm text-gray-400 flex items-center gap-2 px-4 py-2 rounded-lg :bg-gray-700/50 transition-colors cursor-pointer">
                        <FiTrendingUp className="text-blue-400 animate-bounce delay-100" /> 
                        Or: "user authentication flow"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating action button */}
      {searchResults.length > 0 && (
        <div className="fixed bottom-8 right-8">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-2xl :shadow-blue-500/40 transition-all duration-300 transform :scale-110 flex items-center justify-center">
            <FiFilter size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;