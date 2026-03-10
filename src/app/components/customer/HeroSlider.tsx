import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight, Play, Star, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { movies } from "../../data/mockData";
import { motion, AnimatePresence } from "motion/react";

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredMovies = movies.filter(m => m.status === "now-showing").slice(0, 3);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [featuredMovies.length]);
  
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length);
  };
  
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
  };
  
  return (
    <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {featuredMovies.map((movie, index) => (
          index === currentIndex && (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${movie.poster})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
              </div>
              
              {/* Content */}
              <div className="relative container mx-auto h-full flex items-center px-4">
                <div className="max-w-2xl space-y-6">
                  <div className="flex items-center gap-3">
                    <Badge variant="destructive" className="text-sm px-3 py-1">
                      {movie.status === "now-showing" ? "Đang Chiếu" : "Sắp Chiếu"}
                    </Badge>
                    <div className="flex items-center gap-2 text-white/70">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm">{movie.rating}/10</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/70">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{movie.duration} phút</span>
                    </div>
                  </div>
                  
                  <h1 className="text-5xl md:text-6xl font-bold text-white">
                    {movie.titleVi}
                  </h1>
                  
                  <p className="text-lg text-white/80 line-clamp-3">
                    {movie.descriptionVi}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {movie.genre.map((g) => (
                      <span key={g} className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm">
                        {g}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <Link to={`/booking/${movie.id}`}>
                      <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                        Đặt vé ngay
                      </Button>
                    </Link>
                    <Link to={`/movie/${movie.id}`}>
                      <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <Play className="h-5 w-5 mr-2" />
                        Xem trailer
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>
      
      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 transition-all ${
              index === currentIndex ? "w-8 bg-red-600" : "w-4 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
