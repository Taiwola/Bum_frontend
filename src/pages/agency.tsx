import AgencyDetails from "@/form/agencyDetails";
import { getAuthUserDetails } from "@/lib/queries";
import { userLoggedIn } from "@/lib/verifyUser"
import { RoleEnum } from "@/types/types";
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
   
    if (data.user?.agencyId) {
        if (data.user?.role === RoleEnum.SUBACCOUNT_USER || data.user?.role === RoleEnum.SUBACCOUNT_GUEST) {
            return <Navigate to={`/agency/${data.user.id}/subaccount/`} replace={true} />;
        } else if (data.user?.role === RoleEnum.AGENCY_OWNER || data.user?.role === RoleEnum.AGENCY_ADMIN) {
            return <Navigate to={`/agency/${data.user.agencyId}`} replace={true} />;
        }
    }

    return (
        <div className="flex justify-center items-center bg-[#0D1526]">
            <div className="max-w-[850px] border-[1px] p-4 rounded-xl dark">
                <h1 className="text-4xl dark">Create An Agency</h1>
                <AgencyDetails data={{companyEmail: data.user?.email}} />
            </div>
        </div>
    );
}