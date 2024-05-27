import { Button } from "./components/ui/button";


const ContactSection = () => {
  return (
    <div className="container mx-auto px-4 py-8" id="contact">
      <h2 className="mb-5 text-center font-bold underline text-4xl">Contact Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Form */}
        <form className="bg-white dark:bg-background dark:border-2 shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600">Name</label>
            <input type="text" id="name" name="name" className="w-full border dark:bg-background border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input type="email" id="email" name="email" className="w-full border dark:bg-background border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-600">Message</label>
            <textarea id="message" name="message" rows={4} className="w-full border dark:bg-background border-gray-300 rounded-md px-3 py-2"></textarea>
          </div>
          <Button type="submit" className="bg-[#CA46E8] text-white py-2 px-4 rounded hover:bg-[#460887] transition-colors duration-300">Send Message</Button>
        </form>

        {/* Contact Information */}
        <div className="bg-white dark:bg-background dark:shadow-neutral-600 shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
          <p className="text-gray-600 mb-4">Feel free to reach out to us via email or phone:</p>
          <div className="flex flex-col space-y-2">
            <p className="text-gray-600"><strong>Email:</strong> info@example.com</p>
            <p className="text-gray-600"><strong>Phone:</strong> +1 (123) 456-7890</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
