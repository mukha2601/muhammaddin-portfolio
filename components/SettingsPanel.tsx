"use client";

import { useEffect, useState } from "react";
import DottedLine from "./DottedLine";
import { useT } from "./LangProvider";
import { Lang, Track } from "@/lib/i18n";
import { Weather } from "./WeatherEffect";
import { getMusicEnabled, getWeather, setMusicEnabled, setWeather } from "@/lib/preferences";

type Theme = "green" | "amber" | "white" | "dim";

const themeList: Theme[] = ["green", "amber", "white", "dim"];
const langList: Lang[] = ["uz", "en", "ru"];
const weatherList: Weather[] = ["off", "rain", "autumn", "winter"];

export default function SettingsPanel() {
  const { lang, setLang, t } = useT();
  const [music, setMusic] = useState(true);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [trackId, setTrackId] = useState<string>("");
  const [theme, setTheme] = useState<Theme>("green");
  const [weather, setWeatherState] = useState<Weather>("off");

  useEffect(() => {
    setMusic(getMusicEnabled());
    const savedTheme = (localStorage.getItem("theme") as Theme) || "green";
    setTheme(savedTheme);
    document.documentElement.dataset.theme = savedTheme;
    setWeatherState(getWeather());

    fetch("/api/tracks")
      .then((r) => r.json())
      .then((data: { tracks: Track[] }) => {
        const list = data.tracks || [];
        setTracks(list);
        const saved = localStorage.getItem("musicTrack");
        const current =
          (saved && list.find((tr) => tr.id === saved)?.id) || list[0]?.id || "";
        setTrackId(current);
      })
      .catch(() => {});

    function onMusicToggle(e: Event) {
      setMusic((e as CustomEvent<boolean>).detail);
    }

    function onWeatherChange(e: Event) {
      setWeatherState((e as CustomEvent<Weather>).detail);
    }

    window.addEventListener("music-toggle", onMusicToggle as EventListener);
    window.addEventListener("weather-change", onWeatherChange as EventListener);

    return () => {
      window.removeEventListener("music-toggle", onMusicToggle as EventListener);
      window.removeEventListener("weather-change", onWeatherChange as EventListener);
    };
  }, []);

  function setMusicState(next: boolean) {
    setMusic(next);
    setMusicEnabled(next);
  }

  function selectTrack(track: Track) {
    setTrackId(track.id);
    localStorage.setItem("musicTrack", track.id);
    window.dispatchEvent(new CustomEvent("music-track", { detail: track.src }));
    window.dispatchEvent(
      new CustomEvent("music-track-info", { detail: { title: track.title } }),
    );
    if (!music) setMusicState(true);
  }

  function applyTheme(value: Theme) {
    setTheme(value);
    localStorage.setItem("theme", value);
    document.documentElement.dataset.theme = value;
  }

  function applyLang(value: Lang) {
    setLang(value);
  }

  function applyWeather(value: Weather) {
    setWeatherState(value);
    setWeather(value);
  }

  return (
    <div className="contact-list">
      <DottedLine label={t.side.music}>
        <span className="contact-inline">
          <button
            type="button"
            className="contact-action"
            onClick={() => setMusicState(!music)}
          >
            {music ? t.status.musicOn : t.status.musicOff}
          </button>
          {tracks.length === 0 ? (
            <span className="contact-static">{t.settings.noTracks}</span>
          ) : (
            tracks.map((tr) => (
              <button
                key={tr.id}
                type="button"
                className={`contact-action ${trackId === tr.id ? "active" : ""}`}
                onClick={() => selectTrack(tr)}
              >
                {trackId === tr.id && music ? `▶ ${tr.title}` : tr.title}
              </button>
            ))
          )}
        </span>
      </DottedLine>

      <DottedLine label={t.side.style}>
        <span className="contact-inline">
          {themeList.map((th) => (
            <button
              key={th}
              type="button"
              className={`contact-action ${theme === th ? "active" : ""}`}
              onClick={() => applyTheme(th)}
            >
              {t.themes[th]}
            </button>
          ))}
        </span>
      </DottedLine>

      <DottedLine label={t.side.lang}>
        <span className="contact-inline">
          {langList.map((l) => (
            <button
              key={l}
              type="button"
              className={`contact-action ${lang === l ? "active" : ""}`}
              onClick={() => applyLang(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </span>
      </DottedLine>

      <DottedLine label={t.side.weather}>
        <span className="contact-inline">
          {weatherList.map((w) => (
            <button
              key={w}
              type="button"
              className={`contact-action ${weather === w ? "active" : ""}`}
              onClick={() => applyWeather(w)}
            >
              {t.weather[w]}
            </button>
          ))}
        </span>
      </DottedLine>
    </div>
  );
}
