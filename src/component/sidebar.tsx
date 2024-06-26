import { getAgencydetails, getAuthUserDetails } from "@/lib/queries"
import defaultimage from "@/assets/react.svg";
import MenuOptions from "./menu-options";


type Props = {
    id: string,
    type: "agency" | "subaccount"
}

export default function Sidebar({id, type}: Props) {
    const data = getAuthUserDetails();
    const agencyData = getAgencydetails(data.user?.agencyId as string);

    if (!data.user?.id) return null;


    if (!data.user?.agency) return null;


    const details = type === 'agency' ? data.user?.agency : data.user?.agency.subAccounts.find((sub) => sub.id === id);

    const isWhiteLabelAgency = data.user?.agency.whiteLabel;

    if (!details) return null

    const subAccount = data.user.agency.subAccounts.find((sub) => sub.id === id)

    let sideBarLogo = data.user?.agency.agencyLogo || subAccount?.subAccountLogo as string;
    
    // console.log(subAccount);

    
    if (!isWhiteLabelAgency) {
        if (type === 'subaccount') {
            sideBarLogo = data.user?.agency.subAccounts.find((sub) => sub.id === id)?.subAccountLogo || defaultimage;
        }
    }

    const sideBarOptions = type === 'agency' ? agencyData?.sidebarOptions || [] : subAccount?.sidebarOptions || [];

    const subAccounts = data.user?.agency?.subAccounts?.filter((subaccount) =>
        data.user.permissions.find(permission =>
            permission.subAccountId === subaccount.id && permission.access
        )
    ) || [];

  return (
    <>
        <MenuOptions
    defaultOpen={true}
    details={details}
    id={id}
    sideBarLogo={sideBarLogo}
    sideBarOpts={sideBarOptions}
    user={data.user}
    subAccounts={subAccounts}
    />
    <MenuOptions
    details={details}
    id={id}
    sideBarLogo={sideBarLogo}
    sideBarOpts={sideBarOptions}
    user={data.user}
    subAccounts={subAccounts}
    />
    </>
  )
}