
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

  const standardBenefits = [
    "Annual boiler service included (worth £80)",
    "Priority emergency call-outs within 24 hours",
    "No call-out charges",
    "10% discount on parts and labor",
    "Annual system health check",
    "24/7 phone support",
  ];

  const premiumBenefits = [
    "Annual boiler service included (worth £80)",
    "Priority emergency call-outs within 6 hours",
    "No call-out charges",
    "25% discount on parts and labor",
    "Quarterly system health checks",
    "24/7 phone support",
    "Free plumbing inspection annually",
    "Exclusive discounts on new installations",
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Service Plans</h2>
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our care plan for complete peace of mind with your plumbing and heating needs
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm transition-all hover:shadow-md">
              <h3 className="text-2xl font-bold mb-2">Standard Plan</h3>
              <div className="flex justify-center items-center gap-2 mb-6">
                <span className="text-4xl font-bold">£14.99</span>
                <span className="text-gray-600">/month</span>
              </div>
              
              <ul className="space-y-4 mb-8 text-left">
                {standardBenefits.map((benefit, index) => (
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
            </div>

            <div className="bg-gray-50 p-8 rounded-lg shadow-sm border-2 border-primary transition-all hover:shadow-md relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Premium Plan</h3>
              <div className="flex justify-center items-center gap-2 mb-6">
                <span className="text-4xl font-bold">£24.99</span>
                <span className="text-gray-600">/month</span>
              </div>
              
              <ul className="space-y-4 mb-8 text-left">
                {premiumBenefits.map((benefit, index) => (
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
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-8">
            No long-term contract - Cancel anytime with 30 days notice
          </p>
        </div>
      </div>
    </section>
  );
};
