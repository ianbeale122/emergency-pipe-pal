
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { Invoice, UserProfile } from "@/api/portal";

interface InvoiceListProps {
  invoices: Invoice[];
  users: UserProfile[];
  onEdit: (invoice: Invoice) => void;
  onDelete: (id: string) => void;
}

const InvoiceList = ({ invoices, users, onEdit, onDelete }: InvoiceListProps) => {
  // Helper function to get user name by ID
  const getUserName = (userId: string): string => {
    const user = users.find(u => u.user_id === userId);
    return user ? user.full_name : "Unknown User";
  };

  // Helper function to get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-green-500">{status}</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-500">{status}</Badge>;
      case "Outstanding":
        return <Badge className="bg-red-500">{status}</Badge>;
      case "Cancelled":
        return <Badge className="bg-gray-500">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>List of all invoices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4">
                No invoices found
              </TableCell>
            </TableRow>
          ) : (
            invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{getUserName(invoice.user_id)}</TableCell>
                <TableCell>{invoice.description}</TableCell>
                <TableCell>{`${invoice.currency} ${invoice.amount.toFixed(2)}`}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.due_date}</TableCell>
                <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => onEdit(invoice)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => onDelete(invoice.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvoiceList;
