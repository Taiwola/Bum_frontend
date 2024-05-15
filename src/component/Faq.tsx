import { useState } from 'react';

const FAQSection = () => {
  // State to manage which accordion item is open
  const [openIndex, setOpenIndex] = useState(null);

  // Data for FAQ items - you can replace it with your own data
  const faqData = [
    {
      question: 'What are the pricing plans?',
      answer: 'We offer flexible pricing plans to suit businesses of all sizes. Please visit our pricing page for more details.',
    },
    {
      question: 'What features are included?',
      answer: 'Our platform includes a range of features, including project management, communication tools, data insights, customizable workflows, and secure document management.',
    },
    {
      question: 'Is customer support available?',
      answer: 'Yes, we provide top-tier customer support to assist you with any questions or issues you may encounter.',
    },
    // Add more FAQ items as needed
  ];

  // Function to toggle accordion items
  const toggleAccordion = (index: any) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="mb-5 text-center font-bold underline text-4xl">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <div
              className={`flex justify-between items-center cursor-pointer p-4 ${
                openIndex === index ? 'bg-[#CA46E8]' : ''
              }`}
              onClick={() => toggleAccordion(index)}
            >
              <h3 className="text-lg font-semibold">{item.question}</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 transform transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0)',
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            {openIndex === index && (
              <div className="p-4 bg-gray-50">
                <p className="text-gray-600">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
