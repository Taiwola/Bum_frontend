import { create_pipeline, get_all_pipeline_where_subaccountId } from "@/api/pipeline/pipeline.route";
import Loading from "@/global/loading";
import { Pipeline } from "@/types/types";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"

type Props = {}

interface valueInterface {
  name: string,
  subAccountId: string
}

export default function Pipelines({}: Props) {
  const params = useParams();
  const {Id} = params
  const navigate = useNavigate()

  const {data, isLoading} = useQuery("getAllPipelinesWhereSubaccoutIdExist", () => get_all_pipeline_where_subaccountId(Id as string), {
    retry:false
  });

  const pipelines: Pipeline[] = data;
  console.log(data);

  if (isLoading) {
    return <div className="flex justify-center items-center"><Loading /></div>
  }

  if (pipelines?.length > 0) {
    return navigate(`/subaccount/${Id}/pipelines/${pipelines[0].id}`);
 }

  

  try {
    const onMutation = useMutation(create_pipeline, {
      onSuccess: (data: any) => {
        const responseId = data.id;
        return navigate(`/subaccount/${Id}/pipelines/${responseId}`);
      },
      onError: (data:any) => {
        console.log(data);
      }
    });

    const option: valueInterface = {
      name: "first pipeline",
      subAccountId: Id as string
    }

    onMutation.mutate(option);


  } catch (error) {
    console.log(error);
  }

  return (
    <div>pipelines</div>
  )
}