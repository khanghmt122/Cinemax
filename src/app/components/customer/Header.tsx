import { Link, useLocation } from "react-router";
import { Film, User, Menu, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../ui/sheet";

export function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Film className="h-8 w-8 text-red-600" />
          <span className="text-xl font-bold text-white">CinemaMax</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm transition-colors ${
              isActive("/") ? "text-red-600 font-semibold" : "text-white/70 hover:text-white"
            }`}
          >
            Trang chủ
          </Link>
          <Link
            to="/movies"
            className={`text-sm transition-colors ${
              isActive("/movies") ? "text-red-600 font-semibold" : "text-white/70 hover:text-white"
            }`}
          >
            Phim
          </Link>
          <Link
            to="/theaters"
            className={`text-sm transition-colors ${
              isActive("/theaters") ? "text-red-600 font-semibold" : "text-white/70 hover:text-white"
            }`}
          >
            Rạp chiếu
          </Link>
        </nav>
        
        {/* Search & User Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5">
            <Search className="h-4 w-4 text-white/50" />
            <Input
              type="text"
              placeholder="Tìm phim..."
              className="w-48 border-0 bg-transparent text-sm text-white placeholder:text-white/50 focus-visible:ring-0"
            />
          </div>
          
          <Link to="/login">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-black border-white/10">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  to="/"
                  className={`text-base transition-colors ${
                    isActive("/") ? "text-red-600 font-semibold" : "text-white/70"
                  }`}
                >
                  Trang chủ
                </Link>
                <Link
                  to="/movies"
                  className={`text-base transition-colors ${
                    isActive("/movies") ? "text-red-600 font-semibold" : "text-white/70"
                  }`}
                >
                  Phim
                </Link>
                <Link
                  to="/theaters"
                  className={`text-base transition-colors ${
                    isActive("/theaters") ? "text-red-600 font-semibold" : "text-white/70"
                  }`}
                >
                  Rạp chiếu
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
