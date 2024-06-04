import Sidebar from '@/component/sidebar';
import { getAuthUserDetails } from '@/lib/queries'
import { RoleEnum } from '@/types/types';
import React from 'react'
import { Navigate } from 'react-router-dom';

type Props = {
    children: React.ReactNode,
    params: {agencyId: string}
}

export default function LayoutDash({children, params}: Props) {
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

    let allNoti: any = [];
    // todo
    //const notification =  // write the backend code to get all notification
  return (
    <div className='h-screen overflow-hidden'>
        <Sidebar id={params.agencyId} type='agency' />
        <div className='md:pl-[300px]'>
            {children}
        </div>
    </div>
  )
}