const TeamsAndProjects = ()=>{
    return(
        <>
            <div className=" flex  gap-6  flex-wrap ">
                {/* box 1 */}
                <div class=" max-w-3xl rounded-2xl bg-gradient-to-r from-slate-900  to-blue-900   backdrop-blur-lg  p-6 flex-2">
                    <h2 class="text-white text-xl font-semibold mb-4"> 👥 Meet the Minds Behind the Mission</h2>

                    <div class="w-full  rounded-2xl bg-[#101828]/80 backdrop-blur-lg shadow-xl shadow-purple-800/40 p-6 flex justify-between mb-4  transition hover:shadow-lg hover:scale-[1.02] duration-300 space-y-2">
                        <div className=" flex flex-col gap-2 text-[14px] justify-center text-white">
                            <div class="space-y-2 text-white">
                                <p class="text-lg font-semibold">Team Name</p>
                                <p><span class="font-medium text-gray-300">Team Leader:</span> Unknown</p>
                                <p><span class="font-medium text-gray-300">Email:</span> unknown@gmail.com</p>
                                <p><span class="font-medium text-gray-300">College/University/Organization:</span> Unknown</p>
                            </div>
                        </div>
                        <button class="border border-white text-white px-4 py-2 h-10 rounded-md hover:bg-white hover:text-black transition">
                            Join
                        </button>
                    </div>

                    <div class="w-full  rounded-2xl bg-[#101828]/80 backdrop-blur-lg shadow-xl shadow-purple-800/40 p-6 flex justify-between mb-4  transition hover:shadow-lg hover:scale-[1.02] duration-300 space-y-2">
                        <div className=" flex flex-col gap-2 text-[14px] justify-center text-white">
                            <div class="space-y-2 text-white">
                                <p class="text-lg font-semibold">Team Name</p>
                                <p><span class="font-medium text-gray-300">Team Leader:</span> Unknown</p>
                                <p><span class="font-medium text-gray-300">Email:</span> unknown@gmail.com</p>
                                <p><span class="font-medium text-gray-300">College/University/Organization:</span> Unknown</p>
                            </div>
                        </div>
                        <button class="border border-white text-white px-4 py-2 h-10 rounded-md hover:bg-white hover:text-black transition">
                            Join
                        </button>
                    </div>
                    <div class="w-full  rounded-2xl bg-[#101828]/80 backdrop-blur-lg shadow-xl shadow-purple-800/40 p-6 flex justify-between mb-4  transition hover:shadow-lg hover:scale-[1.02] duration-300 space-y-2">
                        <div className=" flex flex-col gap-2 text-[14px] justify-center text-white">
                            <div class="space-y-2 text-white">
                                <p class="text-lg font-semibold">Team Name</p>
                                <p><span class="font-medium text-gray-300">Team Leader:</span> Unknown</p>
                                <p><span class="font-medium text-gray-300">Email:</span> unknown@gmail.com</p>
                                <p><span class="font-medium text-gray-300">College/University/Organization:</span> Unknown</p>
                            </div>
                        </div>
                        <button class="border border-white text-white px-4 py-2 h-10 rounded-md hover:bg-white hover:text-black transition">
                            Join
                        </button>
                    </div>
                    <div class="w-full  rounded-2xl bg-[#101828]/80 backdrop-blur-lg shadow-xl shadow-purple-800/40 p-6 flex justify-between mb-4  transition hover:shadow-lg hover:scale-[1.02] duration-300 space-y-2">
                        <div className=" flex flex-col gap-2 text-[14px] justify-center text-white">
                            <div class="space-y-2 text-white">
                                <p class="text-lg font-semibold">Team Name</p>
                                <p><span class="font-medium text-gray-300">Team Leader:</span> Unknown</p>
                                <p><span class="font-medium text-gray-300">Email:</span> unknown@gmail.com</p>
                                <p><span class="font-medium text-gray-300">College/University/Organization:</span> Unknown</p>
                            </div>
                        </div>
                        <button class="border border-white text-white px-4 py-2 h-10 rounded-md hover:bg-white hover:text-black transition">
                            Join
                        </button>
                    </div>
                    

                    <p className=" text-md text-white text-end hover:cursor-pointer">See All...</p>

                </div>

                {/* box 2 */}
                <div class="max-w-3xl rounded-2xl bg-gradient-to-r from-slate-900 to-blue-900 backdrop-blur-lg p-6 flex-1 shadow-lg">
                    <h2 class="text-white text-2xl font-bold mb-2 tracking-wide">
                        🚀 Build with the Best
                    </h2>
                    <p class="text-blue-100 text-base">
                        Discover popular projects that welcome your contributions — start coding, collaborating, and making an impact.
                    </p>

                    {/* project cards */}
                    <div class="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-white shadow-md transition hover:shadow-lg hover:scale-[1.02] duration-300 space-y-2 mt-3">
                        <h3 class="text-lg font-semibold">🚀 Project1</h3>
                        <p class="text-sm text-gray-200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, libero.</p>
                        <div class="flex flex-wrap gap-2 text-sm">
                            <span class="bg-white/10 px-2 py-0.5 rounded-full">⚛️ React</span>
                            <span class="bg-white/10 px-2 py-0.5 rounded-full">🔥 Firebase</span>
                            <span class="bg-white/10 px-2 py-0.5 rounded-full">🌱 Spring Boot</span>
                        </div>
                        <p class="text-xs text-gray-400">👥 By: Team</p>
                    </div>

                    {/* project cards */}
                    <div class="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-white shadow-md transition hover:shadow-lg hover:scale-[1.02] duration-300 space-y-2 mt-3">
                        <h3 class="text-lg font-semibold">🚀 Project1</h3>
                        <p class="text-sm text-gray-200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, libero.</p>
                        <div class="flex flex-wrap gap-2 text-sm">
                            <span class="bg-white/10 px-2 py-0.5 rounded-full">⚛️ React</span>
                            <span class="bg-white/10 px-2 py-0.5 rounded-full">🔥 Firebase</span>
                            <span class="bg-white/10 px-2 py-0.5 rounded-full">🌱 Spring Boot</span>
                        </div>
                        <p class="text-xs text-gray-400">👥 By: Team</p>
                    </div>

                    {/* project cards */}
                    <div class="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-white shadow-md transition hover:shadow-lg hover:scale-[1.02] duration-300 space-y-2 mt-3">
                        <h3 class="text-lg font-semibold">🚀 Project1</h3>
                        <p class="text-sm text-gray-200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, libero.</p>
                        <div class="flex flex-wrap gap-2 text-sm">
                            <span class="bg-white/10 px-2 py-0.5 rounded-full">⚛️ React</span>
                            <span class="bg-white/10 px-2 py-0.5 rounded-full">🔥 Firebase</span>
                            <span class="bg-white/10 px-2 py-0.5 rounded-full">🌱 Spring Boot</span>
                        </div>
                        <p class="text-xs text-gray-400">👥 By: Team</p>
                    </div>

                    {/* project cards */}
                    <div class="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-white shadow-md transition hover:shadow-lg hover:scale-[1.02] duration-300 space-y-2 mt-3">
                        <h3 class="text-lg font-semibold">🚀 Project1</h3>
                        <p class="text-sm text-gray-200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, libero.</p>
                        <div class="flex flex-wrap gap-2 text-sm">
                            <span class="bg-white/10 px-2 py-0.5 rounded-full">⚛️ React</span>
                            <span class="bg-white/10 px-2 py-0.5 rounded-full">🔥 Firebase</span>
                            <span class="bg-white/10 px-2 py-0.5 rounded-full">🌱 Spring Boot</span>
                        </div>
                        <p class="text-xs text-gray-400">👥 By: Team</p>
                    </div>

                    

                </div>

            </div>
        </>
    )
}

export default TeamsAndProjects;