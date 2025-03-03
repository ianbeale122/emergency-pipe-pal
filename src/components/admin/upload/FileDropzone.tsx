
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Label } from '@/components/ui/label';

interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ onFilesSelected }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      onFilesSelected(acceptedFiles);
    },
  });

  return (
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
  );
};

export default FileDropzone;
