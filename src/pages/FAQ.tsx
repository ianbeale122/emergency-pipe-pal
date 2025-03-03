
import { Navigation } from "@/components/Navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, X, Upload, Camera, Video, Plus } from "lucide-react";
import { useState } from "react";
import FaqVideoItem from "@/components/customer-portal/FaqVideoItem";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

const FAQ = () => {
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { toast } = useToast();
  
  const faqs = [
    {
      question: "How often should I service my boiler?",
      answer: "We recommend annual boiler servicing to ensure optimal performance and safety. Regular maintenance helps prevent breakdowns and extends the life of your boiler.",
    },
    {
      question: "What are your emergency call-out rates?",
      answer: "Our emergency call-out rates vary depending on the time of day and type of service required. We provide transparent pricing before beginning any work.",
    },
    {
      question: "Do you offer any guarantees on your work?",
      answer: "Yes, all our work comes with a satisfaction guarantee. Parts and labor are typically warranted for 12 months from the date of service.",
    },
    {
      question: "How can I prevent frozen pipes in winter?",
      answer: "To prevent frozen pipes, insulate exposed pipes, keep your heating on at a low setting during cold periods, and fix any dripping taps. If you're going away, consider draining your water system.",
    },
    {
      question: "What should I do if I notice a water leak?",
      answer: "If you notice a water leak, turn off the water at the main stopcock immediately to prevent further damage. Then call us for emergency assistance. While waiting, place buckets to collect water and move valuable items away from the affected area.",
    },
  ];

  const plumbingVideos = [
    {
      id: 1,
      title: "How to Fix a Dripping Tap",
      thumbnail: "https://images.unsplash.com/photo-1540587659271-5a67befab240",
      duration: "5:23",
      category: "Plumbing",
    },
    {
      id: 2,
      title: "Unblocking a Sink",
      thumbnail: "https://images.unsplash.com/photo-1540518614846-7eded433c457",
      duration: "4:15",
      category: "Plumbing",
    },
    {
      id: 3,
      title: "How to Stop a Running Toilet",
      thumbnail: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b",
      duration: "6:42",
      category: "Plumbing",
    },
    {
      id: 4,
      title: "Dealing with Low Water Pressure",
      thumbnail: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7",
      duration: "7:18",
      category: "Plumbing",
    },
    {
      id: 5,
      title: "Checking Your Boiler Pressure",
      thumbnail: "https://images.unsplash.com/photo-1524270000-94f8ff3b8ff2",
      duration: "3:45",
      category: "Heating",
    },
    {
      id: 6,
      title: "Bleeding Radiators Guide",
      thumbnail: "https://images.unsplash.com/photo-1581092242409-b27d24be9536",
      duration: "4:32",
      category: "Heating",
    },
  ];

  const handlePlay = (videoId: number) => {
    setActiveVideoId(videoId);
  };

  const handleCloseVideo = () => {
    setActiveVideoId(null);
  };

  const getVideoById = (id: number) => {
    return plumbingVideos.find(video => video.id === id);
  };

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
      setIsSheetOpen(false);
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
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 animate-fade-up">Frequently Asked Questions</h1>
          
          <Tabs defaultValue="text-faqs" className="animate-fade-up">
            <TabsList className="mb-8">
              <TabsTrigger value="text-faqs">Text FAQs</TabsTrigger>
              <TabsTrigger value="video-tutorials">Video Tutorials</TabsTrigger>
            </TabsList>
            
            <TabsContent value="text-faqs">
              <Accordion type="single" collapsible className="animate-fade-up">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            
            <TabsContent value="video-tutorials">
              <div className="animate-fade-up">
                <h2 className="text-xl font-semibold mb-6">DIY Plumbing & Heating Guides</h2>
                <p className="text-muted-foreground mb-8">
                  Watch these helpful video tutorials to solve common plumbing and heating issues. 
                  These guides can help you tackle simple problems yourself, but remember to call 
                  a professional for complex issues.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {plumbingVideos.map((video) => (
                    <FaqVideoItem key={video.id} video={video} onPlay={handlePlay} />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Floating Submit Issue Button */}
      <Button 
        onClick={() => setIsSheetOpen(true)}
        className="fixed bottom-20 right-6 md:bottom-6 md:right-6 z-40 rounded-full shadow-lg"
        size="lg"
      >
        <Plus className="mr-2" />
        Submit Issue
      </Button>

      {/* Submit Issue Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="overflow-y-auto scrollbar-hide">
          <SheetHeader className="mb-6">
            <SheetTitle>Submit Your Plumbing Issue</SheetTitle>
            <SheetDescription>
              Upload photos or videos of the issue to help us diagnose the problem more accurately. Our team will review your submission and contact you with next steps.
            </SheetDescription>
          </SheetHeader>
          
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
        </SheetContent>
      </Sheet>

      {/* Video Modal */}
      {activeVideoId && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="relative w-full max-w-4xl rounded-lg overflow-hidden bg-white">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-medium text-lg">
                {getVideoById(activeVideoId)?.title}
              </h3>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleCloseVideo}
                className="rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              {/* This would be replaced with actual video player in production */}
              <div className="text-center">
                <Play className="h-20 w-20 mx-auto text-primary opacity-80 mb-4" />
                <p className="text-gray-600">Video placeholder for "{getVideoById(activeVideoId)?.title}"</p>
                <p className="text-sm text-gray-500 mt-2">Duration: {getVideoById(activeVideoId)?.duration}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQ;
