
import { FaqItem, FaqVideo } from "@/types/faq";

export const faqs: FaqItem[] = [
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
  {
    question: "How can I prevent frozen pipes in winter?",
    answer: "To prevent frozen pipes, insulate exposed pipes, keep your heating on at a low setting during cold periods, and fix any dripping taps. If you're going away, consider draining your water system.",
  },
  {
    question: "What should I do if I notice a water leak?",
    answer: "If you notice a water leak, turn off the water at the main stopcock immediately to prevent further damage. Then call us for emergency assistance. While waiting, place buckets to collect water and move valuable items away from the affected area.",
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
];
