
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const Emergency = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fade-up">
            <h1 className="text-3xl font-bold mb-4">Emergency Plumbing Service</h1>
            <p className="text-gray-600 mb-8">
              Available 24/7 for urgent plumbing emergencies. Our expert plumbers are ready to help.
            </p>
            <Button size="lg" variant="destructive" className="gap-2" asChild>
              <a href="tel:+1234567890">
                <Phone className="h-5 w-5" />
                Call Now: +1 234 567 890
              </a>
            </Button>
          </div>
          <div className="grid gap-8 md:grid-cols-2 mt-12 text-left animate-fade-up">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Emergency Services</h2>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Burst pipes</li>
                <li>✓ Boiler breakdowns</li>
                <li>✓ Flooding</li>
                <li>✓ Gas leaks</li>
                <li>✓ Blocked drains</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">What to Expect</h2>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Fast response times</li>
                <li>✓ Expert diagnosis</li>
                <li>✓ Transparent pricing</li>
                <li>✓ Professional service</li>
                <li>✓ Available 24/7</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Emergency;
