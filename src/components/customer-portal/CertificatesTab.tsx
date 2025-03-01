
import { FileText } from "lucide-react";
import CertificateItem, { Certificate } from "./CertificateItem";

type CertificatesTabProps = {
  certificates: Certificate[];
  onDownload: (id: string, type: string) => void;
};

const CertificatesTab = ({ certificates, onDownload }: CertificatesTabProps) => {
  return (
    <div className="space-y-4">
      {certificates.length > 0 ? (
        certificates.map((cert) => (
          <CertificateItem 
            key={cert.id} 
            certificate={cert} 
            onDownload={onDownload} 
          />
        ))
      ) : (
        <div className="text-center py-8">
          <FileText className="h-16 w-16 mx-auto text-muted-foreground opacity-30 mb-4" />
          <h3 className="text-lg font-medium">No certificates found</h3>
          <p className="text-muted-foreground">Try adjusting your search term</p>
        </div>
      )}
    </div>
  );
};

export default CertificatesTab;
