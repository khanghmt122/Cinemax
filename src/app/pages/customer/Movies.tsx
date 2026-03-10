import { useState } from "react";
import { Header } from "../../components/customer/Header";
import { MovieCard } from "../../components/customer/MovieCard";
import { movies } from "../../data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Input } from "../../components/ui/input";
import { Search } from "lucide-react";

export function Movies() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const nowShowing = movies.filter(m => m.status === "now-showing");
  const comingSoon = movies.filter(m => m.status === "coming-soon");
  
  const filterMovies = (movieList: typeof movies) => {
    return movieList.filter(movie =>
      movie.titleVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };
  
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white">Danh sách phim</h1>
            <p className="text-white/50">Khám phá các bộ phim mới nhất và sắp ra mắt</p>
            
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
              <Input
                placeholder="Tìm kiếm phim..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12"
              />
            </div>
          </div>
          
          {/* Tabs */}
          <Tabs defaultValue="now-showing" className="w-full">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="now-showing" className="data-[state=active]:bg-red-600">
                Đang chiếu ({nowShowing.length})
              </TabsTrigger>
              <TabsTrigger value="coming-soon" className="data-[state=active]:bg-red-600">
                Sắp chiếu ({comingSoon.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="now-showing" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filterMovies(nowShowing).map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
              
              {filterMovies(nowShowing).length === 0 && (
                <div className="text-center py-12 text-white/50">
                  Không tìm thấy phim nào
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="coming-soon" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filterMovies(comingSoon).map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
              
              {filterMovies(comingSoon).length === 0 && (
                <div className="text-center py-12 text-white/50">
                  Không tìm thấy phim nào
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
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
