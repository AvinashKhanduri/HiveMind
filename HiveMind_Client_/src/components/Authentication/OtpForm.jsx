    import React, { useRef } from 'react';

    const OtpForm = ({setPageIndex}) => {
        const inputs = useRef([]);

        const handleChange = (e, index) => {
            const value = e.target.value;

            // Allow only digits
            if (!/^\d$/.test(value)) {
                e.target.value = "";
                return;
            }

            // Move to the next input
            if (value && index < inputs.current.length - 1) {
                inputs.current[index + 1].focus();
            }
        };

        const handleKeyDown = (e, index) => {
            // Go to previous input if Backspace is pressed and input is empty
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                inputs.current[index - 1].focus();
            }
        };

        const handleSubmit = ()=>{
            setPageIndex(0);
        }

        return (
        
                <form onSubmit={handleSubmit}>
                    <p className=' font-bold text-center pb-5'>Enter your 6 digit otp</p>
                    <div className="flex justify-center gap-2 mb-6">
                        {[0, 1, 2, 3,4,5].map((_, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputs.current[index] = el)}
                                className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                type="text"
                                maxLength="1"
                                pattern="[0-9]"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                required
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-blue-700 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Verify
                        </button>
                        <a
                            className="inline-block align-baseline font-bold text-sm text-white hover:text-teal-800 ml-4"
                            href="#"
                        >
                            Resend OTP
                        </a>
                    </div>
                </form>
        
        );
    };

    export default OtpForm;
