
import React from 'react';
import { Label } from '@/components/ui/label';

interface FileListProps {
  files: File[];
}

const FileList: React.FC<FileListProps> = ({ files }) => {
  if (files.length === 0) return null;

  return (
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
  );
};

export default FileList;
