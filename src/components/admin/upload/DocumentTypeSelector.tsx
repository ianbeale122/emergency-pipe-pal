
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DocumentTypeSelectorProps {
  documentType: string;
  onDocumentTypeChange: (type: string) => void;
}

const DocumentTypeSelector: React.FC<DocumentTypeSelectorProps> = ({ 
  documentType, 
  onDocumentTypeChange 
}) => {
  return (
    <div>
      <Label htmlFor="documentType" className="text-indigo-300">Document Type</Label>
      <Select value={documentType} onValueChange={onDocumentTypeChange}>
        <SelectTrigger id="documentType" className="bg-slate-800 border-slate-700 text-white">
          <SelectValue placeholder="Select document type" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border border-slate-700 text-white">
          <SelectItem value="invoice" className="text-white hover:bg-slate-700 focus:bg-slate-700">Invoice</SelectItem>
          <SelectItem value="certificate" className="text-white hover:bg-slate-700 focus:bg-slate-700">Gas Certificate</SelectItem>
          <SelectItem value="contract" className="text-white hover:bg-slate-700 focus:bg-slate-700">Contract</SelectItem>
          <SelectItem value="other" className="text-white hover:bg-slate-700 focus:bg-slate-700">Other</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DocumentTypeSelector;
