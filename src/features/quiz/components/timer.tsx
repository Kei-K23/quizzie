"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { Clock } from "lucide-react";

interface TimerProps {
  onTimeUpdate: (time: number) => void;
}

export function Timer({ onTimeUpdate }: TimerProps) {
  const [displayTime, setDisplayTime] = useState(0);
  const timeRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      timeRef.current += 1;
      setDisplayTime(timeRef.current);
      onTimeUpdate(timeRef.current);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [onTimeUpdate]);

  return (
    <div className="flex items-center gap-2 text-lg font-semibold">
      <Clock className="w-5 h-5" />
      {formatTime(displayTime)}
    </div>
  );
}
