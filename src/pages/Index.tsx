
import { BookingForm } from "@/components/BookingForm";
import { EmergencyButton } from "@/components/EmergencyButton";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Services } from "@/components/Services";
import { WifiHigh } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-destructive to-primary animate-[flow_2s_linear_infinite]" />
      <div className="fixed -z-10 top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-[float_10s_ease-in-out_infinite] opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`
            }}
          >
            <WifiHigh 
              className="h-24 w-24 rotate-90 text-primary" 
              style={{ transform: `rotate(${Math.random() * 360}deg)` }}
            />
          </div>
        ))}
      </div>
      <Hero />
      <Services />
      <BookingForm />
      <EmergencyButton />
    </div>
  );
};

export default Index;
