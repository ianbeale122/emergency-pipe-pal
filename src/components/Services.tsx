
import { Wrench, CalendarDays, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Emergency Repairs",
    description:
      "24/7 emergency plumbing service for urgent issues like burst pipes, boiler breakdowns, or flooding.",
    icon: Wrench,
  },
  {
    title: "Annual Boiler Service",
    description:
      "Comprehensive boiler maintenance to ensure efficiency and prevent unexpected breakdowns.",
    icon: CalendarDays,
  },
  {
    title: "General Plumbing",
    description:
      "From leaky taps to complete bathroom installations, we handle all plumbing needs.",
    icon: Settings,
  },
];

export const Services = () => {
  return (
    <section className="py-24 bg-white" id="services">
      <div className="container px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Professional plumbing services tailored to your needs, from emergency repairs to routine maintenance.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="flex flex-col items-center p-6 text-center rounded-lg border bg-white shadow-sm transition-all hover:shadow-md animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-3 rounded-full bg-primary/5 mb-4">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <Button variant="outline" className="mt-auto" asChild>
                <a href="#book-service">Book Now</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
