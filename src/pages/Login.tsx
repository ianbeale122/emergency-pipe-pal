
import { Navigation } from "@/components/Navigation";
import LoginForm from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      <div className="container mx-auto py-16 px-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Customer Portal Login</h1>
        <p className="text-muted-foreground mb-8">Access your certificates, invoices and more</p>
        
        <div className="w-full max-w-md">
          <LoginForm onSuccess={() => window.location.href = "/customer-portal"} />
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account yet?
            </p>
            <Button variant="link" asChild>
              <Link to="/customer-portal">Sign up in the Customer Portal</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
