import { getAuthUserDetails } from "@/lib/queries";
import { useParams } from "react-router-dom"

type Props = {}

export default function Dashboard({}: Props) {
  const params = useParams();
  const Id = params.Id;
  const data = getAuthUserDetails();
  return (
    <div>{Id}</div>
  )
}