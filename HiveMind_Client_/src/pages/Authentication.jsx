import RegistrationForm from "../components/Authentication/RegistrationForm";
import OtpForm from "../components/Authentication/OtpForm";
import LoginForm from "../components/Authentication/LoginForm";
import { useEffect, useState } from "react";
const AuthenticationPage = () => {
    const [pageIndex,setPageIndex] = useState(1);
    const currentForm = [<LoginForm setPageIndex={setPageIndex} />,<RegistrationForm setPageIndex={setPageIndex}  />,<OtpForm setPageIndex={setPageIndex} />]
    return (
        <>
            <div className=" w-[100vw] h-[100vh] flex items-center justify-center ">
                {
                    currentForm[pageIndex]
                }
            </div>

        </>
    )
}

export default AuthenticationPage;