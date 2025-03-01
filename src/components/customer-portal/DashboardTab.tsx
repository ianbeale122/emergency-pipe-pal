
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Receipt } from "lucide-react";
import StatCard from "./StatCard";
import { Certificate } from "./CertificateItem";
import { Invoice } from "./InvoiceItem";

type DashboardTabProps = {
  stats: Array<{
    label: string;
    value: number;
    icon: any;
    color: string;
  }>;
  certificates: Certificate[];
  invoices: Invoice[];
  onViewAllCertificates: () => void;
  onViewAllInvoices: () => void;
};

const DashboardTab = ({ 
  stats, 
  certificates, 
  invoices, 
  onViewAllCertificates, 
  onViewAllInvoices 
}: DashboardTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard 
            key={index}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              <span>Recent Certificates</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {certificates.slice(0, 2).map((cert) => (
              <div key={cert.id} className="flex items-center justify-between mb-4 last:mb-0">
                <div>
                  <p className="font-medium">{cert.name}</p>
                  <p className="text-sm text-muted-foreground">Expires: {new Date(cert.expires).toLocaleDateString()}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  cert.status === "Valid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {cert.status}
                </span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onViewAllCertificates}
            >
              View All Certificates
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-blue-500" />
              <span>Recent Invoices</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {invoices.slice(0, 2).map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between mb-4 last:mb-0">
                <div>
                  <p className="font-medium">{invoice.description}</p>
                  <p className="text-sm text-muted-foreground">Due: {new Date(invoice.date).toLocaleDateString()}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  invoice.status === "Paid" ? "bg-green-100 text-green-800" : 
                  invoice.status === "Pending" ? "bg-yellow-100 text-yellow-800" : 
                  "bg-red-100 text-red-800"
                }`}>
                  {invoice.status}
                </span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onViewAllInvoices}
            >
              View All Invoices
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardTab;
