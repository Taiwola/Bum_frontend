import { Button } from "@/component/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/component/components/ui/dropdown-menu";
import { Link } from "react-router-dom";


type UserProps = {
    firstname?: string,
    lastname?: string,
    email?: string
}

const UserAcctNav = ({user}: {user: UserProps}) => {

    function signOut(event: any): void {
        throw new Error("Function not implemented.");
    }

    const firstInitial = user.firstname ? user.firstname[0] : '';
    const secondInitial = user.lastname ? user.lastname[0] : '';

    const initials = firstInitial.toUpperCase() + secondInitial.toUpperCase();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
            asChild
            className="overflow-visible"
            >
                <Button
                variant='ghost'
                size='sm'
                className="relative"
                >
                    my account
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-64" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-0.5 leading-none">
                                <span className="inline-flex gap-2 items-center">
                                <p className="font-medium">{user.email}</p>
                                </span>
                        </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link to='/dashboard'>Dashboard</Link>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAcctNav;