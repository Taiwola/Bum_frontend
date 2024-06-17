import Loading from "@/global/loading"

type Props = {}

export default function LoadingAgency({}: Props) {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
        <Loading></Loading>
    </div>
  )
}