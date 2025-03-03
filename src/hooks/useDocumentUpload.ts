
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

export const useDocumentUpload = (onUploadSuccess: () => void) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [documentType, setDocumentType] = useState<string>('invoice');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

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

  return {
    selectedCustomerId,
    setSelectedCustomerId,
    documentType,
    setDocumentType,
    isUploading,
    uploadProgress,
    files,
    setFiles,
    uploadDocuments
  };
};
