
import { Navigation } from "@/components/Navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, X } from "lucide-react";
import { useState } from "react";
import FaqVideoItem from "@/components/customer-portal/FaqVideoItem";

const FAQ = () => {
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  
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
