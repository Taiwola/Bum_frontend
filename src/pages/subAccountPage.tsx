import { useEffect, useState } from 'react';
import Unauthorized from "@/component/unauthorized";
import { userLoggedIn } from "@/lib/verifyUser";
import { SubAccountType, UserType } from "@/types/types";
import { Navigate } from "react-router-dom";
import Loading from "@/global/loading";
import { useQuery } from 'react-query';
import { get_subaccount } from '@/api/subaccount/route';

export default function SubAccountPage() {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [subAccountId, setSubAccountId] = useState<string | null>(null);

    const userLogged = userLoggedIn();
    const user: UserType = userLogged.data;
    const permission = user.permissions.find((p) => p.subAccountId);
    const {data} = useQuery("getSubAccount", () => get_subaccount(permission?.subAccountId || ""));
    const subAccount: SubAccountType = data;
    useEffect(() => {
        const checkPermission = async () => {
            if (!user.agencyId) {
                setAuthorized(false);
                setLoading(false);
                return;
            }

          
            if (!permission?.subAccountId) {
                setAuthorized(false);
                setLoading(false);
                return;
            }

            try {
                
                const userPer = subAccount?.permissions.find((p) => p.email === user.email);

                if (!userPer?.access) {
                    setAuthorized(false);
                } else {
                    setSubAccountId(userPer.subAccountId);
                    setAuthorized(true);
                }
            } catch (error) {
                console.error("Error fetching sub account:", error);
                setAuthorized(false);
            } finally {
                setLoading(false);
            }
        };

        checkPermission();
    }, [user]);

    if (loading) {
        return <Loading />;
    }

    if (!authorized) {
        return <Unauthorized />;
    }

    return subAccountId ? <Navigate to={`/subaccount/${subAccountId}`} replace={true} /> : null;
}
