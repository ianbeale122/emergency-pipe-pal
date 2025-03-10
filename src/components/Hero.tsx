
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container px-4 py-32 text-center">
        <div className="animate-fade-up">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Trusted Local Plumbing Services
            <br />
            <span className="text-primary">For Your Home & Business</span>
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-600">
            Available 24/7 for all your plumbing needs. From emergency repairs and boiler servicing to bathroom installations and heating systems.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="gap-2"
              asChild
            >
              <a href="#book-service">Call for Service</a>
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
