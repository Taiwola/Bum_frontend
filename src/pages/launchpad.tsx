import { Button } from "@/component/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/component/components/ui/card"
import { getAgencydetails } from "@/lib/queries"
import { userLoggedIn } from "@/lib/verifyUser"
import { CheckCircleIcon } from "lucide-react"
import { Link } from "react-router-dom"


type Props = {}

// TODO: CREATE AND CUSTOMIZE YOUR LAUNCHPAD TO YOUR SATISFACTION, COULD CONNECT PAYSTACK INSTEAD OF STRIPE

export default function Launchpad({}: Props) {

  const {data} = userLoggedIn()
  const agencyId = data.agencyId

   const agencyDetails = getAgencydetails(agencyId as string);

   const allDetailsExist =
   agencyDetails?.address &&
   agencyDetails?.address &&
   agencyDetails?.agencyLogo &&
   agencyDetails?.city &&
   agencyDetails?.companyEmail &&
   agencyDetails?.companyPhone &&
   agencyDetails?.country &&
   agencyDetails?.name &&
   agencyDetails?.state &&
   agencyDetails?.zipCode


   let connectedStripeAccount = false;

  return (
    <div className="flex flex-col justify-center items-center">
    <div className="w-full h-full max-w-[800px]">
      <Card className="border-none">
        <CardHeader>
          <CardTitle>Lets get started!</CardTitle>
          <CardDescription>
            Follow the steps below to get your account setup.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
            <div className="flex md:items-center gap-4 flex-col md:!flex-row">
              <img
                src="/appstore.png"
                alt="app logo"
                height={80}
                width={80}
                className="rounded-md object-contain"
              />
              <p> Save the website as a shortcut on your mobile device</p>
            </div>
            <Button className="bg-bodyTheme-default">Start</Button>
          </div>
          <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
            <div className="flex md:items-center gap-4 flex-col md:!flex-row">
              <img
                src="/stripelogo.png"
                alt="app logo"
                height={80}
                width={80}
                className="rounded-md object-contain"
              />
              <p>
                Connect your stripe account to accept payments and see your
                dashboard.
              </p>
            </div>
            {agencyDetails?.connectAccountId || connectedStripeAccount ? (
              <CheckCircleIcon
                size={50}
                className=" text-primary p-2 flex-shrink-0"
              />
            ) : (
              <Link
                className="bg-bodyTheme-default py-2 px-4 rounded-md text-black"
                to={"/stripe"}
              >
                Start
              </Link>
            )}
          </div>
          <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
            <div className="flex md:items-center gap-4 flex-col md:!flex-row">
              <img
                src={agencyDetails?.agencyLogo}
                alt="app logo"
                height={80}
                width={80}
                className="rounded-md object-contain"
              />
              <p> Fill in all your bussiness details</p>
            </div>
            {allDetailsExist ? (
              <CheckCircleIcon
                size={50}
                className="text-primary p-2 flex-shrink-0"
              />
            ) : (
              <Link
                className="bg-primary py-2 px-4 rounded-md text-white"
                to={`/agency/${agencyId}/settings`}
              >
                Start
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
  )
}