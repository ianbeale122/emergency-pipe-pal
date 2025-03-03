
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { X, Upload, Camera, Video } from "lucide-react";

const IssueSubmissionForm = ({ onClose }: { onClose: () => void }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please upload at least one photo or video of the issue.",
        variant: "destructive"
      });
      return;
    }

    if (!description) {
      toast({
        title: "Description required",
        description: "Please provide a brief description of the issue.",
        variant: "destructive"
      });
      return;
    }

    if (!contact) {
      toast({
        title: "Contact information required",
        description: "Please provide your contact information.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setFiles([]);
      setDescription("");
      setContact("");
      onClose();
      toast({
        title: "Submission successful",
        description: "We've received your plumbing issue details and will contact you shortly.",
        duration: 5000,
      });
    }, 2000);
  };

  // Function to create input element with proper event typing
  const createFileInput = (accept: string, capture: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.capture = capture;
    input.onchange = (e) => {
      // Cast the event to the correct type
      const inputEvent = e as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileChange(inputEvent);
    };
    return input;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="file-upload" className="font-medium">Upload Photos/Videos</Label>
          <div className="mt-2 flex items-center gap-4">
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <Upload className="h-5 w-5 text-primary" />
              <span>Choose files</span>
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="sr-only"
              />
            </label>
            <div className="flex gap-2">
              <Button 
                type="button" 
                size="icon" 
                variant="outline"
                onClick={() => {
                  const input = createFileInput('image/*', 'environment');
                  input.click();
                }}
              >
                <Camera className="h-5 w-5" />
              </Button>
              <Button 
                type="button" 
                size="icon" 
                variant="outline"
                onClick={() => {
                  const input = createFileInput('video/*', 'environment');
                  input.click();
                }}
              >
                <Video className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Accepted formats: JPEG, PNG, MP4, MOV (max 50MB per file)
          </p>
        </div>
        
        {files.length > 0 && (
          <div className="space-y-3">
            <Label>Uploaded Files</Label>
            <div className="border rounded-md p-3 space-y-2 bg-gray-50">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white rounded-md shadow-sm">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className="h-10 w-10 flex-shrink-0 rounded bg-gray-100 flex items-center justify-center">
                      {file.type.startsWith('image/') ? (
                        <Camera className="h-5 w-5 text-gray-500" />
                      ) : (
                        <Video className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div>
          <Label htmlFor="description" className="font-medium">Describe the Issue</Label>
          <Textarea
            id="description"
            placeholder="Please describe what's happening, when it started, and any other details that might help us understand the problem..."
            className="mt-2 resize-none"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="contact" className="font-medium">Your Contact Information</Label>
          <Input
            id="contact"
            placeholder="Phone number or email address"
            className="mt-2"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isUploading || files.length === 0 || !description || !contact}
      >
        {isUploading ? "Uploading..." : "Submit Issue"}
      </Button>
    </form>
  );
};

export default IssueSubmissionForm;
