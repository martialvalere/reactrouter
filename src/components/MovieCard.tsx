import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface Movie {
  id: string;
  title: string;
  description: string;
  posterURL: string;
  rating: number;
  trailer: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? "fill-rating-gold text-rating-gold"
            : "fill-rating-silver/30 text-rating-silver/30"
        }`}
      />
    ));
  };

  return (
    <Card 
      className="group overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-card to-card/80 border-border/50 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={movie.posterURL}
          alt={movie.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/300x400/374151/f3f4f6?text=No+Image";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Badge className="absolute top-3 right-3 bg-primary/90 hover:bg-primary">
          {movie.rating}/5
        </Badge>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <h3 className="font-bold text-lg text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
          {movie.title}
        </h3>
        
        <div className="flex items-center gap-1">
          {renderStars(movie.rating)}
          <span className="ml-2 text-sm text-muted-foreground">
            ({movie.rating}/5)
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {movie.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default MovieCard;