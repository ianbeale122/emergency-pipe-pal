
import { Navigation } from "@/components/Navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How often should I service my boiler?",
      answer: "We recommend annual boiler servicing to ensure optimal performance and safety. Regular maintenance helps prevent breakdowns and extends the life of your boiler.",
    },
    {
      question: "What are your emergency call-out rates?",
      answer: "Our emergency call-out rates vary depending on the time of day and type of service required. We provide transparent pricing before beginning any work.",
    },
    {
      question: "Do you offer any guarantees on your work?",
      answer: "Yes, all our work comes with a satisfaction guarantee. Parts and labor are typically warranted for 12 months from the date of service.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 animate-fade-up">Frequently Asked Questions</h1>
          <Accordion type="single" collapsible className="animate-fade-up">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
    </div>
  );
};

export default FAQ;
