
import { BookingForm } from "@/components/BookingForm";
import { EmergencyButton } from "@/components/EmergencyButton";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Services } from "@/components/Services";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Services />
      <BookingForm />
      <EmergencyButton />
    </div>
  );
};

export default Index;
