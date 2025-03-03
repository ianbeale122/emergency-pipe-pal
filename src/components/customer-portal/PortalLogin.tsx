
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import PortalTabInfo from "./PortalTabInfo";

interface PortalLoginProps {
  onSuccess: () => void;
}

const PortalLogin = ({ onSuccess }: PortalLoginProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const handleRegisterSuccess = () => {
    // Switch to login tab after successful registration
    setActiveTab("login");
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Customer Portal</h2>
      
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "register")} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <LoginForm onSuccess={onSuccess} />
        </TabsContent>
        
        <TabsContent value="register">
          <RegisterForm onSuccess={handleRegisterSuccess} />
        </TabsContent>
      </Tabs>
      
      <PortalTabInfo activeTab={activeTab} />
    </div>
  );
};

export default PortalLogin;
