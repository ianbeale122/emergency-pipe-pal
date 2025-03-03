
import FaqVideoItem from "@/components/customer-portal/FaqVideoItem";
import { FaqVideo } from "@/types/faq";

type VideoGridProps = {
  videos: FaqVideo[];
  onPlay: (videoId: number) => void;
};

const VideoGrid = ({ videos, onPlay }: VideoGridProps) => {
  return (
    <div className="animate-fade-up">
      <h2 className="text-xl font-semibold mb-6">DIY Plumbing & Heating Guides</h2>
      <p className="text-muted-foreground mb-8">
        Watch these helpful video tutorials to solve common plumbing and heating issues. 
        These guides can help you tackle simple problems yourself, but remember to call 
        a professional for complex issues.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <FaqVideoItem key={video.id} video={video} onPlay={onPlay} />
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
