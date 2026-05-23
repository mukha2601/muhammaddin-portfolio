"use client";

import { useEffect, useMemo, useState } from "react";

export type Weather = "off" | "rain" | "autumn" | "winter";

type Particle = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  hue: number;
};

export default function WeatherEffect() {
  const [weather, setWeather] = useState<Weather>("off");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem("weather") as Weather) || "off";
    setWeather(saved);
    setHydrated(true);

    const handler = (e: Event) => {
      const next = (e as CustomEvent<Weather>).detail;
      setWeather(next);
    };
    window.addEventListener("weather-change", handler as EventListener);
    return () =>
      window.removeEventListener("weather-change", handler as EventListener);
  }, []);

  const particles = useMemo<Particle[]>(() => {
    if (weather === "off") return [];
    const count =
      weather === "rain" ? 90 : weather === "winter" ? 70 : 40;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 6,
      duration:
        weather === "rain"
          ? 0.7 + Math.random() * 0.8
          : weather === "winter"
            ? 6 + Math.random() * 6
            : 5 + Math.random() * 5,
      size:
        weather === "rain"
          ? 0
          : weather === "winter"
            ? 4 + Math.floor(Math.random() * 4)
            : 6 + Math.floor(Math.random() * 6),
      hue: Math.floor(Math.random() * 3),
    }));
  }, [weather]);

  if (!hydrated || weather === "off") return null;

  return (
    <div
      className={`weather-layer weather-${weather}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className={`particle particle-${weather} hue-${p.hue}`}
          style={{
            left: `${p.left}%`,
            width: p.size ? `${p.size}px` : undefined,
            height: p.size ? `${p.size}px` : undefined,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
