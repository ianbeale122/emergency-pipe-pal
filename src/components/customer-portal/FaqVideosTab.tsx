
import { Button } from "@/components/ui/button";
import { Droplet, Thermometer, Play } from "lucide-react";
import FaqVideoItem, { FaqVideo } from "./FaqVideoItem";

type FaqVideosTabProps = {
  videos: FaqVideo[];
  onPlay: (videoId: number) => void;
};

const FaqVideosTab = ({ videos, onPlay }: FaqVideosTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Video Tutorials</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Droplet className="h-4 w-4" />
            <span>Plumbing</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Thermometer className="h-4 w-4" />
            <span>Heating</span>
          </Button>
        </div>
      </div>
      
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <FaqVideoItem key={video.id} video={video} onPlay={onPlay} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Play className="h-16 w-16 mx-auto text-muted-foreground opacity-30 mb-4" />
          <h3 className="text-lg font-medium">No video tutorials found</h3>
          <p className="text-muted-foreground">Try adjusting your search term</p>
        </div>
      )}
    </div>
  );
};

export default FaqVideosTab;
