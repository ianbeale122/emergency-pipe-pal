
import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import { Navigation } from "@/components/Navigation";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      <div className="container mx-auto py-16 px-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-foreground mb-8">Create Your Account</h1>
        <div className="w-full max-w-md">
          <ClerkSignUp path="/sign-up" routing="path" signInUrl="/sign-in" redirectUrl="/customer-portal" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
