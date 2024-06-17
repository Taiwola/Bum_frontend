import { Media } from '@/types/types'
import MediaUploadButton from './upload-button';

type Props = {
    data: Media[],
    subAccountId: string
}

export default function MediaComponent({data, subAccountId}: Props) {
  return (
    <div className='flex flex-col gap-4 h-full w-full'>
        <div className='flex justify-between items-center'>
            <h1 className='text-4xl'>Media Bucket</h1>
            <MediaUploadButton subAccountId={subAccountId} />
        </div>
    </div>
  )
}