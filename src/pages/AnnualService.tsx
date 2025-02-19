
import { Navigation } from "@/components/Navigation";
import { BookingForm } from "@/components/BookingForm";

const AnnualService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-fade-up">
            <h1 className="text-3xl font-bold mb-4">Annual Boiler Service</h1>
            <p className="text-gray-600">
              Regular maintenance is key to keeping your boiler running efficiently and safely.
              Book your annual service today.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 mb-12 animate-fade-up">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Service Includes:</h2>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Full boiler inspection</li>
                <li>✓ Performance test</li>
                <li>✓ Safety checks</li>
                <li>✓ Cleaning of components</li>
                <li>✓ Written report</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Why Service Annually?</h2>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Ensure safe operation</li>
                <li>✓ Maintain efficiency</li>
                <li>✓ Prevent breakdowns</li>
                <li>✓ Extend boiler life</li>
                <li>✓ Maintain warranty</li>
              </ul>
            </div>
          </div>
          <BookingForm />
        </div>
      </main>
    </div>
  );
};

export default AnnualService;
