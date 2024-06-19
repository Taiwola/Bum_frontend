import { Media } from '@/types/types'
import MediaUploadButton from './upload-button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from './components/ui/command';
import { CommandItem } from 'cmdk';
import MediaCard from './mediaCard';
import { FolderSearch } from 'lucide-react';

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
        <Command className='bg-transparent'>
          <CommandInput placeholder='Search for file name...' />
          <CommandGroup heading="Agency">
          <CommandList className='pb-40 max-h-full'>
            <CommandEmpty>No media file</CommandEmpty>
            <div className='flex flex-wrap gap-4 pt-4'>
              {data?.map((media) => (
                <CommandItem key={media.id} className='p-0 max-w-[300px] w-full rounded-lg !bg-transparent !font-medium !text-white'>
                  <MediaCard media={media} />
                </CommandItem>
              ))}
              {!data?.length  && (
                <div className='flex items-center justify-center w-full flex-col'>
                  <FolderSearch 
                  size={200}
                  className='dark:text-muted text-slate-300'
                  />
                  <p className='text-muted-foreground'>
                    Empty! no files to show
                  </p>
                </div>
              )}
            </div>
          </CommandList>
          </CommandGroup>
        </Command>
    </div>
  )
}