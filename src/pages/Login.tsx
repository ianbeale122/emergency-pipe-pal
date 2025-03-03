
import { Navigation } from "@/components/Navigation";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      <div className="container mx-auto py-16 px-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-foreground mb-8">Login Area</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
