import { Pipeline } from "@/types/types"
import { useNavigate } from "react-router-dom"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "./components/ui/alert-dialog";
import { Button } from "./components/ui/button";
import CreatePipelineForm from "@/form/createPipelineForm";
import { useMutation } from "react-query";
import { delete_pipe } from "@/api/pipeline/pipeline.route";
import { useToast } from "./components/ui/use-toast";
import { createNotification } from "@/api/notifications/route";

type Props = {
    pipelineId: string,
    subaccountId: string,
    pipelines: Pipeline[]
}

export default function PipelineSettings({pipelineId, pipelines, subaccountId}: Props) {
    const navigate = useNavigate();
    const {toast} = useToast();
    const {mutate} = useMutation(delete_pipe, {
        retry: false,
        onSuccess: () => {
            toast({
                title: "Pipeline",
                description: "Pipeline deleted"
            })
            navigate(`/subaccount/${subaccountId}/pipelines`);
        },
        onError: () => {
            toast({
                title: "Pipeline Error",
                description: "Ops, something went wrong",
                variant: "destructive"
            })
        }
    })

    const onMutation = useMutation(createNotification, {
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

    const handleDelete = () => {
        // handle the delete and notifications
        mutate(pipelineId);

        const value = pipelines?.find((p) => p.id === pipelineId);

        const notificationOpt = {
            message: `${value?.name} deleted`,
            type: 'subaccount',
            subAccountId: subaccountId
          }
          onMutation.mutate(notificationOpt);
    }
  return (
    <AlertDialog>
        <div>
            <div className="flex items-center justify-between mb-4">
                <AlertDialogTrigger asChild>
                    <Button 
                    className="rounded"
                    variant={'destructive'}
                    >
                        Delete Pipeline
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                <AlertDialogHeader>
                    Are you absolutely sure?
                </AlertDialogHeader>
                <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
              <AlertDialogFooter className="items-center">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-800"
                onClick={handleDelete}
                >
                    Delete
                </AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </div>
            {/* change this to update */}
            <CreatePipelineForm
            subAccountId={subaccountId}
            defaultData={pipelines?.find((p) => p.id === pipelineId)}
            />
        </div>
    </AlertDialog>
  )
}