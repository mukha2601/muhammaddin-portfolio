"use client";

import { useEffect, useState } from "react";
import { useT } from "./LangProvider";
import { Lang, Track } from "@/lib/i18n";
import { Weather } from "./WeatherEffect";
import { getMusicEnabled, getWeather, setMusicEnabled, setWeather } from "@/lib/preferences";

type Theme = "green" | "amber" | "white" | "dim";

const themeList: Theme[] = ["green", "amber", "white", "dim"];
const langList: Lang[] = ["uz", "en", "ru"];
const weatherList: Weather[] = ["off", "rain", "autumn", "winter"];

const weatherIcons: Record<Weather, string> = {
  off: "○",
  rain: "☔",
  autumn: "🍂",
  winter: "❄",
};

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
    <div className="settings-panel">
      <section className="settings-section">
        <h2 className="settings-heading">{t.side.music}</h2>
        <div className="settings-row">
          <span className="settings-label">{t.settings.enabled}:</span>
          <button
            className={`mini-toggle ${music ? "on" : "off"}`}
            onClick={() => setMusicState(!music)}
            aria-label="Toggle music"
          >
            <span className="mini-thumb" />
          </button>
        </div>
        <div className="settings-track-list">
          {tracks.length === 0 ? (
            <div className="track-empty">{t.settings.noTracks}</div>
          ) : (
            tracks.map((tr) => (
              <button
                key={tr.id}
                className={`settings-option ${trackId === tr.id ? "active" : ""}`}
                onClick={() => selectTrack(tr)}
                title={tr.title}
              >
                <span className="track-icon">
                  {trackId === tr.id && music ? "▶" : "♪"}
                </span>
                {tr.title}
              </button>
            ))
          )}
        </div>
      </section>

      <section className="settings-section">
        <h2 className="settings-heading">{t.side.style}</h2>
        <div className="settings-options">
          {themeList.map((th) => (
            <button
              key={th}
              className={`settings-option ${theme === th ? "active" : ""}`}
              onClick={() => applyTheme(th)}
            >
              <span className="side-swatch" data-theme-preview={th} />
              {t.themes[th]}
            </button>
          ))}
        </div>
      </section>

      <section className="settings-section">
        <h2 className="settings-heading">{t.side.lang}</h2>
        <div className="settings-options">
          {langList.map((l) => (
            <button
              key={l}
              className={`settings-option ${lang === l ? "active" : ""}`}
              onClick={() => applyLang(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      <section className="settings-section">
        <h2 className="settings-heading">{t.side.weather}</h2>
        <div className="settings-options">
          {weatherList.map((w) => (
            <button
              key={w}
              className={`settings-option ${weather === w ? "active" : ""}`}
              onClick={() => applyWeather(w)}
            >
              <span className="side-swatch weather-icon">{weatherIcons[w]}</span>
              {t.weather[w]}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
