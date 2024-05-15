import { cn } from "@/lib/utils"
import { ReactNode } from "react"

const MaxWidthWrapper = (
    {
    children,
    className
    } : {
        children: ReactNode
        className?: string,
    }
) => {
    return (
        <div className={cn("mx-auto w-full max-w-screen-2xl px-2 md:px-20", className)}>
                {children}
        </div>
    )
}

export default MaxWidthWrapper