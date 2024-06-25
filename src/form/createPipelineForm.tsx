import { createNotification } from "@/api/notifications/route";
import { create_pipeline } from "@/api/pipeline/pipeline.route";
import { Button } from "@/component/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/component/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/component/components/ui/form";
import { Input } from "@/component/components/ui/input";
import Loading from "@/global/loading";
import { useModal } from "@/providers/model-provider-file";
import { Pipeline } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";
import { useToast } from "@/component/components/ui/use-toast";
import { title } from "process";



interface CreatePipelineProps {
  defaultData?: Pipeline
  subAccountId: string
}

const CreatePipelineFormSchema = z.object({
  name: z.string().min(1)
});

const CreatePipelineForm: React.FC<CreatePipelineProps> = ({
  defaultData,
  subAccountId
}) => {
  const {data, isOpen, setClose, setOpen} = useModal();
  const form = useForm<z.infer<typeof CreatePipelineFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(CreatePipelineFormSchema),
    defaultValues: {
      name: defaultData?.name || ''
    }
  });
  const {toast} = useToast();
  const onMutation = useMutation(create_pipeline, {
    retry: false
  })

  const {mutate} = useMutation(createNotification, {
    retry: false,
    onSuccess: () => {
      toast({
        title: "Pipeline created",
        description: "Pipeline and notification created"
    })
    },
    onError: () => {
      toast({
        title: "Pipeline Error",
        description: "Ops, something happened",
        variant: "destructive"
      })
    }
  })

  useEffect(() => {
    if (defaultData) {
      form.reset({
        name: defaultData.name || ''
      })
    }
  }, [defaultData])

  const isLoading = form.formState.isLoading;

  const onSubmit = async (values: z.infer<typeof CreatePipelineFormSchema>) => {
    if (!subAccountId) return

    const extendedValues = {
      ...values,
      subAccountId
  } as typeof values & { subAccountId: string };

    onMutation.mutate(extendedValues);

    
      const notificationOpt = {
        message: `${values.name} created`,
        type: 'subaccount',
        subAccountId: subAccountId
      }
      mutate(notificationOpt);

    setClose()
    // window.location.reload();
  }
  return (
    <Card className="w-full">
      <CardHeader>
      <CardTitle>Pipeline Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          >
            <FormField
            disabled={isLoading}
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Pipeline Name</FormLabel>
                <FormControl>
                  <Input 
                  placeholder="Name"
                  {...field}
                  />
                </FormControl>
              </FormItem>
            )}
            />
            <Button
              className="w-20 mt-4 bg-bodyTheme-default rounded"
              disabled={isLoading}
              type="submit"
            >
              {form.formState.isSubmitting ? <Loading /> : 'Save'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )

}


export default CreatePipelineForm;