const EventCard = ({ title, date, type, summary, details,setOpen }) => (
  <div className="p-4 rounded-xl border border-white/30 bg-[#101828]/30 backdrop-blur-sm shadow-xl shadow-purple-800/20 transition-all duration-300 ease-in-out transform hover:scale-105">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <span className="text-sm bg-blue-600 px-2 py-1 rounded text-white">{type}</span>
    </div>
    <p className="text-sm text-gray-300 mb-1">{date}</p>
    <p className="text-sm text-gray-300">{summary}</p>

    <div className="mt-2">
      <p className="text-sm text-gray-400">{details}</p>
      <button onClick={()=>{setOpen(true)}} className="mt-3 px-4 py-2 text-sm rounded bg-blue-600 hover:bg-blue-700 transition">
        🔍 View Details
      </button>
    </div>
  </div>
);

export default EventCard;
