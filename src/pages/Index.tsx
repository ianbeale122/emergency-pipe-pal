
import { BookingForm } from "@/components/BookingForm";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Services } from "@/components/Services";
import { WifiHigh, Droplet, Wrench, ShowerHead } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Index = () => {
  const [activeEffects, setActiveEffects] = useState<Record<string, boolean>>({});
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);

  const triggerEffect = (id: string) => {
    setActiveEffects(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setActiveEffects(prev => ({ ...prev, [id]: false }));
    }, 1000);
  };

  useEffect(() => {
    // Auto-complete the logo animation after 2.5 seconds
    const timer = setTimeout(() => {
      setLogoAnimationComplete(true);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  if (!logoAnimationComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ 
            duration: 1.5,
            type: "spring",
            stiffness: 100
          }}
          className="flex flex-col items-center"
        >
          <motion.img 
            src="/lovable-uploads/6c4f1fb6-e6ec-4ae1-9b8e-c18cce73a22d.png"
            alt="GPS Plumbing Logo"
            className="h-24 w-auto" // Reduced from h-40 to h-24
            animate={{ y: [0, -10, 0] }} // Reduced bounce height from -15 to -10
            transition={{ 
              repeat: 1, 
              duration: 1,
              ease: "easeInOut"
            }}
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80%" }} // Reduced from 100% to 80%
            transition={{ duration: 2, delay: 0.5 }}
            className="h-1 bg-primary mt-4 rounded-full max-w-[200px]" // Added max-width
          />
        </motion.div>
      </div>
    );
  }

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
      
      {/* Remove the emergency button */}
      
      {/* Add padding at the bottom for the bottom navigation on mobile */}
      <div className="h-16 md:h-0"></div>
    </div>
  );
};

export default Index;
