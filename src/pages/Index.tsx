
import { BookingForm } from "@/components/BookingForm";
import { EmergencyButton } from "@/components/EmergencyButton";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <BookingForm />
      <EmergencyButton />
    </div>
  );
};

export default Index;
