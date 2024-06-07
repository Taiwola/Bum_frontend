import { get_agency } from "@/api/agency/route";
import { verifyUser } from "@/api/auth/route";
import { AgencyType, PermissionsType, UserType } from "@/types/types";
import { useQuery } from "react-query";

export const getAuthUserDetails = () => {
    const { data, isLoading, isError } = useQuery('verifyUser', verifyUser, {
        retry: false
    });

    if (isLoading || isError || !data) {
        return { sidebarOptions: null, permissions: null, isLoading, isError };
    }

    const user:UserType = data; // Assuming `data` has the user information

    return {
        user,
        isLoading,
        isError
    };
}

export const getAgencydetails = (agencyId: string):  AgencyType | null  => {
    const {data, isError} = useQuery("getAgency", () => get_agency(agencyId), {
        retry: false
    });

    if (isError) return null;

    const agency: AgencyType = data;

    return agency;
}


export const getUserPermission = (userId: string) => {
    console.log(userId);
return null;
}

export const changeUserPermission = async (permissionId: string, userEmail: string, subAccountId: string, value:boolean, type: string) => {
    if (type === 'agency') {
        return "true"
    }
}