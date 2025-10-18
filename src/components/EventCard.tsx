import { Calendar, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface EventCardProps {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  location: string;
  image: string;
  progress: number;
  donors: number;
  onViewDetails: (id: string) => void;
}

export const EventCard = ({
  id,
  title,
  subtitle,
  category,
  date,
  location,
  image,
  progress,
  donors,
  onViewDetails,
}: EventCardProps) => {
  return (
    <Card className="overflow-hidden shadow-card hover:shadow-card-hover transition-smooth cursor-pointer group">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{subtitle}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progreso</span>
            <span className="font-semibold text-primary">{progress}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">{donors} donadores</p>
        </div>
        
        <Button 
          className="w-full" 
          onClick={() => onViewDetails(id)}
        >
          Ver Detalles
        </Button>
      </div>
    </Card>
  );
};
