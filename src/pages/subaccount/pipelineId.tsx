import { get_one_pipeline } from "@/api/pipeline/pipeline.route";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom"

type Props = {
}

export default function PipelinePage({}: Props) {
  const params = useParams(); 
  const {pipelineId} = params;
  const {Id} = params;

  const {data} = useQuery("getOnePipeline", () => get_one_pipeline(pipelineId as string), {
    retry: false
  })

  return (
    <div>
      {`subaccountId: ${Id}`}
      {`pipelineId:  ${pipelineId}`}
      </div>
  )
}