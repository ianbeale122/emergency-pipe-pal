
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Mail } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface AdminLoginProps {
  onLogin: (email: string, password: string, rememberMe: boolean) => boolean;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate a bit of loading time
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const success = onLogin(email, password, rememberMe);
      
      if (!success) {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full bg-slate-800 border-indigo-900/30 shadow-xl">
      <CardHeader className="border-b border-indigo-900/20 pb-4">
        <CardTitle className="text-white">Admin Login</CardTitle>
        <CardDescription className="text-indigo-300">
          Access the admin portal to manage customers and documents
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 text-indigo-100">
              <Mail className="h-4 w-4 text-indigo-400" />
              Email
            </Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="beale122@gmail.com"
              required
              className="bg-slate-950 border-indigo-900/30 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2 text-indigo-100">
              <Lock className="h-4 w-4 text-indigo-400" />
              Password
            </Label>
            <Input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-slate-950 border-indigo-900/30 text-white"
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm font-medium">{error}</div>
          )}
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="rememberMe" 
              checked={rememberMe} 
              onCheckedChange={(checked) => setRememberMe(checked as boolean)} 
              className="border-indigo-400 data-[state=checked]:bg-indigo-600"
            />
            <Label 
              htmlFor="rememberMe" 
              className="text-sm font-normal cursor-pointer text-indigo-200"
            >
              Remember me for 30 days
            </Label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-indigo-400 border-t border-indigo-900/20 pt-4">
        <p>For demo: beale122@gmail.com / 1234</p>
      </CardFooter>
    </Card>
  );
};

export default AdminLogin;
