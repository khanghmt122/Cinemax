import { useParams, Link } from "react-router";
import { Header } from "../../components/customer/Header";
import { Button } from "../../components/ui/button";
import { movies } from "../../data/mockData";
import { Star, Clock, Calendar, Play, ArrowLeft } from "lucide-react";
import { Badge } from "../../components/ui/badge";

export function MovieDetail() {
  const { id } = useParams();
  const movie = movies.find(m => m.id === id);
  
  if (!movie) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-white text-xl">Không tìm thấy phim</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.poster})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60" />
        </div>
        
        <div className="relative container mx-auto h-full flex items-center px-4">
          <div className="max-w-3xl space-y-6">
            <Link to="/">
              <Button variant="ghost" className="text-white hover:bg-white/10 mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại
              </Button>
            </Link>
            
            <div className="flex items-center gap-3">
              <Badge variant="destructive">
                {movie.status === "now-showing" ? "Đang Chiếu" : "Sắp Chiếu"}
              </Badge>
              <Badge variant="outline" className="border-white/20 text-white">
                {movie.ageRating}
              </Badge>
            </div>
            
            <h1 className="text-5xl font-bold text-white">{movie.titleVi}</h1>
            <p className="text-xl text-white/60">{movie.title}</p>
            
            <div className="flex items-center gap-6 text-white/70">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                <span className="font-semibold">{movie.rating}/10</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{movie.duration} phút</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(movie.releaseDate).toLocaleDateString("vi-VN")}</span>
              </div>
            </div>
            
            <div className="flex gap-4">
              {movie.status === "now-showing" && (
                <Link to={`/booking/${movie.id}`}>
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                    Đặt vé ngay
                  </Button>
                </Link>
              )}
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Play className="h-5 w-5 mr-2" />
                Xem trailer
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Movie Info */}
      <div className="container mx-auto px-4 py-16 space-y-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Nội dung phim</h2>
              <p className="text-white/70 leading-relaxed">{movie.descriptionVi}</p>
              <p className="text-white/50 italic">{movie.description}</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Thể loại</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genre.map((g) => (
                  <span key={g} className="px-4 py-2 rounded-lg bg-white/5 text-white/80">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Side Info */}
          <div className="space-y-6">
            <div className="rounded-lg bg-white/5 border border-white/10 p-6 space-y-4">
              <h3 className="text-xl font-semibold text-white">Thông tin</h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-white/50">Đạo diễn</p>
                  <p className="text-white">{movie.director}</p>
                </div>
                
                <div>
                  <p className="text-white/50">Diễn viên</p>
                  <p className="text-white">{movie.cast.join(", ")}</p>
                </div>
                
                <div>
                  <p className="text-white/50">Thời lượng</p>
                  <p className="text-white">{movie.duration} phút</p>
                </div>
                
                <div>
                  <p className="text-white/50">Khởi chiếu</p>
                  <p className="text-white">
                    {new Date(movie.releaseDate).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                
                <div>
                  <p className="text-white/50">Độ tuổi</p>
                  <p className="text-white">{movie.ageRating}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
