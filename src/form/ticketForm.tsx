import { get_subacc_team_members } from '@/api/user/route';
import Loading from '@/global/loading';
import { useModal } from '@/providers/model-provider-file'
import { Contact, Tag, Ticket, UserType } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

type Props = {
    getNewTicket: any,
    laneId: string,
    subaccountId: string
}
const currencyNumberRegex = /^\d+(\.\d{1,2})?$/
export const TicketFormSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    value: z.string().refine((value) => currencyNumberRegex.test(value), {
      message: 'Value must be a valid price.',
    }),
  })

export default function TicketForm({laneId, subaccountId}: Props) {
    const {data:teamMembers, isLoading} = useQuery("getSubAccTeamMembers", ()=>get_subacc_team_members(subaccountId), {
        retry: false
    });

    if (isLoading) {
        return <div><Loading /></div>
    }

    const { data: defaultData, setClose } = useModal();
    const ticketData = (defaultData.ticket && defaultData.ticket.length > 0) ? defaultData.ticket[0] : null;

    
    const form = useForm<z.infer<typeof TicketFormSchema>>({
        mode: "onChange",
        resolver: zodResolver(TicketFormSchema),
        defaultValues: {
            name: ticketData?.name || "",
            description: ticketData?.description || "",
            value: String(ticketData?.value  || 0),


        }
    });
    const loading = form.formState.isLoading;
    
    // Ensure defaultData.ticket is an array before mapping
    const ticketAssignedUser = defaultData.ticket?.map((ticket) => ticket.assignedUser.id);
    
    // Use empty array as fallback if ticketAssignedUser is undefined
    const assignedUsers = ticketAssignedUser || [];
    
    const [tags, setTags] = useState<Tag[]>([]);
    const [contact, setContact] = useState('');
    const [search, setSearch] = useState(); // Assuming you meant setSearch instead of setSet
    const [contactList, setContactList] = useState<Contact[]>([]);
    const [allTeamMembers, setAllTeamMembers] = useState<UserType[]>([])
    
    // Assign the first element of assignedUsers or an empty string if none
    const [assignedTo, setAssignedTo] = useState(
        assignedUsers.length > 0 ? assignedUsers[0] : ""
    );

    const saveTimerRef = useRef<ReturnType<typeof setTimeout>>();


    useEffect(() => {
        setAllTeamMembers(teamMembers);
    }, [subaccountId]);

    useEffect(() => {
        if (defaultData.ticket) {
            form.reset({
                name: defaultData.ticket[0].name || "",
                description: defaultData.ticket[0].description || "",
                value: String(defaultData.ticket[0].value || 0 )
            })

            if (defaultData.ticket[0].customerId) {
                setContact(defaultData.ticket[0].customerId);
            }
        };

        const fetchData = async () => {
            // const {} = useQuery() create the search contacts query from the contact
        }

        fetchData();
    }, [defaultData]);

    const submit = () => {
        // Your submit logic here
        if (!laneId) return;

        try {
            
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>ticketForm</div>
    );
}
