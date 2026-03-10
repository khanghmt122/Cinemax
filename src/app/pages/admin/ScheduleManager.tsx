import { useState } from "react";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { showtimes, movies, theaters, rooms } from "../../data/mockData";
import { Plus, Calendar, Clock, Film, MapPin, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export function ScheduleManager() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  
  const filteredShowtimes = showtimes.filter(s => s.date === selectedDate);
  
  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Quản lý lịch chiếu</h1>
              <p className="text-white/50">Sắp xếp và quản lý suất chiếu phim</p>
            </div>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm suất chiếu
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black border-white/10">
                <DialogHeader>
                  <DialogTitle className="text-white">Thêm suất chiếu mới</DialogTitle>
                  <DialogDescription className="text-white/50">
                    Tạo lịch chiếu cho phim
                  </DialogDescription>
                </DialogHeader>
                
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="movie" className="text-white">Chọn phim</Label>
                    <Select>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Chọn phim" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-white/10">
                        {movies.map((movie) => (
                          <SelectItem key={movie.id} value={movie.id}>
                            {movie.titleVi}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="theater" className="text-white">Chọn rạp</Label>
                    <Select>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Chọn rạp" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-white/10">
                        {theaters.map((theater) => (
                          <SelectItem key={theater.id} value={theater.id}>
                            {theater.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="room" className="text-white">Chọn phòng</Label>
                    <Select>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Chọn phòng" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-white/10">
                        {rooms.map((room) => (
                          <SelectItem key={room.id} value={room.id}>
                            {room.name} ({room.totalSeats} ghế)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-white">Ngày chiếu</Label>
                      <Input
                        id="date"
                        type="date"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-white">Giờ chiếu</Label>
                      <Input
                        id="time"
                        type="time"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-white">Giá vé (VNĐ)</Label>
                    <Input
                      id="price"
                      type="number"
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="80000"
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700">
                      Thêm suất chiếu
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-white/10 text-white hover:bg-white/5"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Hủy
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Date Filter */}
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-red-600" />
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="max-w-xs bg-white/5 border-white/10 text-white"
            />
          </div>
          
          {/* Showtimes Table */}
          <div className="rounded-lg bg-white/5 border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left py-4 px-4 text-white/70 font-medium">Thời gian</th>
                    <th className="text-left py-4 px-4 text-white/70 font-medium">Phim</th>
                    <th className="text-left py-4 px-4 text-white/70 font-medium">Rạp</th>
                    <th className="text-left py-4 px-4 text-white/70 font-medium">Phòng</th>
                    <th className="text-left py-4 px-4 text-white/70 font-medium">Giá vé</th>
                    <th className="text-left py-4 px-4 text-white/70 font-medium">Trạng thái</th>
                    <th className="text-right py-4 px-4 text-white/70 font-medium">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShowtimes.map((showtime) => {
                    const movie = movies.find(m => m.id === showtime.movieId);
                    const theater = theaters.find(t => t.id === showtime.theaterId);
                    const room = rooms.find(r => r.id === showtime.roomId);
                    
                    return (
                      <tr key={showtime.id} className="border-t border-white/10 hover:bg-white/5">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2 text-white">
                            <Clock className="h-4 w-4 text-white/50" />
                            <span className="font-semibold">{showtime.time}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Film className="h-4 w-4 text-red-600" />
                            <span className="text-white">{movie?.titleVi}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-white/50" />
                            <span className="text-white/70">{theater?.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-white/70">{room?.name}</td>
                        <td className="py-4 px-4 text-white">
                          {showtime.price.toLocaleString("vi-VN")}đ
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="border-green-500/50 text-green-500">
                            Sẵn sàng
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-600/20">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              
              {filteredShowtimes.length === 0 && (
                <div className="text-center py-12 text-white/50">
                  Không có suất chiếu nào trong ngày này
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
