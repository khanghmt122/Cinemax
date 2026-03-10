import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { Header } from "../../components/customer/Header";
import { SeatMap } from "../../components/customer/SeatMap";
import { Button } from "../../components/ui/button";
import { movies, theaters, showtimes, rooms, generateSeatMap } from "../../data/mockData";
import { ArrowLeft, Ticket } from "lucide-react";

export function SeatSelection() {
  const { showtimeId } = useParams();
  const navigate = useNavigate();
  
  const showtime = showtimes.find(s => s.id === showtimeId);
  const movie = showtime ? movies.find(m => m.id === showtime.movieId) : null;
  const theater = showtime ? theaters.find(t => t.id === showtime.theaterId) : null;
  const room = showtime ? rooms.find(r => r.id === showtime.roomId) : null;
  
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  if (!showtime || !movie || !theater || !room) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-white text-xl">Không tìm thấy thông tin</p>
        </div>
      </div>
    );
  }
  
  // Generate occupied seats for demo (random)
  const occupiedSeats = ["C5", "C6", "D7", "E4", "E5", "F8", "F9", "G10"];
  const seatMap = generateSeatMap(room, occupiedSeats);
  
  const handleSeatSelect = (seatId: string) => {
    setSelectedSeats(prev => 
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };
  
  const calculateTotal = () => {
    let total = 0;
    selectedSeats.forEach(seatId => {
      const row = seatId[0];
      const seatInMap = seatMap.find(r => r[0].row === row)?.find(s => `${s.row}${s.number}` === seatId);
      if (seatInMap) {
        total += seatInMap.price;
      }
    });
    return total;
  };
  
  const handleContinue = () => {
    if (selectedSeats.length > 0) {
      // Store booking data in sessionStorage
      const bookingData = {
        showtime,
        movie,
        theater,
        room,
        selectedSeats,
        total: calculateTotal(),
      };
      sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
      navigate("/payment");
    }
  };
  
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link to={`/booking/${movie.id}`}>
          <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
        </Link>
        
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Seat Map */}
          <div className="lg:col-span-3">
            <div className="rounded-lg bg-white/5 border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Chọn ghế ngồi
              </h2>
              <SeatMap
                seats={seatMap}
                selectedSeats={selectedSeats}
                onSeatSelect={handleSeatSelect}
              />
            </div>
          </div>
          
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg bg-white/5 border border-white/10 p-6 space-y-6">
              <div className="flex items-center gap-2 text-red-600">
                <Ticket className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Thông tin đặt vé</h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-white/50">Phim</p>
                  <p className="text-white font-semibold">{movie.titleVi}</p>
                </div>
                
                <div>
                  <p className="text-white/50">Rạp</p>
                  <p className="text-white">{theater.name}</p>
                </div>
                
                <div>
                  <p className="text-white/50">Phòng</p>
                  <p className="text-white">{room.name}</p>
                </div>
                
                <div>
                  <p className="text-white/50">Suất chiếu</p>
                  <p className="text-white">
                    {showtime.time} - {new Date(showtime.date).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                
                <div className="pt-3 border-t border-white/10">
                  <p className="text-white/50">Ghế đã chọn</p>
                  <p className="text-white font-semibold">
                    {selectedSeats.length > 0 ? selectedSeats.join(", ") : "Chưa chọn ghế"}
                  </p>
                </div>
                
                <div>
                  <p className="text-white/50">Số lượng</p>
                  <p className="text-white font-semibold">{selectedSeats.length} ghế</p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white/70">Tổng tiền</span>
                  <span className="text-2xl font-bold text-red-600">
                    {calculateTotal().toLocaleString("vi-VN")}đ
                  </span>
                </div>
                
                <Button
                  size="lg"
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  disabled={selectedSeats.length === 0}
                  onClick={handleContinue}
                >
                  Tiếp tục thanh toán
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
