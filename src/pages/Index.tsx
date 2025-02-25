
import { BookingForm } from "@/components/BookingForm";
import { EmergencyButton } from "@/components/EmergencyButton";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Services } from "@/components/Services";
import { WifiHigh, Droplet, Wrench, ShowerHead } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [activeEffects, setActiveEffects] = useState<Record<string, boolean>>({});

  const triggerEffect = (id: string) => {
    setActiveEffects(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setActiveEffects(prev => ({ ...prev, [id]: false }));
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      {/* Flowing water effect at the top */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-destructive to-primary animate-[flow_2s_linear_infinite]" />
      
      {/* Background animated elements */}
      <div className="fixed -z-10 top-0 left-0 w-full h-full overflow-hidden">
        {/* Water waves */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`wave-${i}`}
            className={`absolute cursor-pointer transition-all duration-300 ${
              activeEffects[`wave-${i}`] ? 'scale-150 opacity-30' : 'opacity-10'
            } animate-[float_10s_ease-in-out_infinite]`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`
            }}
            onClick={() => triggerEffect(`wave-${i}`)}
          >
            <WifiHigh 
              className="h-24 w-24 rotate-90 text-primary" 
              style={{ transform: `rotate(${Math.random() * 360}deg)` }}
            />
          </div>
        ))}
        
        {/* Floating droplets */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`droplet-${i}`}
            className={`absolute cursor-pointer transition-all duration-300 ${
              activeEffects[`droplet-${i}`] ? 'scale-150 opacity-30' : 'opacity-10'
            } animate-[droplet_15s_linear_infinite]`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `-50px`,
              animationDelay: `${i * 3}s`
            }}
            onClick={() => triggerEffect(`droplet-${i}`)}
          >
            <Droplet className="h-8 w-8 text-primary" />
          </div>
        ))}
        
        {/* Tools animation */}
        {[...Array(2)].map((_, i) => (
          <div
            key={`tool-${i}`}
            className={`absolute cursor-pointer transition-all duration-300 ${
              activeEffects[`tool-${i}`] ? 'animate-[spin_1s_linear_infinite] opacity-20' : 'animate-[spin_20s_linear_infinite] opacity-5'
            }`}
            style={{
              right: `${20 + i * 40}%`,
              bottom: `${20 + i * 30}%`,
              animationDelay: `${i * 5}s`
            }}
            onClick={() => triggerEffect(`tool-${i}`)}
          >
            <Wrench className="h-32 w-32 text-primary" />
          </div>
        ))}
        
        {/* Shower head animation */}
        <div
          className={`absolute cursor-pointer transition-all duration-300 ${
            activeEffects['shower'] ? 'scale-125 opacity-30' : 'opacity-10'
          } animate-[spray_4s_ease-in-out_infinite]`}
          style={{
            right: '10%',
            top: '20%'
          }}
          onClick={() => triggerEffect('shower')}
        >
          <ShowerHead className="h-16 w-16 text-primary" />
        </div>
      </div>
      
      <Hero />
      <Services />
      <BookingForm />
      <EmergencyButton />
    </div>
  );
};

export default Index;
