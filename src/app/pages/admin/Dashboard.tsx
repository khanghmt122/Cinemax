import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { getStatistics } from "../../data/mockData";
import { Film, Ticket, DollarSign, MapPin, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

export function Dashboard() {
  const stats = getStatistics();
  
  const COLORS = ["#dc2626", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"];
  
  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-white">Tổng quan</h1>
            <p className="text-white/50">Thống kê tổng quan hệ thống rạp chiếu phim</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-white/70">
                  Doanh thu
                </CardTitle>
                <DollarSign className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {stats.totalRevenue.toLocaleString("vi-VN")}đ
                </div>
                <p className="text-xs text-white/50 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12.5% so với tháng trước
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-white/70">
                  Vé đã bán
                </CardTitle>
                <Ticket className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {stats.totalTickets}
                </div>
                <p className="text-xs text-white/50 mt-1">
                  Trong tuần này
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-white/70">
                  Phim đang chiếu
                </CardTitle>
                <Film className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {stats.totalMovies}
                </div>
                <p className="text-xs text-white/50 mt-1">
                  Tổng số phim
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-white/70">
                  Rạp chiếu
                </CardTitle>
                <MapPin className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {stats.totalTheaters}
                </div>
                <p className="text-xs text-white/50 mt-1">
                  Đang hoạt động
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Doanh thu 7 ngày qua</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.revenueByDay}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#ffffff70"
                      tick={{ fill: '#ffffff70' }}
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return `${date.getDate()}/${date.getMonth() + 1}`;
                      }}
                    />
                    <YAxis 
                      stroke="#ffffff70"
                      tick={{ fill: '#ffffff70' }}
                      tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a1a', 
                        border: '1px solid #ffffff20',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }}
                      formatter={(value: any) => `${value.toLocaleString('vi-VN')}đ`}
                    />
                    <Bar dataKey="revenue" fill="#dc2626" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            {/* Theater Tickets Chart */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Vé bán theo rạp</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={stats.ticketsByTheater}
                      dataKey="tickets"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={(entry) => `${entry.tickets}`}
                    >
                      {stats.ticketsByTheater.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a1a', 
                        border: '1px solid #ffffff20',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ color: '#ffffff' }}
                      iconType="circle"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          {/* Top Movies Table */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Top phim bán chạy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-white/70 font-medium">Phim</th>
                      <th className="text-left py-3 px-4 text-white/70 font-medium">Vé đã bán</th>
                      <th className="text-left py-3 px-4 text-white/70 font-medium">Doanh thu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.topMovies.map((movie, index) => (
                      <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                        <td className="py-3 px-4 text-white">{movie.title}</td>
                        <td className="py-3 px-4 text-white">{movie.tickets}</td>
                        <td className="py-3 px-4 text-white">
                          {movie.revenue.toLocaleString("vi-VN")}đ
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
