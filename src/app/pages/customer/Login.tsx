import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Film, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

export function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1000);
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <Film className="h-10 w-10 text-red-600" />
            <span className="text-2xl font-bold text-white">CinemaMax</span>
          </Link>
          <Link to="/">
            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Về trang chủ
            </Button>
          </Link>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/5">
            <TabsTrigger value="login" className="data-[state=active]:bg-red-600">
              Đăng nhập
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-red-600">
              Đăng ký
            </TabsTrigger>
          </TabsList>
          
          {/* Login Form */}
          <TabsContent value="login">
            <div className="rounded-lg bg-white/5 border border-white/10 p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-white">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-white">Mật khẩu</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    required
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    Ghi nhớ đăng nhập
                  </label>
                  <a href="#" className="text-sm text-red-600 hover:text-red-500">
                    Quên mật khẩu?
                  </a>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
              </form>
            </div>
          </TabsContent>
          
          {/* Register Form */}
          <TabsContent value="register">
            <div className="rounded-lg bg-white/5 border border-white/10 p-8">
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="register-name" className="text-white">Họ và tên</Label>
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-white">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-phone" className="text-white">Số điện thoại</Label>
                  <Input
                    id="register-phone"
                    type="tel"
                    placeholder="0912345678"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-white">Mật khẩu</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password" className="text-white">
                    Xác nhận mật khẩu
                  </Label>
                  <Input
                    id="register-confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    required
                  />
                </div>
                
                <label className="flex items-start gap-2 text-sm text-white/70 cursor-pointer">
                  <input type="checkbox" className="rounded mt-1" required />
                  <span>
                    Tôi đồng ý với{" "}
                    <a href="#" className="text-red-600 hover:text-red-500">
                      Điều khoản dịch vụ
                    </a>{" "}
                    và{" "}
                    <a href="#" className="text-red-600 hover:text-red-500">
                      Chính sách bảo mật
                    </a>
                  </span>
                </label>
                
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Đang đăng ký..." : "Đăng ký"}
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
