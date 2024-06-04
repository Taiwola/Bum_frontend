import { Avatar, AvatarFallback, AvatarImage } from '@/component/components/ui/avatar'
import { Card } from '@/component/components/ui/card'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/component/components/ui/sheet'
import { Switch } from '@/component/components/ui/switch'
import { getAuthUserDetails } from '@/lib/queries'
import { Notification, RoleEnum } from '@/types/types'
import { Bell } from 'lucide-react'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
    notification: Notification[],
    role?: string,
    className?: string
    subAccountId?: string
}

export default function InfoBar({notification, className, role, subAccountId}: Props) {
    const [allNotifications, setAllNotifications] = useState(notification);
    const [showAll, setShowAll] = useState(true)

    const data = getAuthUserDetails();
    const fallbackName = data.user?.name.slice(0,2).toUpperCase();

    const handleChange = () => {
        if (!showAll) {
            setAllNotifications(notification);
        } else {
            if (notification?.length !== 0) {
                notification.filter((item) => item.id === subAccountId ?? []);
            }
        }

        setShowAll((prev) => !prev);
    }
  return (
    <>
        <div className={twMerge(
          'fixed z-[20] md:left-[300px] left-0 right-0 top-0 p-4 bg-background/80 backdrop-blur-md flex  gap-4 items-center border-b-[1px] ',
          className
        )}>
            <div className='flex items-center ml-auto gap-2'>
                <Avatar>
                    <AvatarImage src={data.user?.avatarUrl as string} />
                    <AvatarFallback>{fallbackName}</AvatarFallback>
                </Avatar>

                <Sheet>
                    <SheetTrigger>
                        <div className='rounded-full w-8 h-8 bg-bodyTheme-default flex items-center justify-center text-white'>
                            <Bell size={17}/>
                        </div>
                    </SheetTrigger>
                    <SheetContent ShowX={true} className='mt-4 mr-4 pr-4 flex flex-col'>
                        <SheetHeader className='text-left'>
                        <SheetTitle>Notifications</SheetTitle>
                        <SheetDescription>
                            {role === RoleEnum.AGENCY_ADMIN || role === RoleEnum.AGENCY_OWNER && (
                                <Card className='flex items-center justify-between p-4'>
                                    Current Subaccount
                                    <Switch onChangeCapture={handleChange}/>
                                </Card>
                            )}
                        </SheetDescription>
                        </SheetHeader>
                        {
                            allNotifications.map((notifications) => (
                                <div className='flex flex-col gap-y-2 mb-2 overflow-x-scroll text-ellipsis' key={notifications.id}>
                                    <Avatar>
                                        <AvatarImage src={notifications.user.avatarUrl as string} alt='Profile url'/>
                                        <AvatarFallback>
                                            {notifications.user.name.slice(0,2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-col'>
                                        <p>
                                            <span className='font-bold'>{notifications.message.split('|')[0]}</span>
                                            <span className='text-muted-foreground'>{notifications.message.split('|')[2]}</span>
                                            <span className='font-bold'>{notifications.message.split('|')[3]}</span>
                                        </p>
                                        <small className='text-xs text-muted-foreground'>
                                            {new Date(notifications.createdAt).toLocaleDateString()}
                                        </small>
                                    </div>
                                </div>
                            ))
                        }
                        {allNotifications.length === 0 && (
                            <div className='flex items-center justify-center mb-4'>
                                <p>You have no notification</p>
                            </div>
                        )}
                    </SheetContent>
                </Sheet>
            </div>

        </div>
    </>
  )
}