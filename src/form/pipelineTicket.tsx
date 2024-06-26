import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/component/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/component/components/ui/avatar'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/component/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/component/components/ui/dropdown-menu'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/component/components/ui/hover-card'
import TagComponent from '@/component/tagComponent'
import { Ticket, TicketAndTags } from '@/types/types'
import { AlertDialogAction } from '@radix-ui/react-alert-dialog'
import { Contact2, Edit, LinkIcon, MoreHorizontalIcon, Trash, User2 } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
    allTickets: TicketAndTags[],
    setAllTickets: Dispatch<SetStateAction<TicketAndTags>>,
    subaccountId: string,
    ticket: Ticket,
    key: string,
    index: number
}

export default function PipelineTicket({ticket, index}: Props) {


  const handleClickEdit = () => {
    console.log("clicked");
  }

  const handleDeleteTicket = () => {
    console.log("delete");
  }

  return (
    <Draggable 
    draggableId={ticket?.id.toString()}
    index={index}
    >
    {(provided, snapshot) => {
      if (snapshot.isDragging) {
        const offset = {x: 300, y:20};
        //@ts-ignore
        const x = provided.draggableProps.style?.left - offset.x;
        //@ts-ignore
        const y = provided.draggableProps.style?.top - offset.y;

        //@ts-ignore
        provided.draggableProps.style = {
          ...provided.draggableProps.style,
          top: y,
          left: x
        }
      }
      return (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <AlertDialog>
            <DropdownMenu>
              <Card className='my-4 dark:bg-slate-900 bg-white shadow-none transition-all'>
                <CardHeader className='p-12'>
                  <CardTitle className='flex items-center justify-between'>
                    <span className='text-lg w-full'>{ticket.name}</span>
                    <DropdownMenuTrigger>
                    <MoreHorizontalIcon className='text-muted-foreground'/>
                  </DropdownMenuTrigger>
                  </CardTitle>
                  <span className='text-muted-foreground text-xs'>
                    {new Date().toLocaleDateString()}
                  </span>
                  <div className='flex items-center flex-wrap gap-2'>
                    {ticket.tags.map((tag) => (
                      <TagComponent
                      key={tag.id}
                      title={tag.name}
                      colorName={tag.color}
                      />
                    ))}
                  </div>
                  <CardDescription className='w-full'>
                    {ticket.description}
                  </CardDescription>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div
                      className='p-2 text-muted-foreground flex gap-2 hover:bg-muted transition-all rounded-lg cursor-pointer items-center'
                      >
                        <LinkIcon />
                        <span className='text-xs font-bold'>CONTACT</span>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent side='right' className='w-fit'>
                      <div className='flex justify-between space-x-4'>
                      <Avatar>
                            <AvatarImage />
                            <AvatarFallback className="bg-primary">
                              {ticket.contact?.firstName.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">
                              {`${ticket.contact?.firstName} ${ticket.contact?.lastName}`} 
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {ticket.contact?.email}
                            </p>
                            <div className="flex items-center pt-2">
                              <Contact2 className="mr-2 h-4 w-4 opacity-70" />
                              <span className="text-xs text-muted-foreground">
                                Joined{' '}
                                {ticket.contact?.createdAt.toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </CardHeader>
                <CardFooter className='m-0 p-2 border-t-[1px] border-muted-foreground/20 flex items-center justify-between'>
                <div className="flex item-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          alt="contact"
                          src={ticket.assignedUser?.avatarUrl as string}
                        />
                        <AvatarFallback className="bg-primary text-sm text-white">
                          {ticket.assignedUser?.name}
                          {!ticket.assignedUserId && <User2 size={14} />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col justify-center">
                        <span className="text-sm text-muted-foreground">
                          {ticket.assignedUserId
                            ? 'Assigned to'
                            : 'Not Assigned'}
                        </span>
                        {ticket.assignedUserId && (
                          <span className="text-xs w-28  overflow-ellipsis overflow-hidden whitespace-nowrap text-muted-foreground">
                            {ticket.assignedUser?.name}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-bold">
                      {!!ticket.value &&
                        new Intl.NumberFormat(undefined, {
                          style: 'currency',
                          currency: 'USD',
                        }).format(+ticket.value)}
                    </span>
                </CardFooter>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <AlertDialogTrigger>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Trash size={15} />
                        Delete Ticket
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <DropdownMenuItem
                      className="flex items-center gap-2"
                      onClick={handleClickEdit}
                    >
                      <Edit size={15} />
                      Edit Ticket
                    </DropdownMenuItem>
                  </DropdownMenuContent>
              </Card>
              <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the ticket and remove it from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex items-center">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive"
                      onClick={handleDeleteTicket}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
            </DropdownMenu>
          </AlertDialog>
        </div>
      )
    }}
    </Draggable>
  )
}