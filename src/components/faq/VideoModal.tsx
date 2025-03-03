
import { Button } from "@/components/ui/button";
import { Play, X } from "lucide-react";
import { FaqVideo } from "@/types/faq";

type VideoModalProps = {
  activeVideoId: number | null;
  onClose: () => void;
  getVideoById: (id: number) => FaqVideo | undefined;
};

const VideoModal = ({ activeVideoId, onClose, getVideoById }: VideoModalProps) => {
  if (!activeVideoId) return null;
  
  const video = getVideoById(activeVideoId);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="relative w-full max-w-4xl rounded-lg overflow-hidden bg-white">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-medium text-lg">
            {video?.title}
          </h3>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="aspect-video bg-gray-100 flex items-center justify-center">
          {/* This would be replaced with actual video player in production */}
          <div className="text-center">
            <Play className="h-20 w-20 mx-auto text-primary opacity-80 mb-4" />
            <p className="text-gray-600">Video placeholder for "{video?.title}"</p>
            <p className="text-sm text-gray-500 mt-2">Duration: {video?.duration}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
