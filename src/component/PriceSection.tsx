import { Button } from "./components/ui/button";


const PricingSection = () => {
  return (
    <div className="container bg-[#F5F7F8] mx-auto px-4 py-8">
      <h2 className="mb-5 text-center font-bold underline text-4xl">Pricing Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pricing Card 1 */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Basic</h3>
          <ul className="text-gray-600">
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
            {/* Add more features */}
          </ul>
          <div className="mt-4">
            <p className="text-2xl font-bold">$9.99/mo</p>
            <p className="text-sm text-gray-500">Billed annually</p>
          </div>
          <Button variant="default" className="mt-6 bg-[#CA46E8] text-white rounded hover:bg-[#460887] transition-colors duration-300">Sign Up</Button>
        </div>

        {/* Pricing Card 2 */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Pro</h3>
          <ul className="text-gray-600">
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
            {/* Add more features */}
          </ul>
          <div className="mt-4">
            <p className="text-2xl font-bold">$19.99/mo</p>
            <p className="text-sm text-gray-500">Billed annually</p>
          </div>
          <Button className="mt-6 bg-[#CA46E8] text-white py-2 px-4 rounded hover:bg-[#460887] transition-colors duration-300">Sign Up</Button>
        </div>

        {/* Pricing Card 3 - Recommended */}
        <div className="bg-white shadow-lg rounded-lg p-6 border-2 border-[#CA46E8]">
          <h3 className="text-xl font-semibold mb-4">Premium</h3>
          <ul className="text-gray-600">
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
            {/* Add more features */}
          </ul>
          <div className="mt-4">
            <p className="text-2xl font-bold">$29.99/mo</p>
            <p className="text-sm text-gray-500">Billed annually</p>
          </div>
          <Button className="mt-6 bg-[#CA46E8] text-white py-2 px-4 rounded hover:bg-[#460887] transition-colors duration-300">Sign Up</Button>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
