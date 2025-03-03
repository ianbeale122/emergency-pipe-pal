
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { Navigation } from "@/components/Navigation";

const SignIn = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      <div className="container mx-auto py-16 px-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-foreground mb-8">Sign In to Your Account</h1>
        <div className="w-full max-w-md">
          <ClerkSignIn path="/sign-in" routing="path" signUpUrl="/sign-up" redirectUrl="/customer-portal" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
