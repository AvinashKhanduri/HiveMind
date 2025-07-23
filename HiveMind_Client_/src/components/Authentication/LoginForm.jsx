const LoginForm = ({setPageIndex})=>{
    const handleSubmit = ()=>{
        setPageIndex(0);
    }
    return(
        <>
            <form onSubmit={handleSubmit} className=" w-[40vw]">

                    <div>
                        <p className=" font-bold text-3xl mb-3 text-center">Nice to see you!</p>
                        <p className=" mb-10 text-center">Enter your email and password to sign in</p>
                    </div>

                    <div className="relative mb-6">
                        <label className="flex  items-center mb-2 text-white text-sm font-medium">Email<svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                        </svg>
                        </label>
                        <input type="email" id="default-search" className="block w-full h-11 px-5 py-2.5  leading-7 text-base font-normal shadow-xs text-white bg-transparent border-3 border-gray-500 rounded-xl placeholder-gray-400 focus:outline-blue-500 " placeholder="Your email..." required="" />
                    </div>
                    <div className="relative mb-6">
                        <label className="flex  items-center mb-2 text-white text-sm font-medium">Password <svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                        </svg>
                        </label>
                        <input type="Password" id="default-search" className="block w-full h-11 px-5 py-2.5 text-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border-3 border-gray-500 rounded-xl placeholder-gray-400 focus:outline-blue-500 " placeholder="Your password..." required="" />

                    </div>
                    <button className="w-52 h-12 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 rounded-xl w-full shadow-xs text-white text-base font-semibold leading-6 mb-6" type="submit">SIGN IN</button>
                    <div className=" flex w-full items-center justify-center">
                        <p className=" text-gray-400">Don't have an account?</p>
                        <p className=" ml-1 font-bold hover:cursor-pointer">SignUp</p>
                    </div>

                </form>
        </>
    )
}

export default LoginForm;