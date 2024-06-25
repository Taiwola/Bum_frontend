import { getAllLaneWherePipelineId, getAllLanes } from "@/api/lanes/lane.route";
import { get_all_pipeline_where_subaccountId, get_one_pipeline } from "@/api/pipeline/pipeline.route";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/component/components/ui/tabs";
import PipelineSettings from "@/component/pipelineSettings";
import PipelineView from "@/component/pipelineView";
import PipelineinfoBar from "@/global/pipeline-infoBar";
import { Pipeline } from "@/types/types";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom"

type Props = {
}

export default function PipelinePage({}: Props) {
  const params = useParams(); 
  const {pipelineId} = params;
  const {Id} = params;

  const {data} = useQuery("getAllPipelinesWhereSubaccoutIdExist", () => get_all_pipeline_where_subaccountId(Id as string), {
    retry:false
  });

  const pipelines:Pipeline[] = data;

  // CREATE LANES AND GET THEM

  const {data: pipelineDetails} = useQuery("getPipelinesDetails", () => get_one_pipeline(pipelineId as string), {
    retry: false
  });

  // const {data: updateLanesOrder} = useQuery("getLaneWherePipelineId", () => getAllLaneWherePipelineId(pipelineId as string), {
  //   retry: false
  // });

  const {data: lanes} = useQuery("getLanes", getAllLanes, {
    retry: false
  })

  return (
   <Tabs
   defaultValue="view"
   className="w-full"
   >
    <TabsList
    className="bg-transparent border-b-2 h-16 w-full justify-between mb-4"
    >
      <PipelineinfoBar
      pipelineId={pipelineId as string}
      subAccountId={Id as string}
      pipelines={pipelines}
      />

      <div>
        <TabsTrigger value="view">
          Pipeline View
        </TabsTrigger>
        <TabsTrigger value="settings" >
          Settings
        </TabsTrigger>
      </div>
    </TabsList>
        <TabsContent value="view"><PipelineView
        pipelineDetails={pipelineDetails}
        pipelineId={pipelineDetails?.id as string}
        subaccountId={Id as string}
        // updateLanesOrder={updateLanesOrder}
        lanes={lanes}
        /></TabsContent>
        <TabsContent value="settings"><PipelineSettings 
        pipelineId={pipelineId as string}
        subaccountId={Id as string}
        pipelines={pipelines}
        /></TabsContent>
   </Tabs>
  )
}