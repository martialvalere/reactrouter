import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Film } from "lucide-react";
import { Movie } from "./MovieCard";
import { useToast } from "@/hooks/use-toast";

interface AddMovieFormProps {
  onAddMovie: (movie: Omit<Movie, "id">) => void;
}

const AddMovieForm = ({ onAddMovie }: AddMovieFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    posterURL: "",
    rating: "",
    trailer: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.rating) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    onAddMovie({
      title: formData.title,
      description: formData.description,
      posterURL: formData.posterURL || "https://via.placeholder.com/300x400/374151/f3f4f6?text=No+Image",
      rating: parseInt(formData.rating),
      trailer: formData.trailer || ""
    });

    setFormData({
      title: "",
      description: "",
      posterURL: "",
      rating: "",
      trailer: ""
    });
    setIsOpen(false);
    
    toast({
      title: "Film ajouté !",
      description: `"${formData.title}" a été ajouté à votre collection`,
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) {
    return (
      <div className="flex justify-center mb-8">
        <Button 
          onClick={() => setIsOpen(true)}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Ajouter un film
        </Button>
      </div>
    );
  }

  return (
    <Card className="mb-8 bg-card border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Film className="w-5 h-5" />
          Ajouter un nouveau film
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Titre *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Ex: Inception"
                required
                className="bg-input border-border focus:border-ring"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating" className="text-sm font-medium">
                Note *
              </Label>
              <Select value={formData.rating} onValueChange={(value) => handleChange("rating", value)}>
                <SelectTrigger className="bg-input border-border focus:border-ring">
                  <SelectValue placeholder="Choisir une note" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">⭐ 1 étoile</SelectItem>
                  <SelectItem value="2">⭐⭐ 2 étoiles</SelectItem>
                  <SelectItem value="3">⭐⭐⭐ 3 étoiles</SelectItem>
                  <SelectItem value="4">⭐⭐⭐⭐ 4 étoiles</SelectItem>
                  <SelectItem value="5">⭐⭐⭐⭐⭐ 5 étoiles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="posterURL" className="text-sm font-medium">
              URL du poster (optionnel)
            </Label>
            <Input
              id="posterURL"
              value={formData.posterURL}
              onChange={(e) => handleChange("posterURL", e.target.value)}
              placeholder="https://example.com/poster.jpg"
              className="bg-input border-border focus:border-ring"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trailer" className="text-sm font-medium">
              URL de la bande-annonce (optionnel)
            </Label>
            <Input
              id="trailer"
              value={formData.trailer}
              onChange={(e) => handleChange("trailer", e.target.value)}
              placeholder="https://www.youtube.com/embed/..."
              className="bg-input border-border focus:border-ring"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Décrivez l'intrigue du film..."
              required
              rows={3}
              className="bg-input border-border focus:border-ring resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Ajouter le film
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="border-border hover:bg-accent"
            >
              Annuler
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddMovieForm;