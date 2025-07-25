import { useState, useMemo } from "react";
import MovieList from "@/components/MovieList";
import Filter from "@/components/Filter";
import AddMovieForm from "@/components/AddMovieForm";
import { Movie } from "@/components/MovieCard";
import { Film } from "lucide-react";

interface IndexProps {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const Index = ({ movies, setMovies }: IndexProps) => {
  // États pour les filtres
  const [titleFilter, setTitleFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

  // Fonction pour ajouter un nouveau film
  const handleAddMovie = (newMovie: Omit<Movie, "id">) => {
    const movieWithId: Movie = {
      ...newMovie,
      id: Date.now().toString() // Simple ID generation
    };
    setMovies(prevMovies => [movieWithId, ...prevMovies]);
  };

  // Films filtrés avec useMemo pour optimiser les performances
  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchesTitle = movie.title
        .toLowerCase()
        .includes(titleFilter.toLowerCase());
      
      const matchesRating = ratingFilter === "all" || 
        movie.rating >= parseInt(ratingFilter);
      
      return matchesTitle && matchesRating;
    });
  }, [movies, titleFilter, ratingFilter]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Film className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Hooked Movies
              </h1>
            </div>
            <p className="text-muted-foreground">
              Découvrez et gérez votre collection de films favoris
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Add Movie Form */}
        <AddMovieForm onAddMovie={handleAddMovie} />

        {/* Filters */}
        <div className="mb-8">
          <Filter
            titleFilter={titleFilter}
            ratingFilter={ratingFilter}
            onTitleChange={setTitleFilter}
            onRatingChange={setRatingFilter}
          />
        </div>

        {/* Movies Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredMovies.length} film{filteredMovies.length !== 1 ? 's' : ''} trouvé{filteredMovies.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Movie List */}
        <MovieList movies={filteredMovies} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-16">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-muted-foreground text-sm">
            Créé avec React Hooks • useState, useMemo, et plus
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
