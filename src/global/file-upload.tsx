import { Button } from "@/component/components/ui/button";
import ErrorBoundary from "@/lib/error-boundary";
import { UploadDropzone } from "@/lib/upload-thing";
import { FileIcon, X } from "lucide-react";
import { useToast } from "@/component/components/ui/use-toast";

type Props = {
  apiEndPoint: 'agencyLogo' | 'avatar' | 'subaccountLogo' | 'media';
  onChange: (url?: string) => void;
  value?: string;
}

export default function FileUpload({ apiEndPoint, onChange, value }: Props) {
    const {toast} = useToast();
  const type = value?.split('.').pop();

  const handleUploadComplete = (res: any) => {
    if (res && res.length > 0) {
      const url = res[0].url;
      onChange(url);
    } else {
      console.error("No response data received");
    }
  };

  if (value) {
    return (
      <div className="flex flex-col justify-center items-center">
        {type !== 'pdf' ? (
          <div className="relative w-40 h-40">
            <img src={value} alt="uploaded image" className="object-contain" />
          </div>
        ) : (
          <div className="relative flex items-center p-2 mt-2 round-md bg-background/10">
            <FileIcon />
            <a href={value} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm text-indigo-500 dark:text-indigo-400">
              view PDF
            </a>
          </div>
        )}
        <Button variant="ghost" type="button" onClick={() => onChange('')}>
          <X className="h-4 w-4" />
          Remove Logo
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full bg-muted/30">
      <ErrorBoundary>
        <UploadDropzone
          endpoint={apiEndPoint}
          onClientUploadComplete={handleUploadComplete}
          onUploadError={(error) => {
            toast({
            title: 'Error',
            description: `ERROR! ${error.message}`
            })
          }}
        />
      </ErrorBoundary>
    </div>
  );
}
