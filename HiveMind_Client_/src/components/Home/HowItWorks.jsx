const HowItWorks = () => {
    return (
        <>
            <section className="py-12 px-4 text-white bg-gradient-to-b from-slate-900 to-blue-950 rounded-xl mt-5">
                <h2 className="text-2xl font-bold text-center mb-8">🚀 How It Works</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {/* Step 1 */}
                    <div className="group bg-white/5 backdrop-blur-md p-4 rounded-lg text-center border border-white/10 shadow-sm overflow-hidden max-h-48 hover:max-h-72 transition-all duration-500 ease-in-out">
                        <p className="text-xs text-blue-400 font-semibold uppercase tracking-wide mb-1 text-start">Step 1</p>
                        <div className="text-3xl mb-2">👤</div>
                        <h3 className="font-semibold text-lg mb-1">Sign Up</h3>
                        <p className="text-sm text-gray-300">Create your account and personalize your profile.</p>

                        {/* Hidden detail shown on hover */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2">
                            <p className="text-sm text-gray-400">
                                Set your interests, upload a profile picture, and get recommendations for teams and projects.
                            </p>
                        </div>
                    </div>



                    {/* Step 2 */}
                    <div className="group bg-white/5 backdrop-blur-md p-4 rounded-lg text-center border border-white/10 shadow-sm overflow-hidden max-h-48 hover:max-h-72 transition-all duration-500 ease-in-out">
                        <p className="text-xs text-blue-400 font-semibold uppercase tracking-wide mb-1 text-start">Step 2</p>
                        <div className="text-3xl mb-2">👥</div>
                        <h3 className="font-semibold text-lg mb-1">Join or Create a Team</h3>
                        <p className="text-sm text-gray-300">Find teams or start one to begin collaborating.</p>

                        {/* Hidden detail */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2">
                            <p className="text-sm text-gray-400">
                                Browse public teams or invite friends to start your own — set team goals, roles, and more.
                            </p>
                        </div>
                    </div>



                    {/* Step 3 */}
                    <div className="group bg-white/5 backdrop-blur-md p-4 rounded-lg text-center border border-white/10 shadow-sm overflow-hidden max-h-48 hover:max-h-72 transition-all duration-500 ease-in-out">
                        <p className="text-xs text-blue-400 font-semibold uppercase tracking-wide mb-1 text-start">Step 3</p>
                        <div className="text-3xl mb-2">🛠️</div>
                        <h3 className="font-semibold text-lg mb-1">Contribute to Projects</h3>
                        <p className="text-sm text-gray-300">Collaborate on real-world ideas with your team.</p>

                        {/* Hidden detail */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2">
                            <p className="text-sm text-gray-400">
                                Work on tasks, track progress, and grow your skills while contributing to meaningful work.
                            </p>
                        </div>
                    </div>



                    {/* Step 4 */}
                    <div className="group bg-white/5 backdrop-blur-md p-4 rounded-lg text-center border border-white/10 shadow-sm overflow-hidden max-h-48 hover:max-h-72 transition-all duration-500 ease-in-out">
                        <p className="text-xs text-blue-400 font-semibold uppercase tracking-wide mb-1 text-start">Step 4</p>
                        <div className="text-3xl mb-2">🏆</div>
                        <h3 className="font-semibold text-lg mb-1">Join Hackathons</h3>
                        <p className="text-sm text-gray-300">Compete in exciting coding and non-coding events.</p>

                        {/* Hidden detail */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2">
                            <p className="text-sm text-gray-400">
                                Showcase your teamwork, solve real problems, and win rewards — or just have fun building.
                            </p>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default HowItWorks;
