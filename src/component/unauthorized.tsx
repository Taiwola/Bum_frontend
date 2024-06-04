import { Link } from 'react-router-dom'

type Props = {}

export default function Unauthorized({}: Props) {
  return (
    <div>
         <div className="p-4 text-center h-screen w-screen flex justify-center items-center flex-col">
      <h1 className="text-3xl md:text-6xl">Unauthorized acccess!</h1>
      <p>Please contact support or your agency owner to get access</p>
      <Link
        to="/"
        className="mt-4 bg-primary p-2"
      >
        Back to home
      </Link>
    </div>
    </div>
  )
}