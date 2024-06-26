import { get_agency } from "@/api/agency/route";
import { logOut, verifyUser } from "@/api/auth/route";
import { createNotification, get_all_notification } from "@/api/notifications/route";
import { get_all_subaccount, get_subaccount } from "@/api/subaccount/route";
import { delete_user, get_user, update_user } from "@/api/user/route";
import { userDataType } from "@/form/userDetails";
import { AgencyType, Notification, PermissionsType, SubAccountType, UserType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useToast } from "@/component/components/ui/use-toast";
import { get_one_user_permissions } from "@/api/permission/permission.route.";
import { deleteLane } from "@/api/lanes/lane.route";
import { get_one_tag_where_subacctId } from "@/api/tags/tag.route";


export interface NotificationInterface {
    message:string, type:string, subAccountId:string
}


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
        isError,
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
 const {data, isError, error} = useQuery("getOnePermission", () => get_one_user_permissions(userId), {
    retry: false
 });

 if (isError) return null;

 if (error) {
    console.log(error);
 }

 return data;
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

export const updateUser = async (userId: string, value: userDataType) => {
    // const {toast} = useToast();
    // useMutation(() => update_user(userId, value) , {
    //     onSuccess: () => {
    //       toast({
    //   title: "Update",
    //   description: "User updated"
    // })
    //     },
    //     onError: () => {
    //       toast({
    //                title: "Update",
    //               description: "opps, something went wrong",
    //              variant: "destructive"
    //           });
    //     }
    //   })

      const update = await update_user(userId, value);

      if (!update) {
    return false;
      }

    return true;
} 

export const createNotifications = async (notifiactionValue: NotificationInterface) => {
    const {toast} = useToast();
    const onMutate = useMutation("createNotification", createNotification, {
        onSuccess: () =>{ toast({
            title: "Notification created",
            description: "Notification created successfully"
        })},
        onError: () => {
            toast({
                title: "Notification creation failed",
                description: "Something went wrong",
                variant: "destructive"
            })
        }
    });


   onMutate.mutate(notifiactionValue);
}

export const useCreateNotification = () => {
    const { toast } = useToast();
  
    const mutation = useMutation(createNotification, {
      onSuccess: () => {
        toast({
          title: "Notification created",
          description: "Notification created successfully"
        });
      },
      onError: () => {
        toast({
          title: "Notification creation failed",
          description: "Something went wrong",
          variant: "destructive"
        });
      }
    });
  
    return mutation;
  };


export  const delete_lane = async (laneId: string) => {
    const {data} = useQuery("deleteLanes", () => deleteLane(laneId), {
        retry: false
      });

      return data;
}

export const getTagWhereSubAccountExist = async (subAccountId: string) => {
    const data = await get_one_tag_where_subacctId(subAccountId);
    return data;
}