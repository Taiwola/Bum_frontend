import { useToast } from '@/component/components/ui/use-toast';
import { changeUserPermission, getAuthUserDetails, getUserPermission, updateUser } from '@/lib/queries';
import { useModal } from '@/providers/model-provider-file';
import { AuthUserWithAgencySideBarOptionSubAccount, PermissionsType, RoleEnum, SubAccountType, UserType, UserWithPermissionAndSubccount } from '@/types/types'
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {  z } from 'zod';
import { useMutation, useQuery } from 'react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/component/components/ui/card';
import { Label } from '@radix-ui/react-dropdown-menu';
import Fileuploader from '@/global/file-uploader';
import { Input } from '@/component/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/component/components/ui/select';
import { Button } from '@/component/components/ui/button';
import Loading from '@/global/loading';
import { Separator } from '@/component/components/ui/separator';
import ImageData from '@/component/imageData';
import { Switch } from '@/component/components/ui/switch';
import { userLoggedIn } from '@/lib/verifyUser';
import { create_permission, get_one_user_permissions } from '@/api/permission/permission.route.';
import { access } from 'fs';

type Props = {
    type: "agency" | "subaccount",
    id: string | null,
    subaccount?: SubAccountType[],
    userData?: Partial<UserType>
}

// TODO: WRITE THE BACKEND CODE TO CHANGE PERMISSION, WRITE THE BACKEND CODE TO EDIT THE USER DETAILS AND WRITE THE BACKEND CODE FOR NOTIFICATION AND WRITE THE ROUTE AND CONSUME THEM FROM THE BACKEND

