
import { Card } from "@/components/ui/card";
import { UsersRound, FileText, ArrowUpRight, Activity, Bell } from "lucide-react";

interface DashboardOverviewProps {
  customerCount: number;
  documentCount: number;
  isLoadingStats: boolean;
  onChangeTab: (tab: string) => void;
}

const DashboardOverview = ({
  customerCount,
  documentCount,
  isLoadingStats,
  onChangeTab
}: DashboardOverviewProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Activity className="mr-2 h-6 w-6 text-indigo-500" />
        System Overview
      </h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6 flex items-start space-x-4 bg-slate-900 border-indigo-900/30 text-white shadow-lg hover:shadow-indigo-700/10 transition-shadow">
          <div className="bg-indigo-900/50 p-4 rounded-lg">
            <UsersRound className="h-7 w-7 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-indigo-300">Total Customers</h3>
            <p className="text-3xl font-bold mt-1">
              {isLoadingStats ? "..." : customerCount}
            </p>
            <button 
              onClick={() => onChangeTab("customers")}
              className="text-xs text-indigo-400 flex items-center mt-3 hover:text-indigo-300 group"
            >
              View all <ArrowUpRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </Card>
        
        <Card className="p-6 flex items-start space-x-4 bg-slate-900 border-indigo-900/30 text-white shadow-lg hover:shadow-blue-700/10 transition-shadow">
          <div className="bg-blue-900/50 p-4 rounded-lg">
            <FileText className="h-7 w-7 text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-300">Total Documents</h3>
            <p className="text-3xl font-bold mt-1">
              {isLoadingStats ? "..." : documentCount}
            </p>
            <button 
              onClick={() => onChangeTab("upload")}
              className="text-xs text-blue-400 flex items-center mt-3 hover:text-blue-300 group"
            >
              Upload more <ArrowUpRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </Card>
        
        <Card className="p-6 flex items-start space-x-4 bg-slate-900 border-indigo-900/30 text-white shadow-lg hover:shadow-purple-700/10 transition-shadow">
          <div className="bg-purple-900/50 p-4 rounded-lg">
            <Bell className="h-7 w-7 text-purple-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-purple-300">System Alerts</h3>
            <p className="text-3xl font-bold mt-1">
              0
            </p>
            <button className="text-xs text-purple-400 flex items-center mt-3 hover:text-purple-300 group">
              View alerts <ArrowUpRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </Card>
      </div>
      
      <Card className="p-6 bg-slate-900 border-indigo-900/30 text-white shadow-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Activity className="mr-2 h-5 w-5 text-indigo-500" />
          Recent Activity
        </h2>
        <p className="text-slate-300">
          View recent customer activities and document uploads here.
        </p>
        <div className="mt-4 rounded-md bg-slate-800 p-4 text-sm border border-indigo-900/20">
          <div className="flex items-center justify-between text-indigo-300 border-b border-slate-700 pb-2 mb-2">
            <span>Activity</span>
            <span>Time</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">System initialized</span>
              <span className="text-xs text-slate-400">Just now</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Admin login detected</span>
              <span className="text-xs text-slate-400">2 minutes ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Database connection established</span>
              <span className="text-xs text-slate-400">5 minutes ago</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardOverview;
