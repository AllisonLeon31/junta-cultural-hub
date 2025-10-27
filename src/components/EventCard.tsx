import { Calendar, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useNavigate } from "react-router-dom";

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
  goal?: number;
  raised?: number;
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
  const navigate = useNavigate();
  return (
    <Card className="overflow-hidden shadow-card hover:shadow-card-hover transition-smooth cursor-pointer group">
      <div className="relative overflow-hidden bg-secondary">
        <img
          src={image}
          alt={`${title} - ${category}`}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent && !parent.querySelector('.placeholder-content')) {
              const placeholder = document.createElement('div');
              placeholder.className = 'placeholder-content w-full h-48 bg-secondary flex flex-col items-center justify-center';
              placeholder.innerHTML = `
                <svg class="w-12 h-12 text-muted-foreground mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <p class="text-muted-foreground text-xs">${category}</p>
              `;
              parent.insertBefore(placeholder, parent.firstChild);
            }
          }}
        />
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 
          className="text-xl font-semibold mb-2 text-foreground cursor-pointer hover:text-primary transition-colors"
          onClick={() => navigate(`/evento/${id}`)}
        >
          {title}
        </h3>
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
        
        <div className="flex gap-2">
          <Button 
            className="flex-1 shadow-sm" 
            variant="outline"
            onClick={() => navigate(`/evento/${id}`)}
          >
            Más información
          </Button>
          <Button 
            className="flex-1 shadow-sm" 
            onClick={() => onViewDetails(id)}
          >
            Donar
          </Button>
        </div>
      </div>
    </Card>
  );
};
