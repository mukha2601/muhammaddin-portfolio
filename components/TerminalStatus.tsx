"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "./LangProvider";
import { Track } from "@/lib/i18n";
import { Weather } from "./WeatherEffect";
import { getMusicEnabled, getWeather } from "@/lib/preferences";

function resolveTrackTitle(tracks: Track[], src?: string, id?: string | null) {
  if (src) {
    const bySrc = tracks.find((t) => t.src === src);
    if (bySrc) return bySrc.title;
  }
  if (id) {
    const byId = tracks.find((t) => t.id === id);
    if (byId) return byId.title;
  }
  return tracks[0]?.title ?? "";
}

export default function TerminalStatus() {
  const { t } = useT();
  const [musicOn, setMusicOn] = useState(false);
  const [trackTitle, setTrackTitle] = useState("");
  const [weather, setWeatherState] = useState<Weather>("off");
  const tracksRef = useRef<Track[]>([]);

  useEffect(() => {
    setMusicOn(getMusicEnabled());
    setWeatherState(getWeather());

    fetch("/api/tracks")
      .then((r) => r.json())
      .then((data: { tracks: Track[] }) => {
        const list = data.tracks || [];
        tracksRef.current = list;
        const savedId = localStorage.getItem("musicTrack");
        setTrackTitle(resolveTrackTitle(list, undefined, savedId));
      })
      .catch(() => {});

    function onMusicToggle(e: Event) {
      setMusicOn((e as CustomEvent<boolean>).detail);
    }

    function onTrackChange(e: Event) {
      const src = (e as CustomEvent<string>).detail;
      const title = resolveTrackTitle(tracksRef.current, src);
      if (title) setTrackTitle(title);
    }

    function onTrackInfo(e: Event) {
      const { title } = (e as CustomEvent<{ title: string }>).detail;
      if (title) setTrackTitle(title);
    }

    function onWeatherChange(e: Event) {
      setWeatherState((e as CustomEvent<Weather>).detail);
    }

    window.addEventListener("music-toggle", onMusicToggle as EventListener);
    window.addEventListener("music-track", onTrackChange as EventListener);
    window.addEventListener("music-track-info", onTrackInfo as EventListener);
    window.addEventListener("weather-change", onWeatherChange as EventListener);

    return () => {
      window.removeEventListener("music-toggle", onMusicToggle as EventListener);
      window.removeEventListener("music-track", onTrackChange as EventListener);
      window.removeEventListener("music-track-info", onTrackInfo as EventListener);
      window.removeEventListener("weather-change", onWeatherChange as EventListener);
    };
  }, []);

  const musicStatus = musicOn
    ? trackTitle
      ? `♪ ${trackTitle}`
      : t.status.musicOn
    : t.status.musicOff;

  return (
    <>
      <div className="term-rule term-rule-double" role="separator" />
      <div className="term-status" aria-live="polite">
        <span className="term-status-item">
          {t.status.musicKey}: {musicStatus}
        </span>
        <span className="term-status-item">
          {t.status.weatherKey}: {t.weather[weather]}
        </span>
      </div>
    </>
  );
}
