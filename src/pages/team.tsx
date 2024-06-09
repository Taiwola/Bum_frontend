import { get_team_members } from "@/api/user/route";
import { column } from "@/component/table/column";
import DataTable from "@/component/table/data-table";
import { getAgencydetails } from "@/lib/queries"; // Assuming getAgencydetails is a synchronous function
import {  UserType } from "@/types/types";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useQuery } from "react-query";

type Props = {
  params: { agencyId: string }
}

export default function Team({ params }: Props) {
  // Using react-query to fetch subaccounts
  const { data, isError, error } = useQuery("getTeamMemebers", () => get_team_members(params.agencyId), {
    retry: false
  });

  const teamMembers: UserType[] = data;


  // Assuming getAgencydetails is a synchronous function
  const agencyDetails = getAgencydetails(params.agencyId);

  // Log the subaccounts and handle the error
  useEffect(() => {
    if (isError) {
      console.error("Failed to fetch team:", error);
    } else {
      console.log("team:", teamMembers);
    }
  }, [teamMembers, isError, error]);

  if(!agencyDetails) return

  return (
    <div>
      <DataTable 
      actionButtonText={<><Plus size={14} 
      /> Add </>}
      filterValue="name"
      columns={column}
      data={teamMembers}
      >

      </DataTable>
      
    </div>
  );
}
