import { getAuthUserDetails } from "@/lib/queries";
import { userLoggedIn } from "@/lib/verifyUser"
import { Navigate } from "react-router-dom";



export default function Agency() {
    const { data: user, isLoading, isError } = userLoggedIn();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !user) {
        return <Navigate to="/sign-in" replace={true} />;
    }

    const data = getAuthUserDetails();

    if (data.user?.agency === null) {
        return <>no agency</>
    }

    return (
        <div>
           agency
        </div>
    );
}