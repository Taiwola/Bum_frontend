import { useModal } from "@/providers/model-provider-file"
import { LanesDetails, Pipeline, TicketAndTags } from "@/types/types"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {DragDropContext, DropResult, Droppable} from "react-beautiful-dnd";
import { Button } from "./components/ui/button";
import { Flag, Plus } from "lucide-react";
import CustomModel from "@/global/custom-model";
import LaneForm from "@/form/createLaneForm";
import PipelineLane from "./pipelineLane";


type Props = {
    lanes: LanesDetails[],
    pipelineId: string,
    pipelineDetails: Pipeline,
    subaccountId: string,
    //updateLanesOrder: (lanes: Lane[]) => Promise<void>,
    //updateTicketsOrder: (tickets: Ticket[]) => Promise<void>
}

export default function PipelineView({lanes, pipelineDetails, pipelineId, subaccountId}: Props) {
  const {setOpen} = useModal();
  const navigate = useNavigate();

  const ticketsFromAllLanes: TicketAndTags[] = []
  lanes?.forEach((item) =>{
    item.tickets?.forEach((ticket) =>{
      ticketsFromAllLanes.push(ticket)
    })
  })

  const [allLanes, setAllLanes] = useState<LanesDetails[]>();
const [allTickets, setAllTickets] = useState(ticketsFromAllLanes);



  const handleAddLane = () => {
    setOpen(
      <CustomModel
      title="Create lane"
      subheading="Lanes allow you to group tickets"
      >
        <LaneForm pipelineId={pipelineId} />
      </CustomModel>
    )
  }
 


  useEffect(() => {
    setAllLanes(lanes);
  }, [lanes])
  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="bg-white/60 dark:bg-background/60 rounded-xl p-4 use-automation-zoom-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">{pipelineDetails?.name}</h1>
        <Button
        className="flex items-center gap-4 bg-bodyTheme-default rounded"
        onClick={handleAddLane}
        >
          <Plus size={15} />
          Create Lane
        </Button>
      </div>
      <Droppable
      droppableId="lanes"
      type="lane"
      direction="horizontal"
      key={"lanes"}
      >
        {(provided) => (
          <div className="flex items-center gap-x-2 overflow-scroll"
          {...provided.droppableProps}
          ref={provided.innerRef}
          >
            <div className="flex mt-4">
              {allLanes?.map((lane, index) => (
                <>
                <PipelineLane
                allTickets={allTickets}
                setAllTickets={setAllTickets}
                laneDetails={lane}
                subaccountId={subaccountId}
                index={index}
                key={lane.id}
                pipelineId={pipelineId}
                tickets={lane.Tickets || []}
                 />
                </>
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
      {allLanes?.length == 0 && (
        <div className="flex flex-col justify-center w-full">
          <div className="opacity-100">
            <Flag  width={"100%"} height={"100%"} className="text-muted-foreground"/>
          </div>
        </div>
      )}
      </div>
    </DragDropContext>
  )
}