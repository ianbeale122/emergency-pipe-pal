
import { Card } from "@/components/ui/card";
import { UsersRound, FileText, ArrowUpRight } from "lucide-react";

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
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6 flex items-start space-x-4 bg-slate-800 border-slate-700 text-white">
          <div className="bg-indigo-900/50 p-3 rounded-full">
            <UsersRound className="h-6 w-6 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-300">Total Customers</h3>
            <p className="text-2xl font-bold">
              {isLoadingStats ? "..." : customerCount}
            </p>
            <button 
              onClick={() => onChangeTab("customers")}
              className="text-xs text-indigo-400 flex items-center mt-2 hover:text-indigo-300"
            >
              View all <ArrowUpRight className="ml-1 h-3 w-3" />
            </button>
          </div>
        </Card>
        
        <Card className="p-6 flex items-start space-x-4 bg-slate-800 border-slate-700 text-white">
          <div className="bg-blue-900/50 p-3 rounded-full">
            <FileText className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-300">Total Documents</h3>
            <p className="text-2xl font-bold">
              {isLoadingStats ? "..." : documentCount}
            </p>
            <button 
              onClick={() => onChangeTab("upload")}
              className="text-xs text-indigo-400 flex items-center mt-2 hover:text-indigo-300"
            >
              Upload more <ArrowUpRight className="ml-1 h-3 w-3" />
            </button>
          </div>
        </Card>
      </div>
      
      <Card className="p-6 bg-slate-800 border-slate-700 text-white">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p className="text-slate-300">
          View recent customer activities and document uploads here.
        </p>
        {/* In a real app, this would display recent activities from a database */}
        <div className="mt-4 rounded-md bg-slate-700 p-4 text-sm">
          This is a placeholder for an activity feed. In a production environment, 
          this would show real-time updates of customer activities and document uploads.
        </div>
      </Card>
    </div>
  );
};

export default DashboardOverview;
