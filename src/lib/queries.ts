import { get_agency } from "@/api/agency/route";
import { logOut, verifyUser } from "@/api/auth/route";
import { get_all_notification } from "@/api/notifications/route";
import { get_all_subaccount, get_subaccount } from "@/api/subaccount/route";
import { delete_user, get_user } from "@/api/user/route";
import { AgencyType, Notification, PermissionsType, SubAccountType, UserType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "react-query";

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

export const getAllNotification = () => {
    const {data, isError, isLoading} =  useQuery("getAllNotification", () => get_all_notification(), {
        retry: false
    });

    if (isError) {
        return [];
    }

    if (isLoading) {
        return [];
    }
    const notification: Notification[] = data; 

    return notification;
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


export const getSubAccount = async (subaccountId: string) => {
    const {data, isError} = useQuery("getsubaccount", () => get_subaccount(subaccountId), {
        retry: false
    });

    if (isError) return null;

    const subAccount: SubAccountType = data;

    return subAccount;
}

export const getAllSubAccount = async () => {
    const {data, isError} = useQuery("getAllaccount", () => get_all_subaccount(), {
        retry: false
    });


    if (isError) return null;

    const subAccount: SubAccountType[] = data;

    return subAccount;
}


export const useUser = (userId: string) => {
    return useQuery(['user', userId], () => get_user(userId));
  };


export const deleteUser = (userId: string) => {
    const {data, isError} = useQuery("deleteUser", () => delete_user(userId), {
        retry: false
    });


    if (isError) return null;

    const message = data as string;

    return message
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
  
    return useMutation(
      (userId: string) => delete_user(userId),
      {
        onSuccess: () => {
          queryClient.invalidateQueries('users'); // Invalidate the 'users' query to refresh the data
        },
      }
    );
  };


export const loggingUserOut = async () => {
    const {data, isError} = useMutation('logUserOut', () => logOut(), {
        retry: false
    });

    if (isError) {
        console.log(isError);
        return null
    }

    return data;
}