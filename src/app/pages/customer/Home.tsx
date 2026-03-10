import { Header } from "../../components/customer/Header";
import { HeroSlider } from "../../components/customer/HeroSlider";
import { MovieCard } from "../../components/customer/MovieCard";
import { movies } from "../../data/mockData";
import { Film, Sparkles } from "lucide-react";

export function Home() {
  const nowShowing = movies.filter(m => m.status === "now-showing");
  const comingSoon = movies.filter(m => m.status === "coming-soon");
  
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <HeroSlider />
      
      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Now Showing */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Film className="h-6 w-6 text-red-600" />
            <h2 className="text-3xl font-bold text-white">Phim Đang Chiếu</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {nowShowing.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
        
        {/* Coming Soon */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-yellow-500" />
            <h2 className="text-3xl font-bold text-white">Phim Sắp Chiếu</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {comingSoon.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-white/50 text-sm">
          <p>© 2026 CinemaMax. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
