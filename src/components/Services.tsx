
import { Wrench, CalendarDays, Settings, Droplet, Home, Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Emergency Repairs",
    description:
      "24/7 emergency plumbing services for urgent issues like burst pipes, leaks, blockages, and boiler breakdowns. Fast response times guaranteed.",
    icon: Wrench,
  },
  {
    title: "Boiler Services",
    description:
      "Expert boiler installations, repairs, and annual maintenance. We service all major brands and ensure your heating system runs efficiently and safely.",
    icon: Thermometer,
  },
  {
    title: "Bathroom Installations",
    description:
      "Complete bathroom installations and renovations, from design to completion. We handle plumbing, tiling, electrics, and finishing touches.",
    icon: Droplet,
  },
  {
    title: "Home Plumbing",
    description:
      "From leaky taps and toilet repairs to pipe replacements and water pressure issues. No job is too small for our experienced plumbers.",
    icon: Home,
  },
  {
    title: "Heating Systems",
    description:
      "Installation and maintenance of central heating systems, radiators, and underfloor heating solutions to keep your home warm and comfortable.",
    icon: CalendarDays,
  },
  {
    title: "Commercial Plumbing",
    description:
      "Reliable commercial plumbing services for businesses, including planned maintenance, emergency repairs, and compliance testing.",
    icon: Settings,
  },
];

export const Services = () => {
  return (
    <section className="py-24 bg-white" id="services">
      <div className="container px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl font-bold mb-4">Our Comprehensive Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Professional plumbing and heating services delivered by experienced, Gas Safe registered engineers. All work guaranteed and fully insured.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
