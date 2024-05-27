import { RegisterForm } from "@/form/registerForm";

const Get_Started = () => {
    return (
        <div className="md:flex lg:flex">
            <div className="hidden md:flex md:flex-col md:w-[50%]  md:bg-black h-screen">
                <p className="text-white" >hello</p>
            </div>
            <div className="mx-auto justify-center items-center md:w-[50%] md:my-auto">
            <RegisterForm />
            </div>
        </div>
    )
} 

export default Get_Started;