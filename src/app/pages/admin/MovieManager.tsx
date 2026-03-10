import { useState } from "react";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { movies } from "../../data/mockData";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export function MovieManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const filteredMovies = movies.filter(movie =>
    movie.titleVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Quản lý phim</h1>
              <p className="text-white/50">Quản lý danh sách phim và thông tin</p>
            </div>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm phim mới
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-white">Thêm phim mới</DialogTitle>
                  <DialogDescription className="text-white/50">
                    Điền thông tin chi tiết về phim
                  </DialogDescription>
                </DialogHeader>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title-vi" className="text-white">Tên phim (Tiếng Việt)</Label>
                      <Input
                        id="title-vi"
                        className="bg-white/5 border-white/10 text-white"
                        placeholder="Chiến Binh Bóng Tối"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title-en" className="text-white">Tên phim (English)</Label>
                      <Input
                        id="title-en"
                        className="bg-white/5 border-white/10 text-white"
                        placeholder="Shadow Warriors"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description-vi" className="text-white">Mô tả (Tiếng Việt)</Label>
                    <Textarea
                      id="description-vi"
                      className="bg-white/5 border-white/10 text-white"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description-en" className="text-white">Mô tả (English)</Label>
                    <Textarea
                      id="description-en"
                      className="bg-white/5 border-white/10 text-white"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration" className="text-white">Thời lượng (phút)</Label>
                      <Input
                        id="duration"
                        type="number"
                        className="bg-white/5 border-white/10 text-white"
                        placeholder="120"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="release-date" className="text-white">Ngày khởi chiếu</Label>
                      <Input
                        id="release-date"
                        type="date"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age-rating" className="text-white">Độ tuổi</Label>
                      <Select>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Chọn" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-white/10">
                          <SelectItem value="P">P - Phổ biến</SelectItem>
                          <SelectItem value="T13">T13 - 13+</SelectItem>
                          <SelectItem value="T16">T16 - 16+</SelectItem>
                          <SelectItem value="T18">T18 - 18+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="director" className="text-white">Đạo diễn</Label>
                    <Input
                      id="director"
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="John Miller"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cast" className="text-white">Diễn viên</Label>
                    <Input
                      id="cast"
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="Chris Evans, Scarlett Johansson"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="poster" className="text-white">URL Poster</Label>
                    <Input
                      id="poster"
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="https://..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-white">Trạng thái</Label>
                    <Select>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-white/10">
                        <SelectItem value="now-showing">Đang chiếu</SelectItem>
                        <SelectItem value="coming-soon">Sắp chiếu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700">
                      Thêm phim
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
          
          {/* Search */}
          <div className="flex items-center gap-3 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                placeholder="Tìm kiếm phim..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
            </div>
          </div>
          
          {/* Movies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="rounded-lg bg-white/5 border border-white/10 overflow-hidden group"
              >
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={movie.poster}
                    alt={movie.titleVi}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-600/20">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-white line-clamp-1">
                      {movie.titleVi}
                    </h3>
                    <Badge
                      variant={movie.status === "now-showing" ? "destructive" : "secondary"}
                      className="flex-shrink-0"
                    >
                      {movie.status === "now-showing" ? "Đang chiếu" : "Sắp chiếu"}
                    </Badge>
                  </div>
                  
                  <div className="text-xs text-white/50 space-y-1">
                    <p>Thể loại: {movie.genre.join(", ")}</p>
                    <p>Thời lượng: {movie.duration} phút</p>
                    <p>Đánh giá: {movie.rating}/10</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
