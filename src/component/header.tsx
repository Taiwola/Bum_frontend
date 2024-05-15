import { Menu, X } from "lucide-react";
import { useState } from "react";
import MaxWidthWrapper from "./maxWithWrapper";
import { Button } from "./components/ui/button";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: "Home", link: "/" },
        { name: "Service", link: "/" },
        { name: "About", link: "/" },
        { name: "Contact", link: "/" }
    ];

    return (
        <header className="absolute w-full top-2 z-50">
            <MaxWidthWrapper>
            <nav className="container mx-auto px-4  z-50 md:px-4 lg:px-8 py-4 md:py-4 rounded-[10px]">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold text-white">BUMS</h1>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 focus:outline-none transition-all duration-500">
                            {isOpen ? <X size={24} /> : <Menu size={24}  className="text-white"/>}
                        </button>
                    </div>
                    <ul className={`md:flex md:items-center space-y-4 md:space-y-0 md:space-x-8 mt-4 md:mt-0 ${isOpen ? 'absolute right-0 top-0 bg-[#CA46E8] z-[70] w-full  p-4 mt-0 transition-all duration-500 mb-11' : 'hidden'}`}>
                        {isOpen ? (<div className="flex justify-end cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                            <X size={24}  />
                        </div>) : ""}
                        {links.map((item, index) => (
                            <li key={index}>
                                <a href={item.link} className={`${isOpen ? "text-black" : "text-white" } hover:text-gray-600 font-medium `}>{item.name}</a>
                            </li>
                        ))}
                         <Button className="bg-[#470A8A] rounded text-white">Get Started</Button>
                    </ul>
                </div>
                   
            </nav>
            </MaxWidthWrapper>
        </header>
    );
}
