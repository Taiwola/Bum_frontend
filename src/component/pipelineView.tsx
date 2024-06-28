import { useModal } from "@/providers/model-provider-file"
import { Lane, LanesDetails, Pipeline, Ticket, TicketAndTags } from "@/types/types"
import { useEffect, useState } from "react";
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
    updateLanesOrder: (lanes: Lane[]) => Promise<void>,
    updateTicketsOrder: (tickets: Ticket[]) => Promise<void>
}

export default function PipelineView({lanes, pipelineDetails, pipelineId, subaccountId, updateLanesOrder, updateTicketsOrder}: Props) {
  const {setOpen} = useModal();


  const ticketsFromAllLanes: TicketAndTags[] = []
  lanes?.forEach((item) =>{
    item.tickets?.forEach((ticket) =>{
      ticketsFromAllLanes.push(ticket)
    })
  });

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
    setAllLanes(lanes); // Update allLanes state if lanes prop changes
  }, [lanes])

  const onDragEnd = (dropResult: DropResult) => {
    const { destination, source, type } = dropResult;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }
  
    switch (type) {
      case 'lane': {
        if (!allLanes) return; // Ensure allLanes is defined
  
        const newLanes = [...allLanes.slice(0, source.index), ...allLanes.slice(source.index + 1)];
        newLanes.splice(destination.index, 0, allLanes[source.index]);
        
        const orderedLanes = newLanes.map((lane: LanesDetails, idx: number) => {
          return { ...lane, order: idx };
        });
  
        setAllLanes(orderedLanes);
        updateLanesOrder(orderedLanes);
        break;
      }
  
      case 'ticket': {
        if (!allLanes) return; // Ensure allLanes is defined
  
        const newLanes = [...allLanes];
        const originLane = newLanes.find((lane) => lane.id === source.droppableId);
        const destinationLane = newLanes.find((lane) => lane.id === destination.droppableId);
  
        if (!originLane || !destinationLane) {
          return;
        }
  
        if (source.droppableId === destination.droppableId) {
          const newOrderedTickets = [...originLane.tickets.slice(0, source.index), ...originLane.tickets.slice(source.index + 1)];
          newOrderedTickets.splice(destination.index, 0, originLane.tickets[source.index]);
  
          const orderedTickets = newOrderedTickets.map((ticket, idx) => {
            return { ...ticket, order: idx };
          });
  
          originLane.tickets = orderedTickets;
          setAllLanes(newLanes);
          updateTicketsOrder(orderedTickets);
        } else {
          const [currentTicket] = originLane.tickets.splice(source.index, 1);
  
          originLane.tickets.forEach((ticket, idx) => {
            ticket.order = idx;
          });
  
          destinationLane.tickets.splice(destination.index, 0, {
            ...currentTicket,
            laneId: destination.droppableId,
          });
  
          destinationLane.tickets.forEach((ticket, idx) => {
            ticket.order = idx;
          });
          setAllLanes(newLanes);
          updateTicketsOrder([
            ...destinationLane.tickets,
            ...originLane.tickets,
          ]);
        }
        break;
      }
  
      default:
        break;
    }
  };
  

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

                <PipelineLane
                allTickets={allTickets}
                setAllTickets={setAllTickets}
                laneDetails={lane}
                subaccountId={subaccountId}
                index={index}
                key={lane.id}
                pipelineId={pipelineId}
                tickets={lane.tickets || []}
                 />
  
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