import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/component/components/ui/dialog"
import { useModal } from "@/providers/model-provider-file"
import React from "react"

type Props = {
    title: string,
    subheading: string,
    children: React.ReactNode
    defaultOpen?: boolean
}

export default function CustomModel({children, defaultOpen, subheading, title}: Props) {
    const {isOpen, setClose} = useModal()
  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
        <DialogContent className="overflow-y-scroll rounded md:max-h-[550px] h-screen bg-card w-full">
            <DialogHeader className="pt-8 text-left">
                <DialogTitle className="text-2xl font-bold">
                    {title}
                </DialogTitle>
                <DialogDescription>{subheading}</DialogDescription>
                {children}
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}