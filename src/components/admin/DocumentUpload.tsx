
import React from 'react';
import { Button } from '@/components/ui/button';
import { useDocumentUpload } from '@/hooks/useDocumentUpload';
import FileDropzone from './upload/FileDropzone';
import FileList from './upload/FileList';
import UploadProgress from './upload/UploadProgress';
import CustomerSelector from './upload/CustomerSelector';
import DocumentTypeSelector from './upload/DocumentTypeSelector';

interface DocumentUploadProps {
  customers: { id: string; full_name: string }[];
  onUploadSuccess: () => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ customers, onUploadSuccess }) => {
  const {
    selectedCustomerId,
    setSelectedCustomerId,
    documentType,
    setDocumentType,
    isUploading,
    uploadProgress,
    files,
    setFiles,
    uploadDocuments
  } = useDocumentUpload(onUploadSuccess);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
      
      <div className="space-y-4">
        <CustomerSelector 
          customers={customers} 
          selectedCustomerId={selectedCustomerId} 
          onCustomerChange={setSelectedCustomerId} 
        />

        <DocumentTypeSelector 
          documentType={documentType} 
          onDocumentTypeChange={setDocumentType} 
        />

        <FileDropzone onFilesSelected={setFiles} />

        <FileList files={files} />

        <UploadProgress isUploading={isUploading} progress={uploadProgress} />

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
