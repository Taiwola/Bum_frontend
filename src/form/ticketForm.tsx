import { get_subacc_team_members } from '@/api/user/route';
import { Avatar, AvatarFallback, AvatarImage } from '@/component/components/ui/avatar';
import { Button } from '@/component/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/component/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/component/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/component/components/ui/form';
import { Input } from '@/component/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/component/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/component/components/ui/select';
import { Textarea } from '@/component/components/ui/textarea';
import TagCreator from '@/component/tagCreator';
import Loading from '@/global/loading';
import { cn } from '@/lib/utils';
import { useModal } from '@/providers/model-provider-file';
import { Contact, Tag, UserType } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon, ChevronsUpDownIcon, User2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { z } from 'zod';

type Props = {
    getNewTicket: any,
    laneId: string,
    subaccountId: string
};

const currencyNumberRegex = /^\d+(\.\d{1,2})?$/;

export const TicketFormSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    value: z.string().refine((value) => currencyNumberRegex.test(value), {
        message: 'Value must be a valid price.',
    }),
});

export default function TicketForm({ laneId, subaccountId }: Props) {
    const { data: teamMembers, isLoading } = useQuery(
        ['getSubAccTeamMembers', subaccountId],
        () => get_subacc_team_members(subaccountId),
        { retry: false }
    );

    const { data: defaultData, setClose } = useModal();
    const ticketData = (defaultData.ticket && defaultData.ticket.length > 0) ? defaultData.ticket[0] : null;

    const form = useForm<z.infer<typeof TicketFormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(TicketFormSchema),
        defaultValues: {
            name: ticketData?.name || '',
            description: ticketData?.description || '',
            value: String(ticketData?.value || 0),
        },
    });

    const loading = form.formState.isLoading;
    const ticketAssignedUser = defaultData.ticket?.map((ticket) => ticket.assignedUser.id) || [];
    const [tags, setTags] = useState<Tag[]>([]);
    const [contact, setContact] = useState<string>('');
    const [search, setSearch] = useState<string>(''); // Assuming you meant setSearch instead of setSet
    const [contactList, setContactList] = useState<Contact[]>([]);
    const [allTeamMembers, setAllTeamMembers] = useState<UserType[]>([]);
    const [assignedTo, setAssignedTo] = useState<string>(
        ticketAssignedUser.length > 0 ? ticketAssignedUser[0] : ''
    );

    const saveTimerRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        if (teamMembers) {
            setAllTeamMembers(teamMembers);
        }
    }, [teamMembers]);

    useEffect(() => {
        if (defaultData?.ticket) {
            form.reset({
                name: defaultData.ticket[0]?.name || '',
                description: defaultData.ticket[0]?.description || '',
                value: String(defaultData.ticket[0]?.value || 0),
            });

            if (defaultData.ticket[0]?.customerId) {
                setContact(defaultData.ticket[0].customerId);
            }
        }

        const fetchData = async () => {
            // const {} = useQuery() create the search contacts query from the contact
        };

        fetchData();
    }, [defaultData]);

    const submit = () => {
        // Your submit logic here
        if (!laneId) return;

        try {
            // Your submit logic here
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) {
        return <div><Loading /></div>;
    }

    return (
        <Card className="w-full">
      <CardHeader>
        <CardTitle>Ticket Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="flex flex-col gap-4"
          >
            <FormField
              disabled={isLoading}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket Value</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Value"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <h3>Add tags</h3>
            <TagCreator
              subAccountId={subaccountId}
              getSelectedTags={setTags}
              defaultTags={ticketData?.tags || []}
            />
            <FormLabel>Assigned To Team Member</FormLabel>
            <Select
              onValueChange={setAssignedTo}
              defaultValue={assignedTo}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage alt="contact" />
                        <AvatarFallback className="text-sm bg-bodyTheme-default text-white ">
                          <User2 size={14} />
                        </AvatarFallback>
                      </Avatar>

                      <span className="text-sm text-muted-foreground">
                        Not Assigned
                      </span>
                    </div>
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {allTeamMembers.map((teamMember) => (
                  <SelectItem
                    key={teamMember.id}
                    value={teamMember.id}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          alt="contact"
                          src={teamMember.avatarUrl as string}
                        />
                        <AvatarFallback className="bg-bodyTheme-default text-sm text-white">
                          <User2 size={14} />
                        </AvatarFallback>
                      </Avatar>

                      <span className="text-sm text-muted-foreground">
                        {teamMember.name}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormLabel>Customer</FormLabel>
            <Popover>
              <PopoverTrigger
                asChild
                className="w-full"
              >
                <Button
                  variant="outline"
                  role="combobox"
                  className="justify-between"
                >
                  {contact
                    ? contactList.find((c) => c.id === contact)?.firstName
                    : 'Select Customer...'}
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search..."
                    className="h-9"
                    value={search}
                    onChangeCapture={async (value) => {
                      //@ts-ignore
                      setSearch(value.target.value)
                      if (saveTimerRef.current)
                        clearTimeout(saveTimerRef.current)
                      saveTimerRef.current = setTimeout(async () => {
                        // const response = await searchContacts(
                        //   //@ts-ignore
                        //   value.target.value
                        // )
                        // setContactList(response)
                        setSearch('')
                      }, 1000)
                    }}
                  />
                  <CommandEmpty>No Customer found.</CommandEmpty>
                  <CommandGroup>
                    {contactList.map((c) => (
                      <CommandItem
                        key={c.id}
                        value={c.id}
                        onSelect={(currentValue) => {
                          setContact(
                            currentValue === contact ? '' : currentValue
                          )
                        }}
                      >
                        {c.firstName}
                        <CheckIcon
                          className={cn(
                            'ml-auto h-4 w-4',
                            contact === c.id ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <Button
              className="w-20 mt-4 bg-bodyTheme-default"
              disabled={isLoading}
              type="submit"
            >
              {form.formState.isSubmitting ? <Loading /> : 'Save'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
    );
}
