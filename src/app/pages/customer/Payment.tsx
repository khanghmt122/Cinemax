import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Header } from "../../components/customer/Header";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { ArrowLeft, CreditCard, Wallet, Building2, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../components/ui/dialog";

export function Payment() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Get booking data from sessionStorage
  const bookingDataStr = sessionStorage.getItem("bookingData");
  const bookingData = bookingDataStr ? JSON.parse(bookingDataStr) : null;
  
  if (!bookingData) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-white text-xl">Không có thông tin đặt vé</p>
          <Link to="/">
            <Button className="mt-4 bg-red-600 hover:bg-red-700">
              Về trang chủ
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Clear booking data
      setTimeout(() => {
        sessionStorage.removeItem("bookingData");
        navigate("/");
      }, 3000);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link to={`/seat-selection/${bookingData.showtime.id}`}>
          <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
        </Link>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl font-bold text-white">Thanh toán</h1>
            
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Payment Method Selection */}
              <div className="rounded-lg bg-white/5 border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Chọn phương thức thanh toán
                </h3>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <CreditCard className="h-5 w-5 text-white/70" />
                      <span className="text-white flex-1">Thẻ tín dụng/Ghi nợ</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                      <RadioGroupItem value="momo" id="momo" />
                      <Wallet className="h-5 w-5 text-white/70" />
                      <span className="text-white flex-1">Ví điện tử (Momo/ZaloPay)</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                      <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                      <Building2 className="h-5 w-5 text-white/70" />
                      <span className="text-white flex-1">Chuyển khoản ngân hàng</span>
                    </label>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Payment Details */}
              <div className="rounded-lg bg-white/5 border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Thông tin thanh toán
                </h3>
                
                {paymentMethod === "credit-card" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="card-number" className="text-white">Số thẻ</Label>
                      <Input
                        id="card-number"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry" className="text-white">Ngày hết hạn</Label>
                        <Input
                          id="expiry"
                          type="text"
                          placeholder="MM/YY"
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-white">CVV</Label>
                        <Input
                          id="cvv"
                          type="text"
                          placeholder="123"
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="card-name" className="text-white">Tên trên thẻ</Label>
                      <Input
                        id="card-name"
                        type="text"
                        placeholder="NGUYEN VAN A"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                        required
                      />
                    </div>
                  </div>
                )}
                
                {paymentMethod === "momo" && (
                  <div className="space-y-4">
                    <p className="text-white/70 text-sm">
                      Vui lòng quét mã QR hoặc nhập số điện thoại để thanh toán qua ví điện tử.
                    </p>
                    <div className="bg-white p-4 rounded-lg w-48 h-48 mx-auto flex items-center justify-center">
                      <p className="text-black text-sm text-center">QR Code<br/>Demo</p>
                    </div>
                  </div>
                )}
                
                {paymentMethod === "bank-transfer" && (
                  <div className="space-y-4">
                    <p className="text-white/70 text-sm">
                      Thông tin chuyển khoản:
                    </p>
                    <div className="bg-white/5 p-4 rounded-lg space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/50">Ngân hàng:</span>
                        <span className="text-white">Vietcombank</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Số tài khoản:</span>
                        <span className="text-white">1234567890</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Chủ tài khoản:</span>
                        <span className="text-white">CINEMAMAX</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Nội dung:</span>
                        <span className="text-white">BOOKING_{new Date().getTime()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <Button
                type="submit"
                size="lg"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={isProcessing}
              >
                {isProcessing ? "Đang xử lý..." : `Thanh toán ${bookingData.total.toLocaleString("vi-VN")}đ`}
              </Button>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg bg-white/5 border border-white/10 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-white">Chi tiết đơn hàng</h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-white/50">Phim</p>
                  <p className="text-white font-semibold">{bookingData.movie.titleVi}</p>
                </div>
                
                <div>
                  <p className="text-white/50">Rạp</p>
                  <p className="text-white">{bookingData.theater.name}</p>
                </div>
                
                <div>
                  <p className="text-white/50">Phòng</p>
                  <p className="text-white">{bookingData.room.name}</p>
                </div>
                
                <div>
                  <p className="text-white/50">Suất chiếu</p>
                  <p className="text-white">
                    {bookingData.showtime.time} - {new Date(bookingData.showtime.date).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                
                <div>
                  <p className="text-white/50">Ghế</p>
                  <p className="text-white font-semibold">{bookingData.selectedSeats.join(", ")}</p>
                </div>
                
                <div>
                  <p className="text-white/50">Số lượng</p>
                  <p className="text-white">{bookingData.selectedSeats.length} ghế</p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-lg">Tổng cộng</span>
                  <span className="text-2xl font-bold text-red-600">
                    {bookingData.total.toLocaleString("vi-VN")}đ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-black border-white/10">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <DialogTitle className="text-2xl text-center text-white">
              Đặt vé thành công!
            </DialogTitle>
            <DialogDescription className="text-center text-white/70 space-y-2">
              <p>Cảm ơn bạn đã sử dụng dịch vụ của CinemaMax.</p>
              <p>Vé điện tử đã được gửi về email của bạn.</p>
              <p className="text-sm">Bạn sẽ được chuyển về trang chủ...</p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
