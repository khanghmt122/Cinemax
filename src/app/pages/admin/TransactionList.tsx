import { useState } from "react";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { transactions } from "../../data/mockData";
import { Search, Download, Filter } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export function TransactionList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = 
      tx.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.movieTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="border-green-500/50 text-green-500">Thành công</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-yellow-500/50 text-yellow-500">Đang xử lý</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="border-red-500/50 text-red-500">Đã hủy</Badge>;
      default:
        return null;
    }
  };
  
  const totalRevenue = filteredTransactions
    .filter(tx => tx.status === "completed")
    .reduce((sum, tx) => sum + tx.totalAmount, 0);
  
  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Lịch sử giao dịch</h1>
              <p className="text-white/50">Quản lý và theo dõi các giao dịch đặt vé</p>
            </div>
            
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Download className="h-4 w-4 mr-2" />
              Xuất báo cáo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-lg bg-white/5 border border-white/10 p-4">
              <p className="text-sm text-white/50">Tổng giao dịch</p>
              <p className="text-2xl font-bold text-white mt-1">
                {filteredTransactions.length}
              </p>
            </div>
            <div className="rounded-lg bg-white/5 border border-white/10 p-4">
              <p className="text-sm text-white/50">Thành công</p>
              <p className="text-2xl font-bold text-green-500 mt-1">
                {filteredTransactions.filter(tx => tx.status === "completed").length}
              </p>
            </div>
            <div className="rounded-lg bg-white/5 border border-white/10 p-4">
              <p className="text-sm text-white/50">Đang xử lý</p>
              <p className="text-2xl font-bold text-yellow-500 mt-1">
                {filteredTransactions.filter(tx => tx.status === "pending").length}
              </p>
            </div>
            <div className="rounded-lg bg-white/5 border border-white/10 p-4">
              <p className="text-sm text-white/50">Tổng doanh thu</p>
              <p className="text-2xl font-bold text-white mt-1">
                {totalRevenue.toLocaleString("vi-VN")}đ
              </p>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                placeholder="Tìm kiếm theo mã GD, tên KH, phim..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-white/5 border-white/10 text-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/10">
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="completed">Thành công</SelectItem>
                <SelectItem value="pending">Đang xử lý</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Transactions Table */}
          <div className="rounded-lg bg-white/5 border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left py-4 px-4 text-white/70 font-medium">Mã GD</th>
                    <th className="text-left py-4 px-4 text-white/70 font-medium">Khách hàng</th>
                    <th className="text-left py-4 px-4 text-white/70 font-medium">Phim</th>
                    <th className="text-left py-4 px-4 text-white/70 font-medium">Rạp</th>
                    <th className="text-left py-4 px-4 text-white/70 font-medium">Suất chiếu</th>
                    <th className="text-left py-4 px-4 text-white/70 font-medium">Ghế</th>
                    <th className="text-left py-4 px-4 text-white/70 font-medium">Số tiền</th>
                    <th className="text-left py-4 px-4 text-white/70 font-medium">PTTT</th>
                    <th className="text-left py-4 px-4 text-white/70 font-medium">Trạng thái</th>
                    <th className="text-left py-4 px-4 text-white/70 font-medium">Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-t border-white/10 hover:bg-white/5">
                      <td className="py-4 px-4">
                        <span className="text-white font-mono text-sm">{transaction.id}</span>
                      </td>
                      <td className="py-4 px-4 text-white">{transaction.userName}</td>
                      <td className="py-4 px-4 text-white/70">{transaction.movieTitle}</td>
                      <td className="py-4 px-4 text-white/70">{transaction.theaterName}</td>
                      <td className="py-4 px-4 text-white/70">{transaction.showtime}</td>
                      <td className="py-4 px-4">
                        <span className="text-white/70 text-sm">
                          {transaction.seats.join(", ")}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-white font-semibold">
                          {transaction.totalAmount.toLocaleString("vi-VN")}đ
                        </span>
                      </td>
                      <td className="py-4 px-4 text-white/70">{transaction.paymentMethod}</td>
                      <td className="py-4 px-4">{getStatusBadge(transaction.status)}</td>
                      <td className="py-4 px-4 text-white/70 text-sm">
                        {new Date(transaction.createdAt).toLocaleString("vi-VN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredTransactions.length === 0 && (
                <div className="text-center py-12 text-white/50">
                  Không tìm thấy giao dịch nào
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
