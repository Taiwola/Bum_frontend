import CustomModel from '@/global/custom-model'
import { useModal } from '@/providers/model-provider-file'
import { LanesDetails, Ticket, TicketAndTags } from '@/types/types'
import React, { Dispatch, SetStateAction, useMemo } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { AlertDialog, AlertDialogTrigger } from './components/ui/alert-dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './components/ui/dropdown-menu'
import { Edit, MoreVertical, PlusCircleIcon, Trash } from 'lucide-react'
import { cn } from '@/lib/utils'
import TicketForm from '@/form/ticketForm'
import CreateLaneForm from '@/form/createLane'
import PipelineTicket from '@/form/pipelineTicket'
import { Badge } from './components/ui/badge'
import { useMutation } from 'react-query'
import { deleteLane } from '@/api/lanes/lane.route'
import { useToast } from './components/ui/use-toast'

interface PipelaneLaneProps {
    setAllTickets: Dispatch<SetStateAction<any>>
    allTickets: TicketAndTags[]
    tickets: Ticket[]
    pipelineId: string
    laneDetails: LanesDetails
    subaccountId: string
    index: number
  }
  

  const PipelineLane: React.FC<PipelaneLaneProps> = ({
    setAllTickets,
    tickets,
    pipelineId,
    laneDetails,
    subaccountId,
    allTickets,
    index,
  }) => { 
    const {toast} = useToast();
    const { setOpen } = useModal()
    const amt = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
      })

      const onMutation = useMutation(deleteLane, {
        onSuccess: () => {
          toast({
            title: "Lane deleted",
            description: "Lane successfully deleted"
          });
          window.location.reload();
        },
        onError: () => {
          toast({
            title: "Lane Error",
            description: "Error in deleting lane"
          });
        }
      })
      const laneAmt = useMemo(() => {
        return tickets?.reduce(
          (sum: number, ticket) => sum + (Number(ticket?.value) || 0),
          0
        ) 
      }, [tickets]);

      const randomColor = `#${Math.random().toString(16).slice(2, 8)}`

      const addNewTicket = (ticket: TicketAndTags[]) => {
        setAllTickets([...allTickets, ticket[0]])
      }

      const handleCreateTicket = () => {
        setOpen(
          <CustomModel
          title='Create a ticket'
          subheading='Tickets are a great way to keep track of task'
          >
            <TicketForm
            getNewTicket={addNewTicket}
            laneId={laneDetails.id}
            subaccountId={subaccountId}
            />
          </CustomModel>
        )
      }

      // change form from where they need to be editted
      const handleEditLane = () => {
        setOpen(
          <CustomModel
            title="Edit Lane Details"
            subheading=""
          >
            <CreateLaneForm
              pipelineId={pipelineId}
              defaultData={laneDetails}
            />
          </CustomModel>
        )
      }

      const handleDelete = () => {
        try {
          // write the code for handle delete and create notifications
           onMutation.mutate(laneDetails.id)
        } catch (error) {
          console.log(error);
          toast({
            title: "Lane Error",
            description: "Something went wrong, try again later"
          });
        }
      }

    return (
      <Draggable
      draggableId={laneDetails.id.toString()}
      index={index}
      key={laneDetails.id}
      >
      {(provided, snapshot) => {
        if (snapshot.isDragging) {
          //@ts-ignore
          const offset = { x: 300, y: 0 }
          //@ts-ignore
          const x = provided.draggableProps.style?.left - offset.x
          //@ts-ignore
          const y = provided.draggableProps.style?.top - offset.y
          //@ts-ignore
          provided.draggableProps.style = {
            ...provided.draggableProps.style,
            top: y,
            left: x,
          }
        }

        return (
          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="h-full">
            <AlertDialog>
              <DropdownMenu>
                <div className="bg-slate-200/30 dark:bg-background/20 h-[700px] w-[300px] px-4 relative rounded-lg overflow-visible flex-shrink-0">
                  <div className="h-14 backdrop-blur-lg dark:bg-background/40 bg-slate-200/60 absolute top-0 left-0 right-0 z-10">
                    <div className="h-full flex items-center p-4 justify-between cursor-grab border-b-[1px]">
                      <div className="flex items-center w-full gap-2">
                        <div className={cn('w-4 h-4 rounded-full')} style={{ background: randomColor }} />
                        <span className="font-bold text-sm">{laneDetails.name}</span>
                      </div>
                      <div className="flex items-center flex-row">
                        <Badge className="bg-white text-black">{amt.format(laneAmt)}</Badge>
                        <DropdownMenuTrigger>
                          <MoreVertical className="text-muted-foreground cursor-pointer" />
                        </DropdownMenuTrigger>
                      </div>
                    </div>
                  </div>

                  <Droppable droppableId={laneDetails.id.toString()} key={laneDetails.id} type="ticket">
                    {(provided) => (
                      <div className="max-h-[700px] overflow-scroll pt-12">
                        <div {...provided.droppableProps} ref={provided.innerRef} className="mt-2">
                          {tickets?.map((ticket, index) => (
                            <>
                            <PipelineTicket
                              allTickets={allTickets}
                              setAllTickets={setAllTickets}
                              subaccountId={subaccountId}
                              ticket={ticket}
                              key={ticket.id.toString()}
                              index={index}
                            />
                            </>
                          ))}
                          {provided.placeholder}
                        </div>
                      </div>
                    )}
                  </Droppable>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <AlertDialogTrigger>
                      <DropdownMenuItem className="flex items-center gap-2" onClick={handleDelete}>
                        <Trash size={15} />
                        Delete
                      </DropdownMenuItem>
                    </AlertDialogTrigger>

                    <DropdownMenuItem className="flex items-center gap-2" onClick={handleEditLane}>
                      <Edit size={15} />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2" onClick={handleCreateTicket}>
                      <PlusCircleIcon size={15} />
                      Create Ticket
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </div>
              </DropdownMenu>
            </AlertDialog>
          </div>
        );
      }}

      </Draggable>
    )
  }

export default PipelineLane;