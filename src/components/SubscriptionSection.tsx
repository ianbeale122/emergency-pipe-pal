
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const SubscriptionSection = () => {
  const { toast } = useToast();

  const handleSubscribe = () => {
    toast({
      title: "Coming Soon",
      description: "Subscription functionality will be available shortly. Please check back later.",
    });
  };

  const benefits = [
    "Annual boiler service included (worth £120)",
    "Priority emergency call-outs",
    "No call-out charges",
    "Parts and labor included for minor repairs",
    "Monthly boiler health checks",
    "24/7 phone support",
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Care Plan Subscription</h2>
          <p className="text-gray-600 mb-8">
            Join our care plan for complete peace of mind with your boiler and plumbing needs
          </p>
          
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
            <div className="flex justify-center items-center gap-2 mb-6">
              <span className="text-4xl font-bold">£29.99</span>
              <span className="text-gray-600">/month</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="text-primary h-5 w-5 flex-shrink-0" />
                  <span className="text-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button 
              onClick={handleSubscribe} 
              size="lg" 
              className="w-full text-lg"
            >
              Subscribe Now
            </Button>

            <p className="text-sm text-gray-500 mt-4">
              No long-term contract - Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
