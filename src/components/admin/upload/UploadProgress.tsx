
import React from 'react';

interface UploadProgressProps {
  isUploading: boolean;
  progress: number;
}

const UploadProgress: React.FC<UploadProgressProps> = ({ isUploading, progress }) => {
  if (!isUploading) return null;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className="bg-primary h-2.5 rounded-full" 
        style={{ width: `${progress}%` }}
      ></div>
      <p className="text-xs text-center mt-1">{progress}%</p>
    </div>
  );
};

export default UploadProgress;
