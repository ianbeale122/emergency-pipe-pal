
import { Navigation } from "@/components/Navigation";
import { SubscriptionSection } from "@/components/SubscriptionSection";
import { Phone, Clock, Shield, CheckCircle } from "lucide-react";

const Emergency = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main>
        <section className="py-12 bg-emergency">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl font-bold mb-4">24/7 Emergency Plumbing</h1>
              <p className="text-xl mb-8">
                Rapid response to all plumbing emergencies, day or night
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
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-8 md:grid-cols-3 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Fast Response</h3>
                  <p className="text-gray-600">We aim to be with you within 60 minutes for critical emergencies</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Fully Insured</h3>
                  <p className="text-gray-600">All our work is guaranteed and covered by comprehensive insurance</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">No Call-Out Fee</h3>
                  <p className="text-gray-600">Transparent pricing with no hidden charges or emergency call-out fees</p>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Emergency Services We Provide</h2>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Burst and leaking pipes</li>
                    <li>• Boiler breakdowns and no heating</li>
                    <li>• Blocked toilets, sinks and drains</li>
                    <li>• Water leaks and flooding</li>
                    <li>• Hot water cylinder issues</li>
                    <li>• Gas leaks and gas safety checks</li>
                    <li>• Frozen or damaged pipes</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Our Emergency Process</h2>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Immediate telephone assessment</li>
                    <li>• Quick dispatch of nearest available engineer</li>
                    <li>• Clear communication of expected arrival time</li>
                    <li>• Full diagnosis of the problem on arrival</li>
                    <li>• Upfront quotation before work begins</li>
                    <li>• Temporary solutions if parts are required</li>
                    <li>• Follow-up to ensure problem is fully resolved</li>
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
