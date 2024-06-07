import AgencyDetails from '@/form/agencyDetails';
import UserDetails from '@/form/userDetails';
import { getAgencydetails, getAuthUserDetails } from '@/lib/queries'
import { userLoggedIn } from '@/lib/verifyUser';
import { AgencyType } from '@/types/types';

type Props = {}

export default function Settings({}: Props) {

  const {data} = userLoggedIn();

  if (!data) return null;

  const {user} = getAuthUserDetails();

  if (!user) return null;

  const agencyDetails = getAgencydetails(user?.agencyId as string);

  if (!agencyDetails) return null;

  const subAccounts = agencyDetails.subAccounts;

  return (
    <div className='flex lg:!flex-row flex-col gap-4'>
      <AgencyDetails data={agencyDetails as AgencyType}/>
      <UserDetails
      type="agency"
      id={agencyDetails.id as string}
      subaccount={subAccounts}
      userData={user}
      />
    </div>
  )
}