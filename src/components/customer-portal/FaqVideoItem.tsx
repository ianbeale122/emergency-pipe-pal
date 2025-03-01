
import { Play } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type FaqVideo = {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
};

type FaqVideoItemProps = {
  video: FaqVideo;
  onPlay: (videoId: number) => void;
};

const FaqVideoItem = ({ video, onPlay }: FaqVideoItemProps) => {
  return (
    <Card key={video.id} className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <div className="aspect-video bg-gray-200 relative overflow-hidden">
          <img 
            src={video.thumbnail} 
            alt={video.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white text-black hover:bg-white/90"
              onClick={() => onPlay(video.id)}
            >
              <Play className="h-5 w-5 fill-current" />
            </Button>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>
      <CardContent className="pt-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium">{video.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {video.category}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full flex items-center gap-2"
          onClick={() => onPlay(video.id)}
        >
          <Play className="h-4 w-4" />
          <span>Watch Tutorial</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FaqVideoItem;
