import { Button } from './components/ui/button'
import {X} from "lucide-react"

type Props = {
    url: string
}

export default function ImageData({url}: Props) {

  return (
    <>
    <div className="mt-2 flex justify-center items-center">
            <img src={url} alt="Selected file preview" className="max-w-xs max-h-56" />
          </div>
        
        <div className='flex justify-center items-center mt-2'>
            <Button variant="ghost">
                <X /> Remove Logo
            </Button>
        </div>
    </>
    
  )
}