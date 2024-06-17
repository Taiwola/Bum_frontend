import { create_subaccount } from "@/api/subaccount/route";
import { Button } from "@/component/components/ui/button";
import { Card, CardContent } from "@/component/components/ui/card";
import { Input } from "@/component/components/ui/input";
import { Label } from "@/component/components/ui/label";
import { useToast } from "@/component/components/ui/use-toast"
import Fileuploader from "@/global/file-uploader";
import Loading from "@/global/loading";
import { AgencyType, SubAccountType } from "@/types/types"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";

interface SubAccountDetailsProps {
    //To add the sub account to the agency
    agencyDetails: AgencyType
    details?: Partial<SubAccountType>
    userId: string
    userName: string
  }

const formSchema = z.object({
    name: z.string().min(2),
    companyEmail: z.string().min(1),
    companyPhone: z.string().min(1),
    address: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
    zipCode: z.string().min(1),
    subAccountLogo: z.string().min(1, {message: "An Image must be selected"}),
});

export type SubAccountTypeSchema = z.infer<typeof formSchema>;

const SubAccountDetails: React.FC<SubAccountDetailsProps> = ({agencyDetails, details}) => {
    const {toast} = useToast();
    const [subaccountLogo] = useState<string>(() =>
        sessionStorage.getItem("subaccountLogo") || ""
      );
    const {handleSubmit, reset, register, formState: {isLoading, errors}} = useForm<z.infer<typeof formSchema>>({
        mode: "onChange",
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: details?.name,
            companyEmail: details?.companyEmail,
            companyPhone: details?.companyPhone,
            address: details?.address,
            city: details?.city,
            zipCode: details?.zipCode,
            state: details?.state,
            country: details?.country,
            subAccountLogo: details?.subAccountLogo,
        }
    });

    const onMutation = useMutation(create_subaccount, {
        onSuccess:  async (message: string) => {
          toast({
            title: "Sub Account",
            description: message,
            variant: "default",
            className: "border text-black font-medium dark:bg-black dark:text-white"
          });
          reset();
        },
        onError: async (message:string) => {
          toast({
            title: "oops",
            description: message,
            variant: "destructive",
          })
        }
    });

    useEffect(() => {
        if (details) {
            reset(details)
        }
    }, [details]);

    const submit = (formData: SubAccountTypeSchema) => {
        onMutation.mutate(formData);
        toast({
            title: 'Updating agency details',
            description: 'Please wait while we update your agency details',
        });
        window.location.reload();
    }


    //   const handleDeleteAgency = async () => {
    //     if (!details?.id) return
    //     setDeletingAgency(true)
    //     //WIP: discontinue the subscription
    //     try {
    //       //const response = await deleteAgency(data.id)
    //       toast({
    //         title: 'Deleted Agency',
    //         description: 'Deleted your agency and all subaccounts',
    //       })
    //       navigate(0);
    //     } catch (error) {
    //       console.log(error)
    //       toast({
    //         variant: 'destructive',
    //         title: 'Oppse!',
    //         description: 'could not delete your agency ',
    //       })
    //     }
    //     setDeletingAgency(false)
    //   }

  return (
       
            <Card className="w-full">
                <CardContent>
                    <Fileuploader logo="subaccountLogo" name="Sub Account" agencyId={agencyDetails.id}/>
                <form onSubmit={handleSubmit(submit)} className="space-y-4">
                    <Input type="text" value={subaccountLogo as string}  {...register("subAccountLogo")} className="hidden"/>
                    {errors.subAccountLogo ? (
                                <span className="text-sm text-red-500 text-muted-foregrounduted">{errors?.subAccountLogo.message}</span>
                            ) : ""}
                    <div className="flex md:flex-row md:w-full gap-4">
                        <div className="md:w-full">
                            <Label htmlFor="name">Sub Account Name</Label>
                            <Input type="text" placeholder="Your sub account Name" disabled={isLoading} {...register("name")} name="name"/>
                            {errors.name ? (
                                <span className="text-sm text-red-500 text-muted-foregrounduted">{errors?.name.message}</span>
                            ) : ""}
                        </div>
                        <div className="md:w-full">
                        <Label htmlFor="name">Sub Account Email</Label>
                            <Input type="text" placeholder="Your sub account Email" disabled={isLoading} {...register("companyEmail")} name="companyEmail"/>
                            {errors?.companyEmail ? (
                                <span className="text-sm text-red-500 text-muted-foregrounduted">{errors?.companyEmail.message}</span>
                            ) : ""}
                        </div>
                    </div>
                    <div>
                            <Label htmlFor="companyPhone">Sub Account Phone number</Label>
                            <Input type="text" placeholder="Your sub account number" disabled={isLoading} {...register("companyPhone")} name="companyPhone"/>
                            {errors.companyPhone ? (
                                <span className="text-sm text-red-500 text-muted-foregrounduted">{errors?.companyPhone.message}</span>
                            ) : ""}
                        </div>

                        <div>
                            <Label htmlFor="address">Agency Address</Label>
                            <Input type="text" placeholder="Your sub account address" disabled={isLoading} {...register("address")} name="address"/>
                            {errors.address ? (
                                <span className="text-sm text-red-500 text-muted-foregrounduted">{errors?.address.message}</span>
                            ) : ""}
                        </div>
                        <div className="flex md:flex-row w-full gap-3">
                        <div className="w-full">
                            <Label htmlFor="city">City</Label>
                            <Input type="text" placeholder="City" disabled={isLoading} {...register("city")} name="city"/>
                            {errors.address ? (
                                <span className="text-sm text-red-500 text-muted-foregrounduted">{errors?.address.message}</span>
                            ) : ""}
                        </div>
                        <div className="w-full">
                            <Label htmlFor="state">State</Label>
                            <Input type="text" placeholder="State" disabled={isLoading} {...register("state")} name="state"/>
                            {errors.address ? (
                                <span className="text-sm text-red-500 text-muted-foregrounduted">{errors?.address.message}</span>
                            ) : ""}
                        </div>
                        <div className="w-full">
                        <Label htmlFor="name">ZipCode</Label>
                            <Input type="text" placeholder="ZipCode" disabled={isLoading} {...register("zipCode")} name="zipCode"/>
                            {errors?.zipCode ? (
                                <span className="text-sm text-red-500 text-muted-foregrounduted">{errors?.zipCode.message}</span>
                            ) : ""}
                        </div>
                        </div>
                        <div className="w-full">
                            <Label htmlFor="country">Country</Label>
                            <Input type="text" placeholder="country" disabled={isLoading} {...register("country")} name="country"/>
                            {errors.address ? (
                                <span className="text-sm text-red-500 text-muted-foregrounduted">{errors?.address.message}</span>
                            ) : ""}
                        </div>
               <Button
                type="submit"
                disabled={isLoading}
                className="bg-[#CA46E8] py-3 hover:bg-slate-200 hover:text-black"
              >
                {isLoading ? <Loading /> : 'Save Agency Information'}
              </Button>
                </form>
                </CardContent>
            </Card>
  )
}


export default SubAccountDetails;