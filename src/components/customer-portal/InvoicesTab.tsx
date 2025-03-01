
import { Button } from "@/components/ui/button";
import { Check, Clock, AlertCircle, Receipt } from "lucide-react";
import InvoiceItem, { Invoice } from "./InvoiceItem";

type InvoicesTabProps = {
  invoices: Invoice[];
  onDownload: (id: string, type: string) => void;
};

const InvoicesTab = ({ invoices, onDownload }: InvoicesTabProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Your Invoices</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Check className="h-4 w-4" />
            <span>Paid</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Pending</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            <span>Overdue</span>
          </Button>
        </div>
      </div>

      {invoices.length > 0 ? (
        invoices.map((invoice) => (
          <InvoiceItem 
            key={invoice.id} 
            invoice={invoice} 
            onDownload={onDownload} 
          />
        ))
      ) : (
        <div className="text-center py-8">
          <Receipt className="h-16 w-16 mx-auto text-muted-foreground opacity-30 mb-4" />
          <h3 className="text-lg font-medium">No invoices found</h3>
          <p className="text-muted-foreground">Try adjusting your search term</p>
        </div>
      )}
    </div>
  );
};

export default InvoicesTab;
