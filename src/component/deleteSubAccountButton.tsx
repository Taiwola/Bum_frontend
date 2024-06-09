import { delete_subaccount } from "@/api/subaccount/route";
import { useMutation } from "react-query"
import { useToast } from "./components/ui/use-toast";
import { useNavigate } from "react-router-dom";  

type Props = {
    subaccountId: string
}

export default function DeleteSubAccountButton({subaccountId}: Props) {
    const {toast} = useToast();
    const navigate = useNavigate();
    const onMutation = useMutation(delete_subaccount, {
        onSuccess:  async () => {
            toast({
              title: "Sub Account",
              description: "Sub Account deleted",
              variant: "default",
              className: "border text-black font-medium dark:bg-black dark:text-white"
            });
            navigate(0);
          },
          onError: async () => {
            toast({
              title: "Error",
              description: "opps something went wrong",
              variant: "destructive",
            })
          }
    });
  return (
    <div 
    className="text-white"
    onClick={async () => {
        onMutation.mutate(subaccountId);
    }}
    >
        Delete Sub Account
    </div>
  )
}