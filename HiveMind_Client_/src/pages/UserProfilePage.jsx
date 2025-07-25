import UserProfile from "../components/userProfile/UserProfile";
import EditProfilePage from "../components/userProfile/EditUserProfile";
import { useState } from "react";
const UserProfilePage = () => {
    const [currentpageIndex, SetCurrentpageIndex] = useState(0);
    const currentComponent = [<UserProfile setIndex={SetCurrentpageIndex}/>, <EditProfilePage setIndex={SetCurrentpageIndex}/>];

    return (
        (
            <>
                {
                    currentComponent[currentpageIndex]
                }
            </>
        )
    )
}

export default UserProfilePage;