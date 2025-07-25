import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MovieDetails from "./pages/MovieDetails";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import { Movie } from "./components/MovieCard";

const queryClient = new QueryClient();

// Films d'exemple pour commencer
const initialMovies: Movie[] = [
  {
    id: "1",
    title: "Inception",
    description: "Dom Cobb est un voleur expérimenté dans l'art périlleux de l'extraction, voler les secrets les plus intimes du subconscient pendant que l'esprit est le plus vulnérable.",
    posterURL: "https://images.unsplash.com/photo-1489599687647-a5faa05e39b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    rating: 5,
    trailer: "https://www.youtube.com/embed/YoHD9XEInc0"
  },
  {
    id: "2", 
    title: "Interstellar",
    description: "Lorsque la Terre devient inhabitable, une équipe d'explorateurs entreprend la mission la plus importante de l'histoire de l'humanité : voyager au-delà de notre galaxie.",
    posterURL: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    rating: 5,
    trailer: "https://www.youtube.com/embed/zSWdZVtXT7E"
  },
  {
    id: "3",
    title: "The Dark Knight", 
    description: "Batman relève l'un de ses plus grands défis psychologiques et physiques lorsqu'il doit affronter un terroriste connu sous le nom de Joker.",
    posterURL: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    rating: 4,
    trailer: "https://www.youtube.com/embed/EXeTwQWrcwY"
  },
  {
    id: "4",
    title: "Pulp Fiction",
    description: "L'histoire de plusieurs criminels de Los Angeles dont les vies s'entremêlent de façon inattendue.",
    posterURL: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80", 
    rating: 4,
    trailer: "https://www.youtube.com/embed/s7EdQ4FqbhY"
  }
];

const App = () => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index movies={movies} setMovies={setMovies} />} />
            <Route path="/movie/:id" element={<MovieDetails movies={movies} />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
