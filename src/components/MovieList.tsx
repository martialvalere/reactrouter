import MovieCard, { Movie } from "./MovieCard";

interface MovieListProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <span className="text-2xl">🎬</span>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Aucun film trouvé
        </h3>
        <p className="text-muted-foreground">
          Ajoutez votre premier film ou modifiez vos filtres
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;