
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
              Regular maintenance is essential to keep your boiler running safely and efficiently.
              Our Gas Safe registered engineers provide comprehensive annual services to all boiler types.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 mb-12 animate-fade-up">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Our Service Includes:</h2>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Full visual inspection of the boiler</li>
                <li>✓ Checking all components and controls</li>
                <li>✓ Testing flue gases and emissions</li>
                <li>✓ Cleaning of key components</li>
                <li>✓ Checking for gas and water leaks</li>
                <li>✓ Verifying proper pressure settings</li>
                <li>✓ Gas safety certificate issuance</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Why Service Annually?</h2>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Ensure safe operation and prevent carbon monoxide risks</li>
                <li>✓ Improve efficiency and reduce energy bills</li>
                <li>✓ Prevent unexpected breakdowns and costly repairs</li>
                <li>✓ Extend the lifespan of your boiler</li>
                <li>✓ Maintain manufacturer's warranty</li>
                <li>✓ Meet landlord gas safety obligations</li>
                <li>✓ Peace of mind for you and your family</li>
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
