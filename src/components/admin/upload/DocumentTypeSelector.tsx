
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
      <Label htmlFor="documentType">Document Type</Label>
      <Select value={documentType} onValueChange={onDocumentTypeChange}>
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
  );
};

export default DocumentTypeSelector;
