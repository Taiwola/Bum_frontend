import { useToast } from "./components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import { loggingUserOut } from "@/lib/queries"
import { useMutation } from "react-query";
import { logOut } from "@/api/auth/route";

type Props = {}



export default function LogoutButton({}: Props) {
    const {toast} = useToast();
    const navigate = useNavigate();
    const onMutate = useMutation('logUserOut', () => logOut(), {
        retry: false
    });

    const handleLogOut = async () => {
    
        try {
           onMutate.mutate()
            toast({
                   title: 'Success',
                description: 'uSER LOGGED OUT',
                 });
                 sessionStorage.removeItem('token');
                 localStorage.removeItem('vite-ui-theme');
                 navigate('/');
        } catch (error) {
            console.error(error);
            toast({
                    variant: 'destructive',
                    title: 'Oppse!',
                   description: 'Could not log user out',
               })
        }
    }
  return (
    <div onClick={() =>handleLogOut()} className="p-2 font-semibold cursor-pointer text-muted-foreground" >sign out</div>
  )
}