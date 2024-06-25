import { create_lane } from "@/api/lanes/lane.route"
import { Button } from "@/component/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/component/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/component/components/ui/form"
import { Input } from "@/component/components/ui/input"
import { useToast } from "@/component/components/ui/use-toast"
import Loading from "@/global/loading"
import { useModal } from "@/providers/model-provider-file"
import { Lane } from "@/types/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { z } from "zod"


interface CreateLaneFormProps {
    defaultData?: Lane
    pipelineId: string
  }

  export const LaneFormSchema = z.object({
    name: z.string().min(1),
  })

  const LaneForm: React.FC<CreateLaneFormProps> = ({
    defaultData,
    pipelineId,
  }) => {

    const {toast} = useToast();
    const { setClose } = useModal()
    const form = useForm<z.infer<typeof LaneFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(LaneFormSchema),
    defaultValues: {
      name: defaultData?.name || '',
    },
  });

  const onMutation = useMutation(create_lane, {
    onSuccess: () => {
      toast({
        title: 'Lane',
        description: 'lane created',
      })
    },
    onError: () => {
      toast({
        title: 'Lane Error',
        description: 'Error in creating lane',
        variant: "destructive"
      })
    }
  });

  
  useEffect(() => {
    if (defaultData) {
      form.reset({
        name: defaultData.name || '',
      })
    }
  }, [defaultData])


  const isLoading = form.formState.isLoading;

  const onSubmit = async (values: z.infer<typeof LaneFormSchema>) => {
    if (!pipelineId) return
    try {
      

      const options = {
        ...values,
        pipelineId: pipelineId
      }

      onMutation.mutate(options)

     

    //   router.refresh()
    // window.location.reload();
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Oppse!',
        description: 'Could save lane details',
      })
    }
    setClose()
  }

    return (
        <Card className="w-full ">
        <CardHeader>
          <CardTitle>Lane Details</CardTitle>
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lane Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Lane Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <Button
                className="w-20 mt-4 bg-bodyTheme-default"
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

export default LaneForm;