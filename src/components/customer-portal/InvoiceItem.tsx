
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
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{invoice.description}</span>
          <span className={`text-sm px-2 py-1 rounded-full ${
            invoice.status === "Paid" ? "bg-green-100 text-green-800" : 
            invoice.status === "Pending" ? "bg-yellow-100 text-yellow-800" : 
            "bg-red-100 text-red-800"
          }`}>
            {invoice.status}
          </span>
        </CardTitle>
        <CardDescription>Invoice ID: {invoice.id}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Date: {new Date(invoice.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>Amount: £{invoice.amount.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {invoice.status !== "Paid" && (
          <Button 
            variant="default" 
            className="flex items-center gap-2"
          >
            <DollarSign className="h-4 w-4" />
            <span>Pay Now</span>
          </Button>
        )}
        <Button 
          variant="outline" 
          className={invoice.status !== "Paid" ? "ml-auto" : ""}
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
