import { useModal } from "@/providers/model-provider-file"
import { AgencySidebarOption, AgencyType, SubAccountType, UserType } from "@/types/types"
import { Button } from "./components/ui/button"
import { twMerge } from "tailwind-merge"
import CustomModel from "@/global/custom-model"
import SubAccountDetails from "@/form/subaccountDetails"
import { Plus } from "lucide-react"

type Props = {
  user: UserType & {
    agency:
      | (
          | AgencyType
          | (null & {
              SubAccount: SubAccountType[]
              SideBarOption: AgencySidebarOption[]
            })
        )
      | null
  }
  id: string
  className: string
}

export default function CreateSubaccountButton({className, id, user}: Props) {
  const {setOpen} = useModal();
 
  const agencyDetails = user.agency;

  if (!agencyDetails) return
  return (
    <div> <Button className={twMerge('w-full flex gap-4 rounded', className)} onClick={
      () => setOpen(<CustomModel title="Create a Sub Account" subheading="You can switch between sub account and agency">
        <SubAccountDetails agencyDetails={agencyDetails} userId={user.id} userName={user.name} />
      </CustomModel>)
    }>
      <Plus size={15}/>
      Create Sub Account
    </Button></div>
  )
}