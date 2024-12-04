"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface TimerProps {
  onTimeUpdate: (time: number) => void;
}

export function Timer({ onTimeUpdate }: TimerProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        const newTime = prev + 1;
        onTimeUpdate(newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimeUpdate]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center gap-2 text-lg font-semibold">
      <Clock className="w-5 h-5" />
      {formatTime(time)}
    </div>
  );
}
