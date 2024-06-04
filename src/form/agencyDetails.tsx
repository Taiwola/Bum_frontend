import { create_agency } from "@/api/agency/route";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/component/components/ui/alert-dialog";
import { Button } from "@/component/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/component/components/ui/card";
import {  FormDescription, FormLabel,  } from "@/component/components/ui/form";
import { Input } from "@/component/components/ui/input";
import { Label } from "@/component/components/ui/label";
import { Switch } from "@/component/components/ui/switch";
import { useToast } from "@/component/components/ui/use-toast"
import Fileuploader from "@/global/file-uploader";
import Loading from "@/global/loading";
import { AgencyType } from "@/types/types"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

type Props = {
    data:Partial<AgencyType>
}

const formSchema = z.object({
    name: z.string().min(2, {message: 'Select an image or refresh the page'}),
    companyEmail: z.string().min(1),
    companyPhone: z.string().min(1),
    address: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
    zipCode: z.string().min(1),
    whiteLabel: z.boolean(),
    agencyLogo: z.string().min(1),
});

export type agencyTypeSchema = z.infer<typeof formSchema>;

export default function AgencyDetails({data}: Props) {
    const {toast} = useToast();
    const navigate = useNavigate();
    const [deletingAgency, setDeletingAgency] = useState(false);
    const [agencyLogoS, setAgencyLogoS] = useState<string>(() =>
        sessionStorage.getItem("agencyLogo") || ""
      );
    const {handleSubmit, reset, register, formState: {isLoading, errors}, setValue, watch} = useForm<z.infer<typeof formSchema>>({
        mode: "onChange",
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data?.name,
            companyEmail: data?.companyEmail ,
            companyPhone: data?.companyPhone,
            whiteLabel: Boolean(data?.whiteLabel ?? false),
            address: data?.address,
            city: data?.city,
            zipCode: data?.zipCode,
            state: data?.state,
            country: data?.country,
            agencyLogo: data?.agencyLogo
        }
    });

    const onMutation = useMutation(create_agency, {
        onSuccess:  async (message: string) => {
          toast({
            title: "Agency uploaded",
            description: message,
            variant: "default",
            className: "border text-black font-medium dark:bg-black dark:text-white"
          });
          reset();
          navigate(`/agency/${data.id}`);
        },
        onError: async (message:string) => {
          toast({
            title: "Error",
            description: message,
            variant: "destructive",
          })
        }
    });

    useEffect(() => {
        if (data) {
            reset(data)
        }
    }, [data]);

    useEffect(() => {
        // Ensure whiteLabel is set to a boolean value when form is reset
        setValue("whiteLabel", Boolean(data?.whiteLabel ?? false));
    }, [data, setValue]);

    const submit = (formData: agencyTypeSchema) => {
        console.log(formData);
        onMutation.mutate(formData);
        toast({
            title: 'Updating agency details',
            description: 'Please wait while we update your agency details',
        })
    }


      const handleDeleteAgency = async () => {
        if (!data?.id) return
        setDeletingAgency(true)
        //WIP: discontinue the subscription
        try {
          //const response = await deleteAgency(data.id)
          toast({
            title: 'Deleted Agency',
            description: 'Deleted your agency and all subaccounts',
          })
          navigate(0);
        } catch (error) {
          console.log(error)
          toast({
            variant: 'destructive',
            title: 'Oppse!',
            description: 'could not delete your agency ',
          })
        }
        setDeletingAgency(false)
      }

  return (
        <AlertDialog>
            <Card className="mt-3">
                <CardTitle className="text-center py-3">
                    <p>Agency Information</p>
                </CardTitle>
                <CardDescription className="p-3">
                Welcome to our Agency Creation Page. Here, you're empowered to establish your agency swiftly and effectively. Customize your agency's profile with essential details, from name to logo. Gain access to powerful tools for client and project management, setting the stage for your agency's success.
                </CardDescription>
                <CardContent>
                    <Fileuploader name="Agency" logo="agencyLogo" agencyId={data.id}/>
                <form onSubmit={handleSubmit(submit)} className="space-y-4">
                    <Input type="text" value={agencyLogoS as string}  {...register("agencyLogo")} className="hidden"/>
                    {errors.agencyLogo ? (
                                <span className="text-sm text-red-500 text-muted-foregrounduted">{errors?.agencyLogo.message}</span>
                            ) : ""}
                    <div className="flex md:flex-row md:w-full gap-4">
                        <div className="md:w-full">
                            <Label htmlFor="name">Agency Name</Label>
                            <Input type="text" placeholder="Your Agency Name" disabled={isLoading} {...register("name")} name="name"/>
                            {errors.name ? (
                                <span className="text-sm text-red-500 text-muted-foregrounduted">{errors?.name.message}</span>
                            ) : ""}
                        </div>
                        <div className="md:w-full">
                            <Label htmlFor="email">Agency Email</Label>
                            <Input type="email" placeholder="Your Agency Email" disabled={isLoading} {...register("companyEmail")} name="email"/>
                            {errors.companyEmail ? (
                                <span className="text-sm text-red-500 text-muted-foregrounduted">{errors?.companyEmail.message}</span>
                            ) : ""}
                        </div>
                    </div>
                    <div>
                            <Label htmlFor="companyPhone">Agency Phone number</Label>
                            <Input type="text" placeholder="Your Agency Name" disabled={isLoading} {...register("companyPhone")} name="companyPhone"/>
                            {errors.companyPhone ? (
                                <span className="text-sm text-red-500 text-muted-foregrounduted">{errors?.companyPhone.message}</span>
                            ) : ""}
                        </div>

                        <div className="flex flex-row items-center justify-between rounded-lg border gap-4 p-4">
                            <div className="flex flex-col gap-2">
                            <Label htmlFor="whitelabel" className="text-accent-foreground">WhiteLabel</Label>
                            <h3 className="text-muted-foreground"> Turning on whilelabel mode will show your agency logo
                          to all sub accounts by default. You can overwrite this
                          functionality through sub account settings.</h3>
                            </div>
                            <Switch
                            name="whiteLabel"
                            disabled={isLoading}
                            checked={!!watch("whiteLabel")} // Ensure the value is boolean
                            onCheckedChange={(checked) => setValue("whiteLabel", checked)}
                            />
                        </div>
                        {errors.whiteLabel ? (
                                <span className="text-sm text-red-500 text-muted-foregrounduted">{errors?.whiteLabel.message}</span>
                            ) : ""}
                        <div>
                            <Label htmlFor="address">Agency Address</Label>
                            <Input type="text" placeholder="Your Agency Address" disabled={isLoading} {...register("address")} name="address"/>
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
                            <Label htmlFor="zipcode">Zipcode</Label>
                            <Input type="text" placeholder="Zipcode" disabled={isLoading} {...register("zipCode")} name="zipcode"/>
                            {errors.zipCode ? (
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
                        {data?.id && (
                <div className="flex flex-col gap-2">
                  <FormLabel>Create A Goal</FormLabel>
                  <FormDescription>
                    ✨ Create a goal for your agency. As your business grows
                    your goals grow too so dont forget to set the bar higher!
                  </FormDescription>
                  {/* <NumberInput
                    defaultValue={data?.goal}
                    onValueChange={async (val) => {
                      if (!data?.id) return
                      await updateAgencyDetails(data.id, { goal: val })
                      await saveActivityLogsNotification({
                        agencyId: data.id,
                        description: `Updated the agency goal to | ${val} Sub Account`,
                        subaccountId: undefined,
                      })
                      router.refresh()
                    }}
                    min={1}
                    className="bg-background !border !border-input"
                    placeholder="Sub Account Goal"
                  /> */}
                </div>
              )}
               <Button
                type="submit"
                disabled={isLoading}
                className="bg-[#CA46E8] py-3 hover:bg-slate-200 hover:text-black"
              >
                {isLoading ? <Loading /> : 'Save Agency Information'}
              </Button>
                </form>
                {data?.id && (
            <div className="flex flex-row items-center justify-between rounded-lg border border-destructive gap-4 p-4 mt-4">
              <div>
                <div>Danger Zone</div>
              </div>
              <div className="text-muted-foreground">
                Deleting your agency cannot be undone. This will also delete all
                sub accounts and all data related to your sub accounts. Sub
                accounts will no longer have access to funnels, contacts etc.
              </div>
              <AlertDialogTrigger
                disabled={isLoading || deletingAgency}
                className="text-red-600 p-2 text-center mt-2 rounded-md hove:bg-red-600 hover:text-white whitespace-nowrap"
              >
                {deletingAgency ? 'Deleting...' : 'Delete Agency'}
              </AlertDialogTrigger>
            </div>
          )}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-left">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-left">
                This action cannot be undone. This will permanently delete the
                Agency account and all related sub accounts.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex items-center">
              <AlertDialogCancel className="mb-2">Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={deletingAgency}
                className="bg-destructive hover:bg-destructive"
                onClick={handleDeleteAgency}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
                </CardContent>
            </Card>
        </AlertDialog>
  )
}