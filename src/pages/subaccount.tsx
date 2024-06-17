import Unauthorized from "@/component/unauthorized";
import { userLoggedIn } from "@/lib/verifyUser"
import { UserType } from "@/types/types";

type Props = {}

export default function Subaccount({}: Props) {


  const {data} = userLoggedIn();

  const user: UserType = data;

  if (!user.agencyId) {
    <Unauthorized />
  }
  

  return (
    <div>subaccouSt</div>
  )
}