import { Tag, TagPartial } from "@/types/types"
import { useEffect, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./components/ui/alert-dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./components/ui/command";
import TagComponent from "./tagComponent";
import { PlusCircleIcon, TrashIcon, X } from "lucide-react";
import { useToast } from "./components/ui/use-toast";
import { useMutation } from "react-query";
import { create_tag } from "@/api/tags/tag.route";

type Props = {
    subAccountId: string
    getSelectedTags:  (tags: Tag[]) => void,
    defaultTags: Tag[]
}

interface ValueInterface {
  color: string,
  subAccountId: string,
  name: string
}

const TagColors = ['BLUE', 'ORANGE', 'ROSE', 'PURPLE', 'GREEN'] as const;
export type tagColor = (typeof TagColors)[number];
export default function TagCreator({defaultTags, getSelectedTags, subAccountId}: Props) {
    const [selectTags, setSelectedTags] = useState<Tag[]>(defaultTags || []);
    const [tags, setTags] = useState<TagPartial[]>([]);
    const [value, setValue] = useState('')
    const [selectedColor, setSelectedColor] = useState('');
    const {toast} = useToast();
    const onMutation = useMutation(create_tag, {
      onSuccess: () => {
        toast({
          title: "Tag",
          description: 'Tag created successfully',
          variant: "default"
        })
      },
      onError: () => {
        toast({
          title: "Tag",
          description: 'Tag creation failed',
          variant: "destructive"
        })
      }
    });

    useEffect(() => {
        getSelectedTags(selectTags);
    }, [selectTags]);


    useEffect(() => {
      //WIP: GET TAGS FOR WHERE THE SUBACCOUNT ID EXIST 
    })

    const handleDeleteSelection = (tagId: string) => {
        setSelectedTags(selectTags.filter((tag) => tag.id !== tagId));
    }

    const handleAddTag = () => {
       if(!value) {
        toast({
          variant: 'destructive',
          title: 'Tags need to have a name',
        })
        return
       }

       if (!selectedColor) {
        toast({
          variant: 'destructive',
          title: 'Please Select a color',
        })
        return
      }

      const tagData: ValueInterface = {
        color: selectedColor as string,
        name: value,
        subAccountId: subAccountId,
      }

      setTags([...tags, tagData]);

      try {
        onMutation.mutate(tagData);
      } catch (error) {
        console.log(error);
        toast({
          variant: 'destructive',
          title: 'Could not create tag',
        })
      }
    }

    const handleDeleteTag = (value: string) => {
        console.log("DELETEtag")
    }

    const handleAddSelections = (value:any) => {
        console.log("handleselect")
    }
  return (
   <AlertDialog>
    <Command className="!bg-transparent">
        {!!selectTags.length && (
            <div className="flex flex-wrap gap-2 p-2 bg-background border-2 rounded-md">
                {selectTags?.map((tag) => (
                    <div className="flex items-center" key={tag.id}>
                        <TagComponent 
                        title={tag.name}
                        colorName={tag.color}
                        key={tag.id}
                        />

                        <X
                        className="text-muted-foreground"
                        size={14}
                        onClick={() => handleDeleteSelection(tag.id)}
                        />

                    </div>
                ))}
            </div>
        )}
         <div className="flex items-center gap-2 my-2">
                    {
                        TagColors.map((colorName) => (
                            <TagComponent
                            key={colorName}
                            selectedColor={setSelectedColor}
                            title=""
                            colorName={colorName}
                            />
                        ))
                    }
                </div>
                <div className="relative">
          <CommandInput
            placeholder="Search for tag..."
            value={value}
            onValueChange={setValue}
          />
          <PlusCircleIcon
            onClick={handleAddTag}
            size={20}
            className="absolute top-1/2 transform -translate-y-1/2 right-2 hover:text-primary transition-all cursor-pointer text-muted-foreground"
          />
        </div>
        <CommandList>
          <CommandSeparator />
          <CommandGroup heading="Tags">
            {tags.map((tag) => (
              <CommandItem
                key={tag?.id}
                className="hover:!bg-secondary !bg-transparent flex items-center justify-between !font-light cursor-pointer"
              >
                <div onClick={() => handleAddSelections(tag)}>
                  <TagComponent
                    title={tag.name as string}
                    colorName={tag.color as string}
                    key={tag.color as string}
                  />
                </div>

                <AlertDialogTrigger>
                  <TrashIcon
                    size={16}
                    className="cursor-pointer text-muted-foreground hover:text-rose-400  transition-all"
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-left">
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-left">
                      This action cannot be undone. This will permanently delete
                      your the tag and remove it from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="items-center">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive"
                      onClick={() => handleDeleteTag(tag.id as string)}
                    >
                      Delete Tag
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandEmpty>No results found.</CommandEmpty>
        </CommandList>
    </Command>
   </AlertDialog>
  )
}