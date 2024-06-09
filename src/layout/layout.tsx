import { get_all_notification } from '@/api/notifications/route';
import Sidebar from '@/component/sidebar';
import BlurPage from '@/global/blur-page';
import InfoBar from '@/global/info-bar';
import { getAgencydetails, getAuthUserDetails } from '@/lib/queries'
import { ThemeProvider } from '@/providers/theme-provider';
import { Notification, RoleEnum } from '@/types/types';
import React from 'react'
import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';

type Props = {
    children: React.ReactNode,
    params: {agencyId: string}
}

export default function LayoutDash({children, params}: Props) {

    const {data: notification, isError} =  useQuery("getAllNotification", () => get_all_notification(), {
        retry: false
    });

    if (isError) {
        return [];
    }
    
    const noti: Notification[] = notification || [];

    const data = getAuthUserDetails();

    if (!data.user) {
        return <Navigate to="/" replace={true} />;
    }

    if (!params.agencyId) {
        return <Navigate to="/agency" replace={true} />;
    }

    if (data.user?.role !== RoleEnum.AGENCY_OWNER && data.user.role !== RoleEnum.AGENCY_ADMIN ) {
        return <Navigate to="/unauthorized" replace={true} />;
    }

    let allNoti: Notification[] = [];

    const agency = getAgencydetails(data.user?.agencyId as string); // Await the async function
    if (agency) { // Check if agency is defined
      const notifications: Notification[] = noti.filter((notification) => notification.agencyId === agency.id);
      if (notifications.length > 0) {
        allNoti.push(...notifications);
      }
    }
        
  return (
    <ThemeProvider
     defaultTheme="dark" 
     storageKey="vite-ui-theme"
     >
    <div className='h-screen overflow-hidden'>
        <Sidebar id={params.agencyId} type='agency' />
        <div className='md:pl-[300px]'>
            <InfoBar notification={allNoti}  role={data.user.role}/>
            <div className='relative'>
                <BlurPage>
                    {children}
                </BlurPage>
            </div>
        </div>
    </div>
    </ThemeProvider>
  )
}