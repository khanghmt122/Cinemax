import { Link } from "react-router";
import { Star, Clock, Calendar } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import type { Movie } from "../../data/mockData";
import { motion } from "motion/react";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
    >
      <Link to={`/movie/${movie.id}`}>
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.poster}
            alt={movie.titleVi}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          
          {/* Rating Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-lg bg-black/70 backdrop-blur-sm px-2 py-1">
            <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-semibold text-white">{movie.rating}</span>
          </div>
          
          {/* Status Badge */}
          <Badge 
            variant={movie.status === "now-showing" ? "destructive" : "secondary"}
            className="absolute top-3 left-3 text-xs"
          >
            {movie.status === "now-showing" ? "Đang Chiếu" : "Sắp Chiếu"}
          </Badge>
        </div>
        
        {/* Info */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-white line-clamp-1 group-hover:text-red-600 transition-colors">
            {movie.titleVi}
          </h3>
          
          <div className="flex flex-wrap gap-1.5">
            {movie.genre.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="px-2 py-0.5 rounded bg-white/5 text-xs text-white/60"
              >
                {genre}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-xs text-white/50">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{movie.duration} phút</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{movie.ageRating}</span>
            </div>
          </div>
          
          <Link to={`/booking/${movie.id}`}>
            <Button 
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              Đặt vé
            </Button>
          </Link>
        </div>
      </Link>
    </motion.div>
  );
}
