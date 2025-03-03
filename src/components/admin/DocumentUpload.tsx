
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

interface DocumentUploadProps {
  customers: { id: string; full_name: string }[];
  onUploadSuccess: () => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ customers, onUploadSuccess }) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [documentType, setDocumentType] = useState<string>('invoice');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [files, setFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
  });

  const uploadDocuments = async () => {
    if (!selectedCustomerId) {
      toast({
        title: "Error",
        description: "Please select a customer",
        variant: "destructive",
      });
      return;
    }

    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one file",
        variant: "destructive",
      });
      return;
    }

    // Check if Supabase is properly configured
    if (supabase.storage === undefined) {
      toast({
        title: "Configuration Error",
        description: "Supabase is not properly configured. Please set up your Supabase credentials.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${documentType}/${selectedCustomerId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('customer-documents')
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const { error: dbError } = await supabase
          .from('customer_documents')
          .insert({
            customer_id: selectedCustomerId,
            document_type: documentType,
            file_path: filePath,
            file_name: file.name,
            uploaded_at: new Date().toISOString(),
          });

        if (dbError) {
          throw dbError;
        }

        // Update progress
        setUploadProgress(Math.round(((i + 1) / files.length) * 100));
      }

      toast({
        title: "Success",
        description: `${files.length} document(s) uploaded successfully`,
      });
      
      setFiles([]);
      onUploadSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload documents",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="customer">Customer</Label>
          <Select value={selectedCustomerId} onValueChange={setSelectedCustomerId}>
            <SelectTrigger id="customer">
              <SelectValue placeholder="Select customer" />
            </SelectTrigger>
            <SelectContent>
              {customers.map((customer) => (
                <SelectItem key={customer.id} value={customer.id}>
                  {customer.full_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="documentType">Document Type</Label>
          <Select value={documentType} onValueChange={setDocumentType}>
            <SelectTrigger id="documentType">
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="invoice">Invoice</SelectItem>
              <SelectItem value="certificate">Gas Certificate</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Upload Files</Label>
          <div 
            {...getRootProps()} 
            className="border-2 border-dashed border-gray-300 rounded-md p-6 cursor-pointer hover:border-primary"
          >
            <input {...getInputProps()} />
            <div className="text-center">
              <p>Drag & drop files here, or click to select files</p>
              <p className="text-sm text-gray-500 mt-2">PDF, JPG, PNG (max 5 files)</p>
            </div>
          </div>
        </div>

        {files.length > 0 && (
          <div>
            <Label>Selected Files</Label>
            <ul className="mt-2 space-y-1">
              {files.map((file, index) => (
                <li key={index} className="text-sm flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span>{file.name}</span>
                  <span className="text-gray-500">{(file.size / 1024).toFixed(1)} KB</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {isUploading && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary h-2.5 rounded-full" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
            <p className="text-xs text-center mt-1">{uploadProgress}%</p>
          </div>
        )}

        <Button 
          onClick={uploadDocuments} 
          disabled={isUploading || files.length === 0 || !selectedCustomerId}
          className="w-full"
        >
          {isUploading ? 'Uploading...' : 'Upload Documents'}
        </Button>
      </div>
    </div>
  );
};

export default DocumentUpload;
