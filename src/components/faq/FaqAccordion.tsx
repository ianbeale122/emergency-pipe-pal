
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  faqs: FaqItem[];
};

const FaqAccordion = ({ faqs }: FaqAccordionProps) => {
  return (
    <Accordion type="single" collapsible className="animate-fade-up">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqAccordion;
