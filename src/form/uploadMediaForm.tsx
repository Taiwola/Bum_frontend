import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/component/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/component/components/ui/form";
import { Input } from "@/component/components/ui/input";
import { useToast } from "@/component/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

type Props = {
    subAccountId: string
}

const mediaSchema = z.object({
    link: z.string().min(1, {message: "Media file is required"}),
    name: z.string().min(1, {message: "Name is required"})
})

export default function UploadMediaForm({subAccountId}: Props) {
    const {toast} = useToast();

    const form = useForm<z.infer<typeof mediaSchema>>({
        resolver: zodResolver(mediaSchema),
        mode: 'onSubmit',
        defaultValues: {
            name: '',
            link: ''
        }
    });


    async function submit(value: z.infer<typeof mediaSchema>) {
        try {
            console.log(value);
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Opps, something happened",
                variant: "destructive"
            })
        }
    }
  return (
    <Card className="rounded">
        <CardHeader>
            <CardTitle>Media Information</CardTitle>
            <CardDescription>
                Please enter details for your file
            </CardDescription>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submit)}>
                        <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem className="flex-1">
                                <FormLabel>File Name</FormLabel>
                                <FormControl>
                                    <Input 
                                    placeholder="Your agency name"
                                    {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                        />
                    </form>
                </Form>
            </CardContent>
        </CardHeader>
    </Card>
  )
}