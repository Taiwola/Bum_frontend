import { Button } from "@/component/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/component/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/component/components/ui/popover";
import { cn } from "@/lib/utils";
import { useModal } from "@/providers/model-provider-file";
import { Pipeline } from "@/types/types";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CustomModel from "./custom-model";
import CreatePipelineForm from "@/form/createPipelineForm";

type Props = {
  pipelineId: string;
  subAccountId: string;
  pipelines: Pipeline[];
};

export default function PipelineinfoBar({ pipelineId, pipelines = [], subAccountId }: Props) {
  const { setOpen: setOpenModal, setClose } = useModal();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(pipelineId);

  const handleClickCreatePipeline = () => {
   setOpenModal(
    <CustomModel
    title="Create a pipeline"
    subheading="Pipelines allows you to group tickets together into lanes and track your business processes all in one place"
    >
        <CreatePipelineForm subAccountId={subAccountId} />
    </CustomModel>
   )
  };

  return (
    <div>
      <div className="flex items-end gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between rounded"
            >
              {value ? pipelines?.find((pipeline) => pipeline.id === value)?.name : 'Select a pipeline'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
                  <CommandList>
              <CommandEmpty>No pipelines found</CommandEmpty>
              <CommandGroup>
                {pipelines?.map((pipeline) => (
                  <Link className="cursor-pointer" key={pipeline.id} to={`/subaccount/${subAccountId}/pipelines/${pipeline.id}`}>
                    <CommandItem
                      key={pipeline.id}
                      value={pipeline.id}
                      onSelect={(currentValue) => {
                        setValue(currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === pipeline.id ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {pipeline.name}
                    </CommandItem>
                   
                  </Link>
                ))}
                <Button
                  variant={"secondary"}
                  className="flex rounded gap-2 w-full mt-4"
                  onClick={handleClickCreatePipeline}
                  >
                  <Plus size={10} /> Create Pipeline
                </Button>
              </CommandGroup>
                    </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
