
import { Button } from "@/components/ui/button";
import { Droplet, Thermometer, Play, Filter } from "lucide-react";
import { useState } from "react";
import FaqVideoItem, { FaqVideo } from "./FaqVideoItem";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type FaqVideosTabProps = {
  videos: FaqVideo[];
  onPlay: (videoId: number) => void;
};

const FaqVideosTab = ({ videos, onPlay }: FaqVideosTabProps) => {
  const [filter, setFilter] = useState<string | null>(null);

  const filteredVideos = filter 
    ? videos.filter(video => video.category.toLowerCase() === filter.toLowerCase())
    : videos;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h2 className="text-lg font-medium">Video Tutorials</h2>
        
        {/* Mobile filter menu */}
        <div className="flex gap-2 w-full sm:w-auto">
          <Popover>
            <PopoverTrigger asChild className="block sm:hidden w-full">
              <Button variant="outline" size="sm" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                <span>Filter</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="end">
              <div className="flex flex-col p-2 space-y-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="justify-start" 
                  onClick={() => setFilter(null)}
                >
                  <span>All Categories</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="justify-start" 
                  onClick={() => setFilter("plumbing")}
                >
                  <Droplet className="h-4 w-4 mr-2" />
                  <span>Plumbing</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="justify-start" 
                  onClick={() => setFilter("heating")}
                >
                  <Thermometer className="h-4 w-4 mr-2" />
                  <span>Heating</span>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Desktop filter buttons */}
          <div className="hidden sm:flex gap-2">
            <Button 
              variant={filter === null ? "default" : "outline"} 
              size="sm" 
              onClick={() => setFilter(null)}
            >
              All
            </Button>
            <Button 
              variant={filter === "plumbing" ? "default" : "outline"} 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => setFilter("plumbing")}
            >
              <Droplet className="h-4 w-4" />
              <span>Plumbing</span>
            </Button>
            <Button 
              variant={filter === "heating" ? "default" : "outline"} 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => setFilter("heating")}
            >
              <Thermometer className="h-4 w-4" />
              <span>Heating</span>
            </Button>
          </div>
        </div>
      </div>
      
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <FaqVideoItem key={video.id} video={video} onPlay={onPlay} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Play className="h-16 w-16 mx-auto text-muted-foreground opacity-30 mb-4" />
          <h3 className="text-lg font-medium">No video tutorials found</h3>
          <p className="text-muted-foreground">Try adjusting your search term or filter</p>
        </div>
      )}
    </div>
  );
};

export default FaqVideosTab;
