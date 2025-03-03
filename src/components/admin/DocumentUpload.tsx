
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, File, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { fetchAllUsers } from "@/api/portal";
import { uploadCustomerDocument } from "@/api/portal";
import { useQuery } from "@tanstack/react-query";

interface DocumentUploadProps {
  documentType: 'certificate' | 'invoice';
}

interface CertificateMetadata {
  name: string;
  property: string;
  issue_date: string;
  expiry_date: string;
  status: string;
}

interface InvoiceMetadata {
  amount: number;
  currency: string;
  date: string;
  due_date: string;
  status: string;
  description: string;
}

export default function DocumentUpload({ documentType }: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  
  // Certificate specific metadata
  const [certificateName, setCertificateName] = useState('');
  const [property, setProperty] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [certificateStatus, setCertificateStatus] = useState('Valid');
  
  // Invoice specific metadata
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState('GBP');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [invoiceStatus, setInvoiceStatus] = useState('Pending');
  const [description, setDescription] = useState('');

  // Fetch all users for dropdown
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: fetchAllUsers
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }
    
    if (!userId) {
      toast({
        title: "Error",
        description: "Please select a customer",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      let metadata: CertificateMetadata | InvoiceMetadata;
      
      if (documentType === 'certificate') {
        metadata = {
          name: certificateName,
          property,
          issue_date: issueDate,
          expiry_date: expiryDate,
          status: certificateStatus
        };
      } else {
        metadata = {
          amount,
          currency,
          date: invoiceDate,
          due_date: dueDate,
          status: invoiceStatus,
          description
        };
      }
      
      const result = await uploadCustomerDocument(file, userId, documentType, metadata);
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      toast({
        title: "Upload Successful",
        description: `${documentType === 'certificate' ? 'Certificate' : 'Invoice'} has been uploaded successfully.`,
      });
      
      // Reset form
      setFile(null);
      
      if (documentType === 'certificate') {
        setCertificateName('');
        setProperty('');
        setIssueDate('');
        setExpiryDate('');
        setCertificateStatus('Valid');
      } else {
        setAmount(0);
        setCurrency('GBP');
        setInvoiceDate('');
        setDueDate('');
        setInvoiceStatus('Pending');
        setDescription('');
      }
      
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: error.message || "There was an error uploading the document",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold">
            Upload {documentType === 'certificate' ? 'Certificate' : 'Invoice'}
          </h3>
          <p className="text-sm text-muted-foreground">
            Upload a {documentType === 'certificate' ? 'certificate' : 'invoice'} for a customer
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customer">Customer</Label>
            <Select
              value={userId}
              onValueChange={setUserId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a customer" />
              </SelectTrigger>
              <SelectContent>
                {isLoadingUsers ? (
                  <SelectItem value="loading" disabled>Loading customers...</SelectItem>
                ) : (
                  users?.map(user => (
                    <SelectItem key={user.user_id} value={user.user_id}>
                      {user.full_name} ({user.email || ''})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file">Document File (PDF)</Label>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <div className="border rounded-md overflow-hidden">
                  <Input 
                    id="file" 
                    type="file" 
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                </div>
              </div>
              {file && (
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  onClick={() => setFile(null)}
                >
                  <AlertCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
            {file && (
              <p className="text-xs text-muted-foreground mt-1">
                Selected: {file.name}
              </p>
            )}
          </div>
          
          {documentType === 'certificate' ? (
            // Certificate metadata
            <>
              <div className="space-y-2">
                <Label htmlFor="certificate-name">Certificate Name</Label>
                <Input
                  id="certificate-name"
                  value={certificateName}
                  onChange={(e) => setCertificateName(e.target.value)}
                  placeholder="Gas Safety Certificate"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="property">Property Address</Label>
                <Input
                  id="property"
                  value={property}
                  onChange={(e) => setProperty(e.target.value)}
                  placeholder="123 Main St, London"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="issue-date">Issue Date</Label>
                  <Input
                    id="issue-date"
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expiry-date">Expiry Date</Label>
                  <Input
                    id="expiry-date"
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={certificateStatus}
                  onValueChange={setCertificateStatus}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Valid">Valid</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          ) : (
            // Invoice metadata
            <>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Annual Boiler Service"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount.toString()}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={currency}
                    onValueChange={setCurrency}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoice-date">Invoice Date</Label>
                  <Input
                    id="invoice-date"
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="due-date">Due Date</Label>
                  <Input
                    id="due-date"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="invoice-status">Status</Label>
                <Select
                  value={invoiceStatus}
                  onValueChange={setInvoiceStatus}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
        
        <Button type="submit" className="w-full" disabled={isUploading}>
          {isUploading ? (
            <>
              <span className="animate-spin mr-2">⟳</span>
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload {documentType === 'certificate' ? 'Certificate' : 'Invoice'}
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}
