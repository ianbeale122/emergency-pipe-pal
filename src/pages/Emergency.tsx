
import { Navigation } from "@/components/Navigation";
import { SubscriptionSection } from "@/components/SubscriptionSection";
import { Phone } from "lucide-react";

const Emergency = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main>
        <section className="py-12 bg-emergency">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl font-bold mb-4">Emergency Plumbing Service</h1>
              <p className="text-xl mb-8">
                Available 24/7 for urgent plumbing emergencies
              </p>
              <a
                href="tel:+441234567890"
                className="inline-flex items-center gap-2 bg-white text-emergency px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                <Phone className="h-6 w-6" />
                Call Now: 01234 567890
              </a>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Common Emergencies We Handle</h2>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Burst pipes</li>
                    <li>• Boiler breakdowns</li>
                    <li>• Blocked drains</li>
                    <li>• Gas leaks</li>
                    <li>• No hot water</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">What to Expect</h2>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Fast response times</li>
                    <li>• Expert emergency plumbers</li>
                    <li>• Upfront pricing</li>
                    <li>• Available 24/7</li>
                    <li>• Full emergency kit on-board</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SubscriptionSection />
      </main>
    </div>
  );
};

export default Emergency;
