
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
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{certificate.name}</span>
          <span className={`text-sm px-2 py-1 rounded-full ${
            certificate.status === "Valid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {certificate.status}
          </span>
        </CardTitle>
        <CardDescription>Certificate ID: {certificate.id}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Issued: {new Date(certificate.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Expires: {new Date(certificate.expires).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 md:col-span-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span>Property: {certificate.property}</span>
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
          <span>Download</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CertificateItem;
