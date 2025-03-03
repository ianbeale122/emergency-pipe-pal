
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FaqVideo } from "@/types/faq";
import { faqs, plumbingVideos } from "@/data/faqData";

// Import refactored components
import FaqAccordion from "@/components/faq/FaqAccordion";
import VideoGrid from "@/components/faq/VideoGrid";
import VideoModal from "@/components/faq/VideoModal";
import IssueSubmission from "@/components/faq/IssueSubmission";

const FAQ = () => {
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  
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
              <FaqAccordion faqs={faqs} />
            </TabsContent>
            
            <TabsContent value="video-tutorials">
              <VideoGrid videos={plumbingVideos} onPlay={handlePlay} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Floating Submit Issue button and sheet */}
      <IssueSubmission />

      {/* Video Modal */}
      <VideoModal 
        activeVideoId={activeVideoId} 
        onClose={handleCloseVideo} 
        getVideoById={getVideoById} 
      />
    </div>
  );
};

export default FAQ;
