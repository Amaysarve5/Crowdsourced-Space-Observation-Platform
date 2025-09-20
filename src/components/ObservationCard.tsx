import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Calendar,
  MapPin,
  MoreVertical 
} from "lucide-react";

interface Observation {
  id: string;
  title: string;
  description: string;
  image?: string;
  category: string;
  location: string;
  date: string;
  user: {
    name: string;
    avatar?: string;
  };
  likes: number;
  comments: number;
  isLiked: boolean;
}

interface ObservationCardProps {
  observation: Observation;
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onShare?: (id: string) => void;
}

const ObservationCard = ({ observation, onLike, onComment, onShare }: ObservationCardProps) => {
  const [isLiked, setIsLiked] = useState(observation.isLiked);
  const [likeCount, setLikeCount] = useState(observation.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.(observation.id);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Meteor': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      'Satellite': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'Galaxy': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'Nebula': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      'Planet': 'bg-green-500/20 text-green-300 border-green-500/30',
      'Other': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    };
    return colors[category] || colors['Other'];
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={observation.user.avatar} />
              <AvatarFallback className="bg-gradient-cosmic text-white">
                {observation.user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{observation.user.name}</p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{observation.date}</span>
                {observation.location && (
                  <>
                    <span>•</span>
                    <MapPin className="h-3 w-3" />
                    <span>{observation.location}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getCategoryColor(observation.category)}>
              {observation.category}
            </Badge>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
          {observation.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {observation.description}
        </p>
        
        {observation.image && (
          <div className="relative overflow-hidden rounded-lg bg-muted">
            <img
              src={observation.image}
              alt={observation.title}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-3 border-t border-border/50">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-colors ${
                isLiked ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm">{likeCount}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onComment?.(observation.id)}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{observation.comments}</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShare?.(observation.id)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ObservationCard;