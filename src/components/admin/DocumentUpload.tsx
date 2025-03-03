import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { List, ListItem } from "@/components/ui/list";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface DocumentUploadProps {
  documentType: 'certificate' | 'invoice';
}

interface User {
  id: string;
  full_name: string;
  email: string;
}

interface Invoice {
  id: string;
  invoice_number: string;
  customer_id: string;
  amount: number;
  issue_date: string;
  due_date: string;
  status: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ documentType }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<string | undefined>(undefined);
  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
  const [invoiceAmount, setInvoiceAmount] = useState<number | undefined>(undefined);
  const [invoiceDueDate, setInvoiceDueDate] = useState<Date | undefined>(undefined);
  const [invoiceStatus, setInvoiceStatus] = useState<string>('Pending');
  const [users, setUsers] = useState<User[]>([
    { id: '1', full_name: 'John Doe', email: 'john.doe@example.com' },
    { id: '2', full_name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: '3', full_name: 'Alice Johnson', email: 'alice.johnson@example.com' },
  ]);
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: '101', invoice_number: 'INV-2023-001', customer_id: '1', amount: 500, issue_date: '2023-01-15', due_date: '2023-02-15', status: 'Paid' },
    { id: '102', invoice_number: 'INV-2023-002', customer_id: '2', amount: 750, issue_date: '2023-02-20', due_date: '2023-03-20', status: 'Pending' },
    { id: '103', invoice_number: 'INV-2023-003', customer_id: '1', amount: 1000, issue_date: '2023-03-25', due_date: '2023-04-25', status: 'Overdue' },
  ]);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    if (documentType === 'invoice' && (!selectedCustomer || !invoiceNumber || !invoiceAmount || !invoiceDueDate)) {
      toast({
        title: "Missing invoice details",
        description: "Please fill in all invoice details before uploading.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setUploading(false);
        toast({
          title: "Upload successful",
          description: `${documentType === 'certificate' ? 'Certificate' : 'Invoice'} uploaded successfully.`,
        });
        setFiles([]);
        setUploadProgress(0);
      }
    }, 100);

    // Here you would typically send the file and metadata to your server
    console.log('File to upload:', files[0]);
    console.log('Selected customer:', selectedCustomer);
    console.log('Invoice number:', invoiceNumber);
    console.log('Invoice amount:', invoiceAmount);
    console.log('Invoice due date:', invoiceDueDate);
    console.log('Invoice status:', invoiceStatus);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload {documentType === 'certificate' ? 'Certificate' : 'Invoice'}</CardTitle>
        <CardDescription>
          {documentType === 'certificate'
            ? 'Upload a new customer certificate.'
            : 'Upload a new customer invoice.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div {...getRootProps()} className="relative border-2 border-dashed rounded-md p-6 cursor-pointer bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600">
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p className="text-center text-gray-500">Drop the files here ...</p> :
              <p className="text-center text-gray-500">Drag 'n' drop some files here, or click to select files</p>
          }
          {files.length > 0 && (
            <div className="absolute top-2 right-2">
              <Button variant="ghost" size="icon" onClick={() => setFiles([])}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="M6 6 18 18"/></svg>
              </Button>
            </div>
          )}
        </div>
        {files.length > 0 && (
          <List className="space-y-2">
            <ListItem>{files[0].name} - {Math.round(files[0].size / 1024)} KB</ListItem>
          </List>
        )}

        {documentType === 'invoice' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="customer">Customer</Label>
              <Select onValueChange={setSelectedCustomer}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a customer" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedCustomer && (
                <div className="mt-2">
                  <p className="text-sm font-medium">Customer Details:</p>
                  {users.filter(user => user.id === selectedCustomer).map(user => (
                    <div key={user.id}>
                      <p className="text-sm text-gray-500">{user.full_name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                type="text"
                id="invoiceNumber"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                placeholder="INV-2023-001"
              />
            </div>
            <div>
              <Label htmlFor="invoiceAmount">Invoice Amount</Label>
              <Input
                type="number"
                id="invoiceAmount"
                value={invoiceAmount || ''}
                onChange={(e) => setInvoiceAmount(Number(e.target.value))}
                placeholder="500.00"
              />
            </div>
            <div>
              <Label>Invoice Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !invoiceDueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {invoiceDueDate ? (
                      format(invoiceDueDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={invoiceDueDate}
                    onSelect={setInvoiceDueDate}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="invoiceStatus">Invoice Status</Label>
              <Select value={invoiceStatus} onValueChange={setInvoiceStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {uploadProgress > 0 && (
          <Progress value={uploadProgress} />
        )}

        <Button onClick={handleUpload} disabled={uploading} className="w-full">
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;
