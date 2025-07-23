const JoinUsSection = () => {
  return (
    <section className="py-12 px-4 mt-5 text-white bg-gradient-to-b from-slate-900 to-blue-950 rounded-xl shadow-lg flex-1">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">📢 Don’t Miss the Next Big Project</h2>
        <p className="text-gray-300 mb-6">Stay updated with exciting projects, team invites, and hackathons. Join our community today!</p>

        {/* Option 1: Email + Join */}
        {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-2/3 px-4 py-3 rounded-lg bg-white/10 text-white placeholder:text-gray-400 border border-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-300 font-semibold">
            Join
          </button>
        </div> */}

        {/* Option 2: Join Community button only */}
        
        <button className="mt-6 px-8 py-3 rounded-lg border border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white transition duration-300 font-semibold backdrop-blur-md">
  🔐 Log In to Get Started
</button>

       
      </div>
    </section>
  );
};

export default JoinUsSection;
