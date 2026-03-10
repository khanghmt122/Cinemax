import { Header } from "../../components/customer/Header";
import { theaters } from "../../data/mockData";
import { MapPin, Phone, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export function Theaters() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white">Hệ thống rạp</h1>
            <p className="text-white/50">Tìm rạp chiếu phim gần bạn nhất</p>
          </div>
          
          {/* Theaters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {theaters.map((theater) => (
              <Card key={theater.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                <CardHeader>
                  <CardTitle className="text-white flex items-start gap-3">
                    <MapPin className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xl">{theater.name}</p>
                      <p className="text-sm text-white/50 font-normal mt-1">
                        {theater.location}
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm text-white/70">
                    <p>{theater.address}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10 text-sm">
                    <div className="flex items-center gap-2 text-white/50">
                      <Clock className="h-4 w-4" />
                      <span>8:00 - 23:00</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/50">
                      <Phone className="h-4 w-4" />
                      <span>1900-xxxx</span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <a
                      href="#"
                      className="text-sm text-red-600 hover:text-red-500 font-semibold"
                    >
                      Xem lịch chiếu →
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
