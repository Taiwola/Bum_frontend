import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { get_all_notification } from '@/api/notifications/route';
import Sidebar from '@/component/sidebar';
import Unauthorized from '@/component/unauthorized';
import BlurPage from '@/global/blur-page';
import InfoBar from '@/global/info-bar';
import { getAgencydetails } from '@/lib/queries';
import { userLoggedIn } from '@/lib/verifyUser';
import { ThemeProvider } from '@/providers/theme-provider';
import { Notification, UserType } from '@/types/types';
import Loading from '@/global/loading';

type Props = {
  children: React.ReactNode;
};

export default function SubAccountLayout({ children }: Props) {
  const navigate = useNavigate();
  const { Id } = useParams();
  const { data: userData, isLoading: isUserLoading, isError } = userLoggedIn();

  console.log(userData)
  console.log('is loading', isUserLoading)
  console.log("is error", isError);

  useEffect(() => {
    if (!isUserLoading && !userData) {
      navigate('/');
    }
  }, [userData, isUserLoading, navigate]);

  if (isError) {
    return navigate('/'); 
  }

  if (isUserLoading) {
    return <Loading />;
  }

  if (!userData) {
    return navigate('/'); // Redirect is handled in useEffect, return null to prevent further rendering
  }

  if (!userData.agencyId) {
    return <Unauthorized />;
  }

  const user: UserType = userData;
  const userAgencyWithSubAccount = user.agency.subAccounts.find((sub) => sub.id === Id);

  if (!userAgencyWithSubAccount) {
    return <Unauthorized />;
  }

  const userPermission = user.permissions.find((per) => per.access === true);

  if (!userPermission) {
    return <Unauthorized />;
  }

  const userWithSubAccount = user.permissions.find((per) => per.subAccountId === Id);

  if (!userWithSubAccount) {
    return <Unauthorized />;
  }

  const { data: notifications, isError: isNotificationsError } = useQuery(
    'getAllNotification',
    get_all_notification,
    { retry: false }
  );

  const { data: agency } = useQuery(
    ['getAgencydetails', userData?.user?.agencyId],
    () => getAgencydetails(userData?.user?.agencyId as string),
    { enabled: !!userData?.user?.agencyId }
  );

  if (isUserLoading) {
    return <Loading />;
  }

  if (isNotificationsError) {
    return [];
  }

  let allNoti: Notification[] = [];
  if (notifications && agency) {
    allNoti = notifications.filter((n: Notification) => n.agencyId === agency.id);
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen overflow-hidden">
        <Sidebar id={Id as string} type="subaccount" />
        <div className="md:pl-[300px]">
          <InfoBar notification={allNoti} role={userData?.role} />
          <div className="relative">
            <BlurPage>{children}</BlurPage>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
