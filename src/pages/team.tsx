import { get_all_subaccount } from "@/api/subaccount/route";
import { getAgencydetails } from "@/lib/queries"; // Assuming getAgencydetails is a synchronous function
import { SubAccountType } from "@/types/types";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

type Props = {
  params: { agencyId: string }
}

export default function Team({ params }: Props) {
  // Using react-query to fetch subaccounts
  const { data: subaccounts, isError, error } = useQuery("getAllSubaccount", get_all_subaccount, {
    retry: false
  });

  // creating states for the sub accounts


  // Assuming getAgencydetails is a synchronous function
  const agencyDetails = getAgencydetails(params.agencyId);

  // Log the subaccounts and handle the error
  useEffect(() => {
    if (isError) {
      console.error("Failed to fetch subaccounts:", error);
    } else {
      console.log("Subaccounts:", subaccounts);
    }
  }, [subaccounts, isError, error]);

  if(!agencyDetails) return

  return (
    <div>
      <h1>Team</h1>
      <div>
        <h2>Agency Details</h2>
        <pre>{JSON.stringify(agencyDetails, null, 2)}</pre>
      </div>
      <div>
        <h2>Subaccounts</h2>
        {subaccounts ? (
          subaccounts.map((subaccount: SubAccountType, index: number) => (
            <div key={index}>
              {/* Render each subaccount item */}
              <p>{subaccount.name}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
