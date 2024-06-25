import { create_pipeline, get_all_pipeline_where_subaccountId } from "@/api/pipeline/pipeline.route";
import Loading from "@/global/loading";
import { Pipeline } from "@/types/types";
import { useEffect, useRef } from "react";
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
  const navigate = useNavigate();

  const {data, isLoading} = useQuery("getAllPipelinesWhereSubaccoutIdExist", () => get_all_pipeline_where_subaccountId(Id as string), {
    retry:false
  });


  // TODO: WRITE THE CREATION OF PIPELINES IN THE BACKEND IF THERE EXIST NON

  const pipelines: Pipeline[] = data;

  useEffect(() => {
    if (pipelines?.length > 0) {
      navigate(`/subaccount/${Id}/pipelines/${pipelines[0].id}`);
    }
  }, [pipelines, Id, navigate]);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div>pipelines</div>
  )
}