import { Button } from "@/component/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/component/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/component/components/ui/form";
import { Input } from "@/component/components/ui/input";
import { useToast } from "@/component/components/ui/use-toast";
import Fileuploader from "@/global/file-uploader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type Props = {
    subAccountId: string
}

const mediaSchema = z.object({
    url: z.string().min(1, {message: "Url is required"}),
    title: z.string().min(1, {message: "Title is required"}),
    description: z.string().min(1, {message: "Description is required"})
})

export default function UploadMediaForm({subAccountId}: Props) {
    const {toast} = useToast();
    const [mediaUrl] = useState<string>(() => 
        sessionStorage.getItem('media') || ''
    )

    const form = useForm<z.infer<typeof mediaSchema>>({
        resolver: zodResolver(mediaSchema),
        mode: 'onSubmit',
        defaultValues: {
            title: '',
            url: mediaUrl
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
            <Fileuploader logo="media" />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submit)}>
                        <FormField
                        control={form.control}
                        name="title"
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

                        <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem className="flex-1">
                                <FormLabel>File Description</FormLabel>
                                <FormControl>
                                    <Input 
                                    placeholder="Enter a description"
                                    {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                        />

                        <div className="mt-5 mb-5">
                        <Input type="text" value={mediaUrl} placeholder="upload" {...form.register("url")} />
                        </div>
                        <Button className="bg-bodyTheme-default rounded font-bold">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </CardHeader>
    </Card>
  )
}