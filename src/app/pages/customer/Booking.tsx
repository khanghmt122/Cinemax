import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { Header } from "../../components/customer/Header";
import { Button } from "../../components/ui/button";
import { movies, theaters, showtimes, rooms } from "../../data/mockData";
import { ArrowLeft, MapPin, Calendar, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

export function Booking() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === movieId);
  
  const [selectedTheater, setSelectedTheater] = useState<string | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);
  
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
  
  const movieShowtimes = showtimes.filter(s => s.movieId === movieId);
  const availableTheaters = theaters.filter(t => 
    movieShowtimes.some(s => s.theaterId === t.id)
  );
  
  const selectedTheaterShowtimes = selectedTheater
    ? movieShowtimes.filter(s => s.theaterId === selectedTheater)
    : [];
  
  const handleContinue = () => {
    if (selectedShowtime) {
      navigate(`/seat-selection/${selectedShowtime}`);
    }
  };
  
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link to={`/movie/${movieId}`}>
          <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
        </Link>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Movie Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg bg-white/5 border border-white/10 overflow-hidden">
              <img
                src={movie.poster}
                alt={movie.titleVi}
                className="w-full aspect-[2/3] object-cover"
              />
              <div className="p-4 space-y-3">
                <h2 className="text-xl font-bold text-white">{movie.titleVi}</h2>
                <div className="space-y-2 text-sm text-white/70">
                  <p>{movie.genre.join(", ")}</p>
                  <p>{movie.duration} phút • {movie.ageRating}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Booking Selection */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl font-bold text-white">Đặt vé xem phim</h1>
            
            {/* Date Selection */}
            <div className="rounded-lg bg-white/5 border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-red-600" />
                Chọn ngày
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {Array.from({ length: 7 }, (_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() + i);
                  const dateStr = date.toISOString().split("T")[0];
                  
                  return (
                    <button
                      key={i}
                      className="flex-shrink-0 px-6 py-3 rounded-lg bg-white/10 hover:bg-red-600 transition-colors text-white text-center"
                    >
                      <div className="font-semibold">{date.getDate()}</div>
                      <div className="text-xs text-white/70">
                        Th{date.getMonth() + 1}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Theater Selection */}
            <div className="rounded-lg bg-white/5 border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-red-600" />
                Chọn rạp
              </h3>
              <div className="space-y-3">
                {availableTheaters.map((theater) => (
                  <button
                    key={theater.id}
                    onClick={() => {
                      setSelectedTheater(theater.id);
                      setSelectedShowtime(null);
                    }}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      selectedTheater === theater.id
                        ? "bg-red-600 text-white"
                        : "bg-white/5 hover:bg-white/10 text-white/80"
                    }`}
                  >
                    <p className="font-semibold">{theater.name}</p>
                    <p className="text-sm text-white/60">{theater.address}</p>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Showtime Selection */}
            {selectedTheater && (
              <div className="rounded-lg bg-white/5 border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-red-600" />
                  Chọn suất chiếu
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {selectedTheaterShowtimes.map((showtime) => (
                    <button
                      key={showtime.id}
                      onClick={() => setSelectedShowtime(showtime.id)}
                      className={`p-3 rounded-lg transition-colors ${
                        selectedShowtime === showtime.id
                          ? "bg-red-600 text-white"
                          : "bg-white/5 hover:bg-white/10 text-white/80"
                      }`}
                    >
                      <div className="font-semibold">{showtime.time}</div>
                      <div className="text-xs text-white/60">
                        {showtime.price.toLocaleString("vi-VN")}đ
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Continue Button */}
            <Button
              size="lg"
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              disabled={!selectedShowtime}
              onClick={handleContinue}
            >
              Tiếp tục chọn ghế
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
