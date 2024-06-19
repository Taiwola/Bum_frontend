import { useEffect, useState } from "react";
import { UploadCloudIcon } from "lucide-react";
import { Input } from "@/component/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { uploadLogo } from "@/api/uploadthing/route";
import { useToast } from "@/component/components/ui/use-toast";
import { ToastAction } from "@/component/components/ui/toast";

type Props = {
  agencyId?: string | undefined;
  logo: "subaccountLogo" | "agencyLogo" | "profileImage" | "media";
  name?: string
};

const uploadSchema = z.object({
  agencyLogo: z
    .any()
    .refine((files) => files && files.length === 1, {
      message: "You must select exactly one file.",
    })
    .refine((files) => files && files[0] && files[0].size <= 10 * 1024 * 1024, {
      message: "The file size must be less than 10MB.",
    })
    .refine((files) => files && files[0] && files[0].type.startsWith("image"), {
      message: "Only images are allowed.",
    }),
});

export default function Fileuploader({ agencyId, logo, name }: Props) {

  const [preview, setPreview] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<z.infer<typeof uploadSchema>>({
    resolver: zodResolver(uploadSchema),
  });

  const {toast} = useToast();

  const onMutation = useMutation(uploadLogo, {
    onSuccess: async (url: string) => {
        toast({
          variant: "default",
          title: "Upload Success",
          description: "File uploaded successfully",
          className: "border text-black font-medium dark:bg-black dark:text-white"
        });
        sessionStorage.setItem(logo, url);
      },
      onError: async (error: Error) => {
        toast({
          variant: "default",
          title: "Error",
          description: error.message,
          className: "bg-red-400 text-white font-medium",
          action: <ToastAction altText="Try again" className="hover:bg-red-400">Try again</ToastAction>
        });
    }
  });

  const submit = (data: z.infer<typeof uploadSchema>) => {
    const file = data.agencyLogo[0]
    onMutation.mutate(data.agencyLogo[0]);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
    
  };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0] || null;
  //   setValue("agencyLogo", event.target.files); // Update the value in react-hook-form
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreview(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     setPreview(null);
  //   }
  // };

  const file = watch("agencyLogo");

  return (
    <div>
      <div className="mb-2">
        <h1>{name}</h1>
        {preview && (
          <div className="mt-2 flex justify-center items-center">
            <img src={preview} alt="Selected file preview" className="max-w-xs max-h-56" />
          </div>
        )}
        <form className="mt-2" onSubmit={handleSubmit(submit)}>
          <label className="w-full h-56 gap-2 border text-center cursor-pointer flex flex-col items-center justify-center round-md bg-background/10">
            <UploadCloudIcon className="w-10 h-10" />
            <div className="flex flex-col gap-2">
              <h3>Upload a Single File</h3>
              <h5 className="text-sm text-gray-500">image (4MB max)</h5>
              <div className="bg-[#CA46E8] py-3 hover:bg-slate-200 hover:text-black">
                Choose a file
              </div>
            </div>
            <Input
              type="file"
              className="hidden"
              {...register("agencyLogo")}
              // onChange={handleFileChange}
            />
          </label>

          {errors.agencyLogo && (
            <p className="text-red-600">{(errors.agencyLogo.message as string) || 'Invalid file'}</p>
          )}
          {file && file[0] && (
            <div className="mt-2 text-center">
              <p>Selected file: {file[0].name}</p>
            </div>
          )}
          {file && (
            <div className="flex justify-end mt-4">
              <button type="submit" className="bg-[#CA46E8] text-white py-2 px-4 rounded">
                Submit
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
