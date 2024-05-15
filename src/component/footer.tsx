import { X } from "lucide-react";


const Footer = () => {
  return (
    <footer className="bg-[#460887] py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Navigation Links */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xl font-semibold mb-4 text-white">Bums</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xl font-semibold mb-4 text-white">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  {/* Insert your social media icon here (e.g., Facebook, Twitter, LinkedIn) */}
                  <X />
                </svg>
              </a>
              {/* Add more social media icons */}
            </div>
          </div>
        </div>

        {/* Copyright Information */}
        <div className="mt-8 text-center">
          <p className="text-gray-300">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
