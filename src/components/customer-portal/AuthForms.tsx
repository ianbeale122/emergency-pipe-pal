
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Lock } from "lucide-react";
import { signIn, signUp } from "@/lib/supabase";
import { updateUserProfile } from "@/api/portal";
import { useToast } from "@/components/ui/use-toast";

interface AuthFormsProps {
  onSuccess?: () => void;
}

export const AuthForms = ({ onSuccess }: AuthFormsProps) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { toast } = useToast();
  
  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    try {
      const { data, error } = await signIn(email, password);
      
      if (error) throw error;
      
      // For mock admin login in development mode
      if (email === "admin@example.com" && password === "admin123") {
        localStorage.setItem('mockAdminSession', 'true');
      }
      
      toast({
        title: "Success",
        description: "You have successfully logged in.",
        duration: 3000,
      });
      
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "An error occurred during login",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  // Signup handler
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !name) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    try {
      const { data, error } = await signUp(email, password, { full_name: name });
      
      if (error) throw error;
      
      if (data.user) {
        // Create profile
        await updateUserProfile({
          user_id: data.user.id,
          full_name: name,
          address: "",
          phone: "",
          created_at: new Date().toISOString(),
          is_admin: false
        });
        
        toast({
          title: "Account Created",
          description: "Please check your email to confirm your account",
          duration: 3000,
        });
      }
      
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Signup Failed",
        description: error.message || "An error occurred during signup",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  // Login Form
  const LoginForm = () => (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Log in to your account</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="pl-10"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-10"
              required
            />
          </div>
        </div>
        <Button type="submit" className="w-full">Log in</Button>
      </form>
      <div className="mt-4 text-center">
        <p>
          Don't have an account?{' '}
          <Button variant="link" className="p-0" onClick={() => setIsLoginView(false)}>
            Sign up
          </Button>
        </p>
      </div>
    </div>
  );

  // Signup Form
  const SignupForm = () => (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Create your account</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="pl-10"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-10"
              required
            />
          </div>
        </div>
        <Button type="submit" className="w-full">Sign up</Button>
      </form>
      <div className="mt-4 text-center">
        <p>
          Already have an account?{' '}
          <Button variant="link" className="p-0" onClick={() => setIsLoginView(true)}>
            Log in
          </Button>
        </p>
      </div>
    </div>
  );

  return isLoginView ? <LoginForm /> : <SignupForm />;
};

export default AuthForms;
