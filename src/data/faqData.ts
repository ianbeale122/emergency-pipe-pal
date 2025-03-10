
import { FaqItem, FaqVideo } from "@/types/faq";

export const faqs: FaqItem[] = [
  {
    question: "How often should I service my boiler?",
    answer: "We recommend an annual boiler service to ensure safe and efficient operation. Regular servicing helps identify potential issues before they become major problems, extends the life of your boiler, and maintains manufacturer warranties. For older systems, consider servicing twice a year.",
  },
  {
    question: "Do you provide gas safety certificates for landlords?",
    answer: "Yes, our Gas Safe registered engineers can provide legally required Landlord Gas Safety Records (CP12 certificates). These certificates confirm that all gas appliances, fittings, and flues in your rental property are safe to use. Landlords are legally required to have this inspection done annually.",
  },
  {
    question: "What causes low water pressure in my home?",
    answer: "Low water pressure can be caused by several factors including leaks in your plumbing system, partially closed valves, blocked pipes due to limescale build-up, issues with the main water supply, or problems with your pressure regulator. Our engineers can diagnose and fix the specific cause in your home.",
  },
  {
    question: "How quickly can you respond to an emergency?",
    answer: "We offer a 24/7 emergency service with rapid response times. For critical emergencies like major leaks or complete boiler failures, we aim to be with you within 60-90 minutes. For less urgent issues, we'll arrange a same-day visit whenever possible.",
  },
  {
    question: "Why is my radiator cold at the top but hot at the bottom?",
    answer: "This common issue is typically caused by air trapped in your radiator, preventing hot water from circulating properly. The solution is to 'bleed' the radiator, which releases the trapped air. Our engineers can perform this service or guide you through the process if you prefer to do it yourself.",
  },
  {
    question: "Do you offer warranties on new boiler installations?",
    answer: "Yes, all our new boiler installations come with manufacturer warranties ranging from 5-10 years depending on the model. Additionally, we provide our own 2-year labor warranty on the installation work. Extended warranty options are also available with our service plans.",
  },
  {
    question: "How can I prevent frozen pipes in winter?",
    answer: "To prevent frozen pipes, ensure adequate insulation for exposed pipes, keep your heating on at a low setting during cold periods, and fix any dripping taps. If you're going away during winter, consider draining your water system or leaving the heating on low. We also offer preventative winterization services.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods including credit/debit cards, bank transfers, and cash. For larger jobs, we offer payment plans to help spread the cost. All payments are processed securely, and we provide detailed invoices for all work completed.",
  },
];

export const plumbingVideos: FaqVideo[] = [
  {
    id: 1,
    title: "How to Fix a Dripping Tap",
    thumbnail: "https://images.unsplash.com/photo-1540587659271-5a67befab240",
    duration: "5:23",
    category: "Plumbing",
  },
  {
    id: 2,
    title: "Unblocking a Sink",
    thumbnail: "https://images.unsplash.com/photo-1540518614846-7eded433c457",
    duration: "4:15",
    category: "Plumbing",
  },
  {
    id: 3,
    title: "How to Stop a Running Toilet",
    thumbnail: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b",
    duration: "6:42",
    category: "Plumbing",
  },
  {
    id: 4,
    title: "Dealing with Low Water Pressure",
    thumbnail: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7",
    duration: "7:18",
    category: "Plumbing",
  },
  {
    id: 5,
    title: "Checking Your Boiler Pressure",
    thumbnail: "https://images.unsplash.com/photo-1524270000-94f8ff3b8ff2",
    duration: "3:45",
    category: "Heating",
  },
  {
    id: 6,
    title: "Bleeding Radiators Guide",
    thumbnail: "https://images.unsplash.com/photo-1581092242409-b27d24be9536",
    duration: "4:32",
    category: "Heating",
  },
  {
    id: 7,
    title: "Understanding Your Heating Controls",
    thumbnail: "https://images.unsplash.com/photo-1605218348041-47e9e89e9e1f",
    duration: "6:15",
    category: "Heating",
  },
  {
    id: 8,
    title: "Preventing Frozen Pipes",
    thumbnail: "https://images.unsplash.com/photo-1590496794008-383c8070b257",
    duration: "5:47",
    category: "Maintenance",
  },
  {
    id: 9,
    title: "Water Heater Maintenance Tips",
    thumbnail: "https://images.unsplash.com/photo-1535990379313-5cd089d8b059",
    duration: "8:22",
    category: "Maintenance",
  },
];
