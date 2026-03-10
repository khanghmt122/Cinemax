import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import type { Seat } from "../../data/mockData";

interface SeatMapProps {
  seats: Seat[][];
  selectedSeats: string[];
  onSeatSelect: (seatId: string) => void;
}

export function SeatMap({ seats, selectedSeats, onSeatSelect }: SeatMapProps) {
  const getSeatId = (seat: Seat) => `${seat.row}${seat.number}`;
  
  const getSeatColor = (seat: Seat) => {
    const seatId = getSeatId(seat);
    
    if (seat.status === "occupied") {
      return "bg-gray-600 cursor-not-allowed";
    }
    
    if (selectedSeats.includes(seatId)) {
      return "bg-green-600 hover:bg-green-700 cursor-pointer";
    }
    
    if (seat.type === "vip") {
      return "bg-yellow-600/50 hover:bg-yellow-600 cursor-pointer";
    }
    
    if (seat.type === "couple") {
      return "bg-pink-600/50 hover:bg-pink-600 cursor-pointer";
    }
    
    return "bg-blue-600/50 hover:bg-blue-600 cursor-pointer";
  };
  
  const handleSeatClick = (seat: Seat) => {
    if (seat.status === "occupied") return;
    onSeatSelect(getSeatId(seat));
  };
  
  return (
    <div className="space-y-6">
      {/* Screen */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-full max-w-3xl h-2 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
        <p className="text-sm text-white/50">MÀN HÌNH</p>
      </div>
      
      {/* Seat Map */}
      <div className="flex flex-col items-center gap-2 py-8">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center gap-2">
            {/* Row Label */}
            <span className="w-6 text-center text-sm font-semibold text-white/70">
              {row[0].row}
            </span>
            
            {/* Seats */}
            <div className="flex gap-2">
              {row.map((seat, seatIndex) => {
                const seatId = getSeatId(seat);
                const isSelected = selectedSeats.includes(seatId);
                
                return (
                  <motion.button
                    key={seatIndex}
                    whileHover={{ scale: seat.status !== "occupied" ? 1.1 : 1 }}
                    whileTap={{ scale: seat.status !== "occupied" ? 0.95 : 1 }}
                    onClick={() => handleSeatClick(seat)}
                    disabled={seat.status === "occupied"}
                    className={`
                      w-8 h-8 rounded-t-lg transition-colors
                      ${getSeatColor(seat)}
                      ${seat.type === "couple" ? "w-16" : ""}
                    `}
                    title={`${seatId} - ${seat.type === "vip" ? "VIP" : seat.type === "couple" ? "Ghế đôi" : "Thường"} - ${seat.price.toLocaleString("vi-VN")}đ`}
                  >
                    <span className="text-xs text-white font-semibold">
                      {isSelected ? "✓" : seat.number}
                    </span>
                  </motion.button>
                );
              })}
            </div>
            
            {/* Row Label (Right) */}
            <span className="w-6 text-center text-sm font-semibold text-white/70">
              {row[0].row}
            </span>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-lg bg-blue-600/50" />
          <span className="text-sm text-white/70">Ghế thường</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-lg bg-yellow-600/50" />
          <span className="text-sm text-white/70">Ghế VIP</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-lg bg-pink-600/50" />
          <span className="text-sm text-white/70">Ghế đôi</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-lg bg-green-600" />
          <span className="text-sm text-white/70">Đã chọn</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-lg bg-gray-600" />
          <span className="text-sm text-white/70">Đã bán</span>
        </div>
      </div>
    </div>
  );
}
