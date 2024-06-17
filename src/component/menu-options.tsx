import { AgencySidebarOption, AgencyType, RoleEnum, SubAccountSidebarOption, SubAccountType } from "@/types/types"
import { useEffect, useMemo, useState } from "react"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./components/ui/sheet"
import { Button } from "./components/ui/button"
import { ChevronsUpDown, Compass, Menu, PlusCircleIcon } from "lucide-react"
import clsx from "clsx"
import { AspectRatio } from "./components/ui/aspect-ratio"
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./components/ui/command"
import { Link } from "react-router-dom"
import { useModal } from "@/providers/model-provider-file"
import CustomModel from "@/global/custom-model"
import SubAccountDetails from "@/form/subaccountDetails"
import { Separator } from "./components/ui/separator"
import IconImages from "./icons/index";


type Props = {
    defaultOpen?: boolean,
    subAccounts: SubAccountType[],
    sideBarOpts: AgencySidebarOption[] | SubAccountSidebarOption[]
    sideBarLogo: string,
    details: any,
    user: any,
    id: string
}

export default function MenuOptions({defaultOpen, subAccounts, sideBarOpts,sideBarLogo,details, user,id}: Props) {

  const [isMounted, setIsMounted] = useState(false)
  const openMenu = useMemo(() => (defaultOpen ? {open: true} : {}), [defaultOpen]);
  const {setOpen} = useModal();

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return 
  return (
    <Sheet
    modal={false}
    {...openMenu}
    >
      <SheetTrigger 
      asChild
      className="absolute left-4 top-4 z-[100] md:!hidden flex"
      >
        <Button
        variant="outline"
        size={"icon"}
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
       ShowX={!defaultOpen} 
       side={"left"}
       className={clsx("bg-background/80 backdrop-blur-xl overflow-y-scroll scroll-m-4 fixed top-0 border-r-[1px] p-6", {
        'hidden md:inline-block z-0 w-[300px]' : defaultOpen,
        'inline-block md:hidden z-[100] w-full' : !defaultOpen
       })}
       >
        <div>
          <AspectRatio ratio={16/7} className="mt-4">
              <img 
              src={sideBarLogo} 
              alt={"side bar logo"}
              className="object-fill bg-transparent w-[100%] h-[100%] boder rounded-md"
              />
          </AspectRatio>
          <Popover>
            <PopoverTrigger asChild>
               <Button
               variant={"ghost"}
               className="w-full  my-4 flex items-center justify-between py-8"
               >
                <div className="flex items-center text-left gap-2">
                  <Compass />
                  <div className="flex flex-col">
                    {details.name}
                    <span className="text-muted-foreground">{details.address}</span>
                  </div>
                </div>
                <ChevronsUpDown
                className="text-muted-foreground"
                size={16}
                />
               </Button>
            </PopoverTrigger>
            <PopoverContent
            className="w-80 h-80 mt-4 z-[100] bg-bodyTheme-default dark:bg-background"
            >
              <Command className="rounded-lg">
                <CommandInput placeholder="Search Account...." />
                <CommandList className="pb-16 ">
                    <CommandEmpty>
                      No result found
                    </CommandEmpty>
                    {
                      (user.role === RoleEnum.AGENCY_OWNER || user.role === RoleEnum.AGENCY_ADMIN) && user?.agency && <CommandGroup heading="Agency">
                        <CommandItem className="!bg-transparent my-2 text-primary border-[1px] border-border p-2 rounded-md hover:!bg-muted cursor-pointer transition-all">
                        {defaultOpen ? 
                        (<Link to={`/agency/${user?.agency?.id}`} className="flex gap-4 w-full h-full">
                          <div className="relative w-16">
                            <img src={user?.agency?.agencyLogo} alt="agency logo" className="rounded-md object-contain" />
                          </div>

                          <div className="flex flex-col flex-1">
                            {user?.agency?.name}
                            <span className="text-muted-foreground">{user?.agency?.address}</span>
                          </div>

                        </Link>) 
                        : 
                        (
                          <SheetClose>
                        <Link to={`/agency/${user?.agency?.id}`} className="flex gap-4 w-full h-full">
                          <div className="relative w-16">
                            <img src={user?.agency?.agencyLogo} alt="agency logo" className="rounded-md object-contain" />
                          </div>

                          <div className="flex flex-col flex-1 justify-start items-start">
                            {user?.agency?.name}
                            <span className="text-muted-foreground">{user?.agency?.address}</span>
                          </div>

                        </Link>
                        </SheetClose>
                        ) 
                        }
                        </CommandItem>
                      </CommandGroup>
                    }
                    <CommandGroup heading='Account'>
                      {!!subAccounts ? subAccounts.map((subaccout) => (
                       <CommandItem key={subaccout.id}>
                           {defaultOpen ? 
                        (<Link to={`/subaccount/${subaccout.id}`} className="flex gap-4 w-full h-full">
                          <div className="relative w-16">
                            <img src={subaccout.subAccountLogo} alt="agency logo" className="rounded-md object-contain" />
                          </div>

                          <div className="flex flex-col flex-1">
                            {subaccout.name}
                            <span className="text-muted-foreground">{subaccout.address}</span>
                          </div>

                        </Link>) 
                        : 
                        (
                          <SheetClose>
                        <Link to={`/subaccount/${subaccout.id}`} className="flex gap-4 w-full h-full">
                          <div className="relative w-16">
                            <img src={subaccout.subAccountLogo} alt="agency logo" className="rounded-md object-contain" />
                          </div>

                          <div className="flex flex-col flex-1 justify-start items-start">
                            {subaccout.name}
                            <span className="text-muted-foreground">{subaccout.address}</span>
                          </div>

                        </Link>
                        </SheetClose>
                        ) 
                        }
                        </CommandItem>
                      )) : "no account"}
                    </CommandGroup>
                </CommandList>
                {(user.role === RoleEnum.AGENCY_OWNER || user.role === RoleEnum.AGENCY_ADMIN) && (
                  <SheetClose>
                        <Button
                    variant={"default"}
                    className="w-full flex gap-2 text-white font-bold hover:text-black hover:bg-muted-foreground bg-bodyTheme-default"
                    onClick={() => setOpen(

                      <CustomModel
                      title="Create sub Account"
                      subheading="You can switch between agency and sub accounts from the sidebar"
                      >
                        {<SubAccountDetails
                          agencyDetails={user?.agency as AgencyType}
                          userId={user.id as string}
                          userName={user.name as string}
                          
                        />}
                      </CustomModel>
                    
                    )}
                    >
                    <PlusCircleIcon size={15}/>
                    Create Sub Account
                  </Button>
                  </SheetClose>
                )}
              </Command>
            </PopoverContent>
          </Popover>
          <p className="text-muted-foreground text-xs mb-2">MENU LINKS</p>
<Separator className="mb-4" />
<nav className="relative">
  <Command className="rounded-lg overflow-visible bg-transparent">
    <CommandInput placeholder="Search..." />
    <CommandList className="py-4 overflow-visible">
      <CommandEmpty>No Results Found</CommandEmpty>
      <CommandGroup className="overflow-visible">
        {sideBarOpts.map((sidebar) => (
          <CommandItem key={sidebar.id} className="md:w-[320px] w-full">
            <Link to={sidebar.link} className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px]">
              <IconImages icon={sidebar.icon} />
              <span>{sidebar.name}</span>
            </Link>
          </CommandItem>
        ))}
      </CommandGroup>
    </CommandList>
  </Command>
</nav>

        </div>
      </SheetContent>
    </Sheet>
  )
}