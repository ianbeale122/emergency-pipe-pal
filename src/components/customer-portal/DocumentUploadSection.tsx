
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUp, X, File } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

interface DocumentUploadSectionProps {
  customerId: string;
}

const DocumentUploadSection = ({ customerId }: DocumentUploadSectionProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Filter files by type and size
    const validFiles = acceptedFiles.filter(file => {
      const isValidType = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB max
      
      if (!isValidType) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a valid file type. Please upload PDF, JPEG, or PNG files.`,
          variant: "destructive"
        });
      }
      
      if (!isValidSize) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the 5MB size limit.`,
          variant: "destructive"
        });
      }
      
      return isValidType && isValidSize;
    });

    setFiles(prev => [...prev, ...validFiles]);
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  const removeFile = (index: number) => {
    setFiles(files => files.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    
    try {
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `customer-documents/${customerId}/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('customer-documents')
          .upload(filePath, file);
          
        if (uploadError) {
          throw uploadError;
        }
        
        // Save reference to the uploaded document in the database
        const { error: dbError } = await supabase
          .from('customer_documents')
          .insert({
            customer_id: customerId,
            document_type: 'customer_upload',
            file_path: filePath,
            file_name: file.name
          });
          
        if (dbError) {
          throw dbError;
        }
      }
      
      toast({
        title: "Upload Successful",
        description: `${files.length} document${files.length > 1 ? 's' : ''} uploaded successfully.`,
      });
      
      setFiles([]);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your document(s). Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Documents</CardTitle>
        <CardDescription>
          Upload important documents related to your plumbing service. 
          We accept PDF, JPEG and PNG files (max 5MB each).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'
          }`}
        >
          <input {...getInputProps()} />
          <FileUp className="mx-auto h-12 w-12 text-gray-400 mb-2" />
          <p className="text-sm font-medium">
            {isDragActive
              ? "Drop the files here..."
              : "Drag & drop files here, or click to select files"
            }
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PDF, JPEG or PNG files (max 5MB)
          </p>
        </div>
        
        {files.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Selected Files ({files.length})</h4>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <File className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    <span className="text-sm truncate">{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={uploadFiles} 
              disabled={uploading} 
              className="w-full"
            >
              {uploading ? "Uploading..." : `Upload ${files.length} file${files.length > 1 ? 's' : ''}`}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentUploadSection;
