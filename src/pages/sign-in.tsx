import { SignInForm } from "@/form/sign-in";


const Sign_in = () => {
    
    return (
        <div className="md:flex lg:flex">
            <div className="hidden md:flex md:flex-col md:w-[50%]  md:bg-black h-screen">
                <p className="text-white" >hello</p>
            </div>
            <div className="mx-auto md:w-[50%] my-auto flex items-center justify-center h-screen">
                <SignInForm />
            </div>
        </div>
    )
}

export default Sign_in;