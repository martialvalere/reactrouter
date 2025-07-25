import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star } from "lucide-react";
import { Movie } from "@/components/MovieCard";

interface MovieDetailsProps {
  movies: Movie[];
}

const MovieDetails = ({ movies }: MovieDetailsProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const movie = movies.find(m => m.id === id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Film non trouvé</h2>
          <Button onClick={() => navigate("/")} className="bg-primary hover:bg-primary/90">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Button>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating
            ? "fill-rating-gold text-rating-gold"
            : "fill-rating-silver/30 text-rating-silver/30"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Button 
            onClick={() => navigate("/")} 
            variant="ghost" 
            className="hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Movie poster */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <img
                src={movie.posterURL}
                alt={movie.title}
                className="w-full h-96 lg:h-[500px] object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/400x600/374151/f3f4f6?text=No+Image";
                }}
              />
            </Card>
          </div>

          {/* Movie details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                  {movie.title}
                </h1>
                <Badge className="bg-primary/90 hover:bg-primary text-lg px-3 py-1">
                  {movie.rating}/5
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 mb-6">
                {renderStars(movie.rating)}
                <span className="ml-2 text-muted-foreground">
                  ({movie.rating}/5)
                </span>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Description
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {movie.description}
                </p>
              </CardContent>
            </Card>

            {movie.trailer && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Bande-annonce
                  </h2>
                  <div className="aspect-video">
                    <iframe
                      src={movie.trailer}
                      title={`Bande-annonce de ${movie.title}`}
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MovieDetails;