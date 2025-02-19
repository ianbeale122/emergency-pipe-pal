
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container px-4 py-32 text-center">
        <div className="animate-fade-up">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Professional Plumbing Services
            <br />
            <span className="text-primary">When You Need Them Most</span>
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-600">
            Available 24/7 for emergencies. Expert plumbers ready to help with your
            boiler service, repairs, and installations.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              variant="destructive"
              className="gap-2"
              asChild
            >
              <a href="tel:+1234567890">
                <Phone className="h-5 w-5" />
                Emergency Service
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2"
              asChild
            >
              <a href="#book-service">Book Annual Service</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
