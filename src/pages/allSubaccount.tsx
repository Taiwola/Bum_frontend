import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/component/components/ui/alert-dialog";
import { Button } from "@/component/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/component/components/ui/command";
import CreateSubaccountButton from "@/component/createSubaccountButton";
import DeleteSubAccountButton from "@/component/deleteSubAccountButton";
import { getAgencydetails, getAuthUserDetails } from "@/lib/queries"
import { Link } from "react-router-dom";

type Props = {
  params: {agencyId: string}
}

export default function AllSubaccount({params}: Props) {

  const {user} = getAuthUserDetails();

  if (!user) return

  const agencyDetails = getAgencydetails(user?.agencyId as string);

  return (
   <AlertDialog>
    <div className="flex flex-col">
      <CreateSubaccountButton user={user} id={params.agencyId} className="w-[200px] bg-bodyTheme-default self-end m-6" />
      <Command className="rounded-lg">
        <CommandInput  placeholder="Search..." />
        <CommandList>
          <CommandEmpty>
            No Result found
          </CommandEmpty>
          <CommandGroup heading="Sub Account">
            {!!agencyDetails?.subAccounts.length ? agencyDetails.subAccounts.map((account) => (
              <CommandItem key={account.id} className="h-32 !bg-background my-2 text-primary border-[1px] border-border p-4 rounded-lg hover:!bg-background cursor-pointer transition-all">
                 <Link
                      to={`/subaccount/${account.id}`}
                      className="flex gap-4 w-full h-full"
                    >
                      <div className="relative w-32">
                        <img
                          src={account.subAccountLogo as string}
                          alt="subaccount logo"
                          className="rounded-md object-contain bg-muted/50 p-4"
                        />
                      </div>
                      <div className="flex flex-col justify-between">
                        <div className="flex flex-col">
                          {account.name}
                          <span className="text-muted-foreground text-xs">
                            {account.address}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <AlertDialogTrigger asChild>
                      <Button size={'sm'} variant={'destructive'} className="text-red-600 w-20 hover:bg-red-600">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>This can not be undone, this will delete the sub account and all data related to the sub account</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex items-center">
                        <AlertDialogCancel className="">
                          cancel
                        </AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive hover:bg-destructive"><DeleteSubAccountButton subaccountId={account.id}  /></AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
              </CommandItem>
            ))  : ''}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
   </AlertDialog>
  )
}