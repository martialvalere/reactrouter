import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star } from "lucide-react";

interface FilterProps {
  titleFilter: string;
  ratingFilter: string;
  onTitleChange: (title: string) => void;
  onRatingChange: (rating: string) => void;
}

const Filter = ({ titleFilter, ratingFilter, onTitleChange, onRatingChange }: FilterProps) => {
  return (
    <Card className="bg-card border-border/50">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title Filter */}
          <div className="space-y-2">
            <Label htmlFor="title-filter" className="text-sm font-medium text-foreground flex items-center gap-2">
              <Search className="w-4 h-4" />
              Rechercher par titre
            </Label>
            <Input
              id="title-filter"
              type="text"
              placeholder="Tapez le nom d'un film..."
              value={titleFilter}
              onChange={(e) => onTitleChange(e.target.value)}
              className="bg-input border-border focus:border-ring focus:ring-ring/20"
            />
          </div>

          {/* Rating Filter */}
          <div className="space-y-2">
            <Label htmlFor="rating-filter" className="text-sm font-medium text-foreground flex items-center gap-2">
              <Star className="w-4 h-4" />
              Filtrer par note
            </Label>
            <Select value={ratingFilter} onValueChange={onRatingChange}>
              <SelectTrigger className="bg-input border-border focus:border-ring focus:ring-ring/20">
                <SelectValue placeholder="Toutes les notes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les notes</SelectItem>
                <SelectItem value="5">⭐⭐⭐⭐⭐ (5 étoiles)</SelectItem>
                <SelectItem value="4">⭐⭐⭐⭐ (4 étoiles et +)</SelectItem>
                <SelectItem value="3">⭐⭐⭐ (3 étoiles et +)</SelectItem>
                <SelectItem value="2">⭐⭐ (2 étoiles et +)</SelectItem>
                <SelectItem value="1">⭐ (1 étoile et +)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Filter;