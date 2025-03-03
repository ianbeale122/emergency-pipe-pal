
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
        <Card className="p-6 flex items-start space-x-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <UsersRound className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Total Customers</h3>
            <p className="text-2xl font-bold">
              {isLoadingStats ? "..." : customerCount}
            </p>
            <button 
              onClick={() => onChangeTab("customers")}
              className="text-xs text-primary flex items-center mt-2"
            >
              View all <ArrowUpRight className="ml-1 h-3 w-3" />
            </button>
          </div>
        </Card>
        
        <Card className="p-6 flex items-start space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Total Documents</h3>
            <p className="text-2xl font-bold">
              {isLoadingStats ? "..." : documentCount}
            </p>
            <button 
              onClick={() => onChangeTab("upload")}
              className="text-xs text-primary flex items-center mt-2"
            >
              Upload more <ArrowUpRight className="ml-1 h-3 w-3" />
            </button>
          </div>
        </Card>
      </div>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p className="text-muted-foreground">
          View recent customer activities and document uploads here.
        </p>
        {/* In a real app, this would display recent activities from a database */}
        <div className="mt-4 rounded-md bg-gray-50 p-4 text-sm">
          This is a placeholder for an activity feed. In a production environment, 
          this would show real-time updates of customer activities and document uploads.
        </div>
      </Card>
    </div>
  );
};

export default DashboardOverview;