export default function EditUserDetails({type, id, subaccount, userData}: Props) {
    const { setClose} = useModal();
    const [roleState, setRoleState] = useState("");
    const [loadingPermission, setLoadingPermission] = useState(false);
    const {toast} = useToast();
    const [profileImage] = useState<string>(() => 
      userData?.avatarUrl || sessionStorage.getItem("profileImage") || ""
    );
    const [role, setRole] = useState('');
    const authUser = userLoggedIn();

    const onMutation = useMutation(create_permission, {
      onSuccess: () => {
        toast({
          title: "Permission",
          description: "Permission created"
        })
      },
      onError: () => {
        toast( {
          title: "PermissionError",
          description: "Something went wrong, try after a few minutes",
          variant: "destructive"
        })
      }
    })

    const userDataSchema = z.object({
        name: z.string().min(1),
        email: z.string().email(),
        avatarUrl: z.string(),
        role: z.enum([
          'AGENCY_OWNER',
          'AGENCY_ADMIN',
          'SUBACCOUNT_USER',
          'SUBACCOUNT_GUEST',
        ]),
      })

      const {handleSubmit, register, formState: {errors, isSubmitting}} = useForm<z.infer<typeof userDataSchema>>({
        resolver: zodResolver(userDataSchema),
        mode: "onChange",
        defaultValues: {
            name: userData ? userData.name : "",
      email: userData ? userData.email: "" ,
      avatarUrl: userData?.avatarUrl || profileImage || "",
      role: userData && userData.role ,
        }
      });

      const handleRoleChange = (value: string) => {
        if (value === RoleEnum.SUBACCOUNT_USER || value === RoleEnum.SUBACCOUNT_GUEST) {
          setRoleState('You need to have subaccounts to assign Subaccount access to team members.');
        } else {
          setRoleState('');
        }
        setRole(value);
      };

      // useEffect(() => {
      //   if (!authUser.data) return;
      //   const getPermisssion = async () => {
      //     if (!authUser.data) return;
      //           setSubAccountPermission(data);
      //       }
      //       getPermisssion();
      // }, [userData, data]);

      const submit = (value: z.infer<typeof userDataSchema>) => {

        console.log(value);
        const update = () => {
          const userUpdate = updateUser(userData?.id as string, value);

          if (!userUpdate) {
                 toast({
            title: "Update",
           description: "opps, something went wrong",
          variant: "destructive"
       });
          }

     toast({
        title: "Update",
       description: "user updated",
   })
   window.location.reload();
        }
        update();
      }


      const onChangePermission = async (subAccountId: string, value: boolean, permissionId: string | undefined) => {
        if (!userData?.email) return;
        setLoadingPermission(true);
        try {
            if (!permissionId) {
                const options = {
                    email: userData.email,
                    access: value,
                    subAccountId: subAccountId as string,
                    userId: userData.id as string
                };
                await onMutation.mutateAsync(options);
            } else {
              console.log(value);
                const response = await changeUserPermission(permissionId as string, userData?.email as string, subAccountId, value, type);
                if (!response) {
                    throw new Error('Permission change failed');
                }
            }
            toast({
                title: 'Success',
                description: 'Permission updated',
            });
        } catch (error) {
            console.error("Permission Change Error:", error);
            toast({
                title: 'Error',
                description: 'Oops, something went wrong',
                variant: "destructive"
            });
        }
        setLoadingPermission(false);
    };
    
    
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Details</CardTitle>
        <CardDescription>Add or update your information</CardDescription>
      </CardHeader>
      <CardContent>
          <div>
            <Label>Profile Picture</Label>
            {userData?.avatarUrl ?
              <ImageData url={userData.avatarUrl} />
            :(<Fileuploader logo='profileImage' agencyId={userData?.agencyId as string}  />)}
          </div>
        <form onSubmit={handleSubmit(submit)} className='space-y-4'>
        <Input type="text"  {...register("avatarUrl")} className="hidden"/>
                    {errors.avatarUrl ? (
                                <span className="text-sm text-red-500 text-muted-foregrounduted">{errors?.avatarUrl.message}</span>
                            ) : ""}

        <div className='flex-1'>
          <Label>User Full Name</Label>
          <Input type='text' placeholder='Full Name'disabled={isSubmitting} {...register("name")} />
          {errors?.name ? (
            <span className="text-sm text-red-500 text-muted-foregrounduted">{errors?.name.message}</span>
          ) : ""}
        </div>

        <div className='flex-1'>
          <Label>Email</Label>
          <Input type='email' placeholder='Enter Your Email' readOnly={userData?.role === RoleEnum.AGENCY_OWNER || isSubmitting} 
          {...register("email")}
          />
        </div>

        <div className='flex-1'>
      <label>User Role</label>
      <Select
        disabled={userData?.role === RoleEnum.AGENCY_OWNER}
        onValueChange={(e) => handleRoleChange(e)}
        {...register("role")}
      >
       <SelectTrigger>
        <SelectValue placeholder={userData?.role} />
        <SelectContent>
        <SelectItem value={RoleEnum.AGENCY_ADMIN}>AGENCY_ADMIN</SelectItem>
          <SelectItem value={RoleEnum.AGENCY_OWNER}>AGENCY_OWNER</SelectItem>
          <SelectItem value={RoleEnum.SUBACCOUNT_GUEST}>SUBACCOUNT_GUEST</SelectItem>
          <SelectItem value={RoleEnum.SUBACCOUNT_USER}>SUBACCOUNT_USER</SelectItem>
        </SelectContent>
       </SelectTrigger>
      </Select>
      <p className="text-muted-foreground">{roleState}</p>
    </div>

    <Button
              disabled={isSubmitting}
              type="submit"
              className='bg-bodyTheme-default'
            >
              {isSubmitting ? <Loading /> : 'Save User Details'}
            </Button>

            {
              authUser.data?.role === RoleEnum.AGENCY_OWNER && (
                <div key={userData?.id}>
                  <Separator className='my-4' />
                  <Label className='font-normal mb-3'>User Permissions</Label>
                  <p className='mb-4 text-muted-foreground'> You can give Sub Account access to team member by turning on
                  access control for each Sub Account. This is only visible to
                  agency owners</p>

                  {/* TODO: WRITE THE PERMISSION BACKEND CODE, TO CREATE PERMISSION FOR THE USERS */}
                  <div className='flex flex-col gap-4'>
                    {subaccount?.map((accounts) => {
                     const subAccountPermissions = userData?.permissions?.find((p) => p.subAccountId === accounts.id)
                     
                     return <>
                     <div key={subAccountPermissions?.id} className='flex items-center justify-between'>
                      <div>
                        <p>{accounts.name}</p>
                        <p>{userData?.email}</p>
                        </div> 
                        <Switch 
                        disabled={loadingPermission} 
                        checked={subAccountPermissions?.access} 
                        onCheckedChange={(value) => {onChangePermission(accounts.id, value, subAccountPermissions?.id)} }
                        />

                     </div>
                     </>
})}
                  </div>
                </div>
                
              )
            }
        </form>
      </CardContent>
    </Card>
  )
}