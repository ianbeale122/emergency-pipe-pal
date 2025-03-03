
import { Navigation } from "@/components/Navigation";
import AdminLogin from "@/components/admin/AdminLogin";

interface AdminLoginContainerProps {
  onLogin: (email: string, password: string, rememberMe: boolean) => boolean;
}

const AdminLoginContainer = ({ onLogin }: AdminLoginContainerProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="bg-slate-950 border-b border-indigo-900/30 shadow-lg">
        <Navigation />
      </div>
      <div className="container mx-auto max-w-md py-16">
        <div className="bg-slate-900/80 border border-indigo-900/20 rounded-xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
            <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full"></div>
            <p className="text-indigo-400 mt-4">Secure admin access required</p>
          </div>
          <AdminLogin onLogin={onLogin} />
        </div>
      </div>
    </div>
  );
};

export default AdminLoginContainer;
