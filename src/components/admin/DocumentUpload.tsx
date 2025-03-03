
import React from 'react';
import { Button } from '@/components/ui/button';
import { useDocumentUpload } from '@/hooks/useDocumentUpload';
import FileDropzone from './upload/FileDropzone';
import FileList from './upload/FileList';
import UploadProgress from './upload/UploadProgress';
import CustomerSelector from './upload/CustomerSelector';
import DocumentTypeSelector from './upload/DocumentTypeSelector';
import { Upload, FileText } from 'lucide-react';

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
    <div className="p-6 bg-slate-900 text-white rounded-lg shadow-lg border border-indigo-900/20">
      <div className="flex items-center mb-6">
        <FileText className="h-6 w-6 text-indigo-500 mr-2" />
        <h2 className="text-2xl font-bold">Document Management</h2>
      </div>
      
      <div className="space-y-6">
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <h3 className="text-lg font-medium mb-4 text-indigo-300">Upload Documents</h3>
          
          <CustomerSelector 
            customers={customers} 
            selectedCustomerId={selectedCustomerId} 
            onCustomerChange={setSelectedCustomerId} 
          />

          <div className="mt-4">
            <DocumentTypeSelector 
              documentType={documentType} 
              onDocumentTypeChange={setDocumentType} 
            />
          </div>

          <div className="mt-6 border border-dashed border-indigo-700/50 rounded-lg p-1">
            <FileDropzone onFilesSelected={setFiles} />
          </div>

          <div className="mt-4">
            <FileList files={files} />
          </div>

          <div className="mt-4">
            <UploadProgress isUploading={isUploading} progress={uploadProgress} />
          </div>

          <Button 
            onClick={uploadDocuments} 
            disabled={isUploading || files.length === 0 || !selectedCustomerId}
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center"
          >
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Upload Documents'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
