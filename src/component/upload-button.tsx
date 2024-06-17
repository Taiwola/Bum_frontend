import { useModal } from '@/providers/model-provider-file'
import React from 'react'
import { Button } from './components/ui/button'
import CustomModel from '@/global/custom-model'
import UploadMediaForm from '@/form/uploadMediaForm'
import { Upload } from 'lucide-react'

type Props = {
    subAccountId: string
}

export default function MediaUploadButton({subAccountId}: Props) {
    const {data, isOpen, setClose, setOpen} = useModal()

  return (
    <Button
    className='rounded bg-bodyTheme-default flex gap-2'
    onClick={() => {
        setOpen(
            <CustomModel
            title='Upload a media'
            subheading='Upload a file to your media bucket'
            >
                <UploadMediaForm subAccountId={subAccountId} />
            </CustomModel>
        )
    }}
    >Upload <Upload  size={15}/>
    </Button>
  )
}