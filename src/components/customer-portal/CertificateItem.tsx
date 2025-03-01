
import { FileText, Calendar, Download } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type Certificate = {
  id: string;
  name: string;
  date: string;
  expires: string;
  property: string;
  status: string;
};

type CertificateItemProps = {
  certificate: Certificate;
  onDownload: (id: string, type: string) => void;
};

const CertificateItem = ({ certificate, onDownload }: CertificateItemProps) => {
  return (
    <Card key={certificate.id} className="transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <CardTitle className="text-lg">{certificate.name}</CardTitle>
          <span className={`text-xs px-2 py-1 rounded-full ${
            certificate.status === "Valid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {certificate.status}
          </span>
        </div>
        <CardDescription className="text-xs sm:text-sm">Certificate ID: {certificate.id}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate">Issued: {new Date(certificate.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate">Expires: {new Date(certificate.expires).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate">Property: {certificate.property}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="ml-auto flex items-center gap-2"
          onClick={() => onDownload(certificate.id, "Certificate")}
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Download</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CertificateItem;
