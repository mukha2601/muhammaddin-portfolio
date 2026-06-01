import type { Weather } from "@/components/WeatherEffect";

export const WEATHER_CYCLE: Weather[] = ["off", "rain", "autumn", "winter"];

export function getMusicEnabled(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem("music") !== "off";
}

export function setMusicEnabled(on: boolean): void {
  localStorage.setItem("music", on ? "on" : "off");
  window.dispatchEvent(new CustomEvent("music-toggle", { detail: on }));
}

export function toggleMusic(): void {
  setMusicEnabled(!getMusicEnabled());
}

export function getWeather(): Weather {
  if (typeof window === "undefined") return "off";
  return (localStorage.getItem("weather") as Weather) || "off";
}

export function setWeather(value: Weather): void {
  localStorage.setItem("weather", value);
  window.dispatchEvent(new CustomEvent("weather-change", { detail: value }));
}

export function cycleWeather(): void {
  const current = getWeather();
  const index = WEATHER_CYCLE.indexOf(current);
  const next = WEATHER_CYCLE[(index + 1) % WEATHER_CYCLE.length];
  setWeather(next);
}
