
import { Calendar, DollarSign, Download } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type Invoice = {
  id: string;
  description: string;
  date: string;
  amount: number;
  status: string;
};

type InvoiceItemProps = {
  invoice: Invoice;
  onDownload: (id: string, type: string) => void;
};

const InvoiceItem = ({ invoice, onDownload }: InvoiceItemProps) => {
  return (
    <Card key={invoice.id} className="transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <CardTitle className="text-lg">{invoice.description}</CardTitle>
          <span className={`text-xs px-2 py-1 rounded-full ${
            invoice.status === "Paid" ? "bg-green-100 text-green-800" : 
            invoice.status === "Pending" ? "bg-yellow-100 text-yellow-800" : 
            "bg-red-100 text-red-800"
          }`}>
            {invoice.status}
          </span>
        </div>
        <CardDescription className="text-xs sm:text-sm">Invoice ID: {invoice.id}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate">Date: {new Date(invoice.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate">Amount: £{invoice.amount.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-between">
        {invoice.status !== "Paid" && (
          <Button 
            variant="default" 
            className="w-full sm:w-auto flex items-center gap-2"
          >
            <DollarSign className="h-4 w-4" />
            <span>Pay Now</span>
          </Button>
        )}
        <Button 
          variant="outline" 
          className="w-full sm:w-auto sm:ml-auto"
          onClick={() => onDownload(invoice.id, "Invoice")}
        >
          <Download className="h-4 w-4 mr-2" />
          <span>Download</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InvoiceItem;
