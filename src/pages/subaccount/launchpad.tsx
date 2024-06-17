import { get_subaccount } from "@/api/subaccount/route";
import { Button } from "@/component/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/component/components/ui/card";
import BlurPage from "@/global/blur-page";
import { SubAccountType } from "@/types/types";
import { CheckCircleIcon } from "lucide-react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom"

type Props = {}

export default function SubLaunchpad({}: Props) {
  const params = useParams();

  const subAccountId = params.Id;

  const {data: subAccount, isError} = useQuery<SubAccountType>('getOneSubAccount', () => get_subaccount(subAccountId as string), {
    retry: false
  });

  if (isError) {
    return <div>Something went wrong. Please try again later.</div>;
  }

  if (!subAccount) {
    return null;
  }

  const allDetailsExist = 
        subAccount.name &&
        subAccount.address &&
        subAccount.subAccountLogo &&
        subAccount.companyEmail &&
        subAccount.companyPhone &&
        subAccount.country &&
        subAccount.zipCode &&
        subAccount.state

  // WIP: REFACTOR THE CODE



  return (
    <BlurPage>
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-full max-w-[800px]">
        <Card className="border-none ">
          <CardHeader>
            <CardTitle>Lets get started!</CardTitle>
            <CardDescription>
              Follow the steps below to get your account setup correctly.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex justify-between items-center w-full h-20 border p-4 rounded-lg ">
              <div className="flex items-center gap-4">
                <img
                  src="/appstore.png"
                  alt="App logo"
                  height={80}
                  width={80}
                  className="rounded-md object-contain"
                />
                <p>Save the website as a shortcut on your mobile devide</p>
              </div>
              <Button className="bg-bodyTheme-default text-black">Start</Button>
            </div>
            <div className="flex justify-between items-center w-full h-20 border p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <img
                  src="/stripelogo.png"
                  alt="App logo"
                  height={80}
                  width={80}
                  className="rounded-md object-contain "
                />
                <p>
                  Connect your stripe account to accept payments. Stripe is
                  used to run payouts.
                </p>
              </div>
              {subAccount.connectAccountId
               ? (
                <CheckCircleIcon
                  size={50}
                  className="text-muted-foreground p-2 flex-shrink-0"
                />
              ) : (
                <Link
                  className="bg-bodyTheme-default py-2 px-4 rounded-md text-black"
                  to={'/payment'}
                >
                  Start
                </Link>
              )}
            </div>
            <div className="flex justify-between items-center w-full h-20 border p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <img
                  src={subAccount.subAccountLogo}
                  alt="App logo"
                  height={80}
                  width={80}
                  className="rounded-md object-contain p-4"
                />
                <p>Fill in all your business details.</p>
              </div>
              {allDetailsExist ? (
                <CheckCircleIcon
                  size={50}
                  className=" text-primary p-2 flex-shrink-0"
                />
              ) : (
                <Link
                  className="bg-primary py-2 px-4 rounded-md text-white"
                  to={`/subaccount/${subAccount.id}/settings`}
                >
                  Start
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </BlurPage>
  )
}