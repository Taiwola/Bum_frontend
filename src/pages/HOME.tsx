import { Button } from "@/component/components/ui/button"
import { BackgroundGradientAnimation } from "@/component/components/ui/gradients"
import Header from "@/component/header";
import About_us from "../assets/undraw_Personal_website_re_c8dv (1).png";
import Services from "../assets/undraw_Services_re_hu5n.png";
import { InfiniteMovingCards } from "@/component/components/ui/moving-card";
import FAQSection from "@/component/Faq";
import PricingSection from "@/component/PriceSection";
import ContactSection from "@/component/contact";
import Footer from "@/component/footer";


const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];

export default function Home() {
  return (
    <>
    <main className="relative overflow-x-hidden overflow-y-hidden">
    <Header />
    <BackgroundGradientAnimation>
    <div className="container absolute z-40 inset-0 flex flex-col gap-4 items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-5xl">
        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
        Welcome to BUMS - Streamline Your Company's Daily Operations
        </p>
        <p className="text-base mt-2 bg-clip-text bg-gradient-to-b text-transparent from-white/50 to-white/20 container">
        Empower your team, supercharge productivity, and simplify workflows with our cutting-edge SaaS platform. Say goodbye to manual processes and hello to seamless efficiency. Whether it's project management, communication, or data analysis, Bums has you covered. Join the ranks of forward-thinking companies revolutionizing their daily activities. Ready to elevate your operations to the next level?
        </p>
      </div>
    </BackgroundGradientAnimation>

   {/* about us */}
      <div className="container bg-transparent mb-4">
        <div>
          <h1 className="mt-5 text-center font-bold underline text-4xl">About us</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5 place-items-center">
            <div className="mx-auto hidden md:block">
              <img src={About_us} alt="" />
            </div>
            <div className="flex flex-col gap-2">
                <p>
                At BUMS, we're passionate about simplifying the complex and streamlining everyday tasks for businesses of all sizes. Founded on the belief that efficiency is the cornerstone of success, we embarked on a mission to develop a SaaS platform that empowers companies to optimize their daily activities with ease.
                </p>
                <p>
                Driven by innovation and guided by expertise, our team brings together a diverse range of talents, from seasoned developers to industry experts. We're dedicated to staying ahead of the curve, continuously refining and enhancing our platform to meet the evolving needs of our users.
                </p>

                <p>
                Our commitment to excellence extends beyond just delivering cutting-edge technology. We prioritize user experience, ensuring that our platform is not only powerful but also intuitive and user-friendly. With BUMS, you'll experience the perfect blend of functionality and simplicity.
                </p>
                <Button className="bg-[#CA46E8] md:max-w-fit hover:bg-[#460887] rounded">Get Started</Button>
            </div>
        </div>
      </div>

      {/* features */}
      <div className="container rounded mx-auto px-4 py-8 bg-[#F5F7F8]">
  <h1 className="mt-5 text-center font-bold underline text-4xl">Our Features to Transform Your Workflow</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Intuitive Project Management</h3>
      <p className="text-gray-700">Seamlessly organize tasks, set deadlines, and track progress with our intuitive project management tools. Keep your team focused and projects on schedule.</p>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Effortless Communication</h3>
      <p className="text-gray-700">Say goodbye to endless email chains and scattered messaging platforms. Our integrated communication suite keeps all team discussions centralized and easily accessible, fostering collaboration like never before.</p>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Data Insights at Your Fingertips</h3>
      <p className="text-gray-700">From real-time performance metrics to comprehensive reports, gain valuable insights to drive your company forward.</p>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Customizable Workflows</h3>
      <p className="text-gray-700">Tailor our platform to suit your company's unique needs. With customizable workflows, you can automate repetitive tasks and streamline processes, saving time and boosting productivity.</p>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Secure Document Management</h3>
            <p>Protect your sensitive information with our state-of-the-art document management system. Share files securely, control access levels, and ensure compliance with industry regulations.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Seamless Integration</h3>
            <p className="text-gray-700"> Integrate with your favorite tools and services effortlessly. Whether it's CRM software, accounting platforms, or cloud storage solutions, our seamless integrations ensure smooth data flow across your entire ecosystem.</p>
          </div>
  </div>
</div>


{/* services */}
<div className="container bg-transparent mb-5">
        <div>
          <h1 className="mt-5 text-center font-bold underline text-4xl">Services for Every Business Stage</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5 place-items-center">
            <div className="flex flex-col gap-2">
               <p>At BUMS, we believe in leveling the playing field. Whether you're a startup looking to disrupt the market or an established enterprise aiming to stay ahead of the curve, our services are tailored to meet your needs.</p>

               <p><strong>Startups:</strong> Launching a new venture? We've got you covered. Our scalable solutions provide the flexibility and agility you need to innovate and grow without breaking the bank. From streamlining workflows to maximizing efficiency, we'll help you lay the foundation for success.</p>

               <p><strong>Established Enterprises:</strong> Already established in the market? Our services are designed to help you thrive in today's fast-paced business landscape. With robust features and customizable workflows, we'll empower your team to adapt, evolve, and stay ahead of the competition.</p>

               <p><strong>No matter where you are on your business journey, we're here to support you every step of the way.</strong></p>
            </div>
            <div className="mx-auto hidden md:block">
              <img src={Services} alt="" />
            </div>
        </div>
      </div>

      {/* how it works */}
      <div className="container mx-auto px-4 py-8 bg-[#F5F7F8] rounded">
  <h2 className="mb-5 text-center font-bold underline text-4xl">How It Works</h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    
    <div className="flex items-center">
      <div className="h-16 w-16 bg-[#CA46E8] text-white rounded-full flex items-center justify-center mr-4">1</div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
        <p>Create an account to get started with our platform.</p>
      </div>
    </div>
    
    
    <div className="flex items-center">
      <div className="h-16 w-16 bg-[#CA46E8] text-white rounded-full flex items-center justify-center mr-4">2</div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Customize</h3>
        <p>Personalize your settings and preferences according to your needs.</p>
      </div>
    </div>
    
   
    <div className="flex items-center">
      <div className="h-16 w-16 bg-[#CA46E8] text-white rounded-full flex items-center justify-center mr-4">3</div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Start Using</h3>
        <p>Begin using our platform to streamline your daily activities.</p>
      </div>
    </div>
    
   
    <div className="flex items-center">
      <div className="h-16 w-16 bg-[#CA46E8] text-white rounded-full flex items-center justify-center mr-4">4</div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Integrate</h3>
        <p>Integrate with your existing tools and services for seamless workflow.</p>
      </div>
    </div>
    
    
    <div className="flex items-center">
      <div className="h-16 w-16 bg-[#CA46E8] text-white rounded-full flex items-center justify-center mr-4">5</div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Grow</h3>
        <p>Watch your business grow with our powerful SaaS solution.</p>
      </div>
    </div>
  </div>
</div>

{/* testimonial */}
<div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>

    {/* pricing section */}
    <PricingSection />

    {/* FAQ */}
    <FAQSection />

    {/* contact */}
    <ContactSection />

    {/* footer */}
    <Footer />
    </main>
    </>
  )
}
