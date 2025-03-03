
import { Navigation } from "@/components/Navigation";
import AdminLogin from "@/components/admin/AdminLogin";

interface AdminLoginContainerProps {
  onLogin: (email: string, password: string, rememberMe: boolean) => void;
}

const AdminLoginContainer = ({ onLogin }: AdminLoginContainerProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      <div className="container mx-auto max-w-md py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Portal</h1>
        <AdminLogin onLogin={onLogin} />
      </div>
    </div>
  );
};

export default AdminLoginContainer;
