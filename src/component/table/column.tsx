import clsx from 'clsx'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/component/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/component/components/ui/dropdown-menu'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from '@/component/components/ui/alert-dialog'
import { Button } from '@/component/components/ui/button'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useModal } from '@/providers/model-provider-file'
import { useToast } from '@/component/components/ui/use-toast'
import { useState } from 'react'
import CustomModel from '@/global/custom-model'
import { RoleEnum, UserType } from '@/types/types'
import { useDeleteUser } from '@/lib/queries'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { useNavigate } from 'react-router-dom'
import EditUserDetails from '@/form/editUser'

export const column: ColumnDef<UserType>[] = [
    {
        accessorKey: 'id',
        header: '',
        cell: () => {
          return null
        },
      },
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({row}) => {
          const avatarUrl = row.getValue('avatarUrl') as string
          const name = row.getValue('name') as string
          const fallbackName = name.slice(0,3)
          return (
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 relative flex-none">
                <Avatar>
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback>{fallbackName}</AvatarFallback>
                </Avatar>
              </div>
              <span>{row.getValue('name')}</span>
            </div>
          )
        },
      },
      {
        accessorKey: 'avatarUrl',
        header: '',
        cell: () => {
          return null
        },
      },
      { accessorKey: 'email', header: 'Email' },
      {
        accessorKey: 'SubAccount',
        header: 'Owned Accounts',
        cell: ({ row }) => {
          const isAgencyOwner = row.getValue('role') === 'AGENCY_OWNER'
          const ownedAccounts = row.original?.permissions.filter(
            (per) => per.access
          )
  
          if (isAgencyOwner)
            return (
              <div className="flex flex-col items-start">
                <div className="flex flex-col gap-2">
                  <Badge className="bg-slate-600 whitespace-nowrap">
                    Agency - {row?.original?.agency?.name}
                  </Badge>
                </div>
              </div>
            )
          return (
            <div className="flex flex-col items-start">
              <div className="flex flex-col gap-2">
                {ownedAccounts?.length ? (
                  ownedAccounts.map((account) => (
                    <Badge
                      key={account.id}
                      className="bg-slate-600 w-fit whitespace-nowrap"
                    >
                      Sub Account - {account.subAccount.name}
                    </Badge>
                  ))
                ) : (
                  <div className="text-muted-foreground">No Access Yet</div>
                )}
              </div>
            </div>
          )
        },
      },

      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => {
          const role: RoleEnum = row.getValue('role')
          return (
            <Badge
              className={clsx({
                'bg-emerald-500': role === 'AGENCY_OWNER',
                'bg-orange-400': role === 'AGENCY_ADMIN',
                'bg-primary': role === 'SUBACCOUNT_USER',
                'bg-muted': role === 'SUBACCOUNT_GUEST',
              })}
            >
              {role}
            </Badge>
          )
        },
      },

      {
        id: 'actions',
        cell: ({ row }) => {
          const rowData = row.original
  
          return <CellActions rowData={rowData} />
        },
      },
]

interface CellActionsProps {
    rowData: UserType
  }


const CellActions: React.FC<CellActionsProps> = ({rowData}) => {
    const navigate = useNavigate()
   // const {data: user} = useUser(rowData?.id)
    const { setOpen } = useModal()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false);
  const { mutate: deleteUser } = useDeleteUser();
  if(!rowData) return;
  if(!rowData.agency)return;

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="flex gap-2"
            onClick={() => navigator.clipboard.writeText(rowData?.email)}
          >
            <Copy size={15} /> Copy Email
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex gap-2"
            onClick={() => {
              setOpen(
                <CustomModel
                  subheading="You can change permissions only when the user has an owned subaccount"
                  title="Edit User Details"
                >
                  <EditUserDetails
                    type="agency"
                    id={rowData?.agency?.id as string | null}
                    subaccount={rowData?.agency?.subAccounts}
                    userData={rowData}
                  />
                </CustomModel>,
                // async () => {
                //   return { user: user }
                // }
              )
            }}
          >
            <Edit size={15} />
            Edit Details
          </DropdownMenuItem>
          {rowData.role !== 'AGENCY_OWNER' && (
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                className="flex gap-2"
                onClick={() => {}}
              >
                <Trash size={15} /> Remove User
              </DropdownMenuItem>
            </AlertDialogTrigger>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            This action cannot be undone. This will permanently delete the user
            and related data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel className="mb-2">Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            className="bg-destructive hover:bg-destructive"
            onClick={() => {
              setLoading(true)
              deleteUser(rowData.id, {
                onSuccess: () => {
                  toast({
                    title: 'Deleted User',
                    description: 'The user has been deleted from this agency. They no longer have access to the agency.',
                  });
                }
              })
              setLoading(false)
              navigate(0)
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 