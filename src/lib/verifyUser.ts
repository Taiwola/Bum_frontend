import { verifyUser } from "@/api/auth/route";
import { useQuery } from "react-query";


export const userLoggedIn = () => {
    const { data, isLoading, isError } = useQuery('verifyUser', verifyUser, {
        retry: false
    });

    return {
        data, isLoading, isError
    };
}