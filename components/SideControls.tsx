"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "./LangProvider";
import { Lang, Track } from "@/lib/i18n";
import { Weather } from "./WeatherEffect";

type Theme = "brown" | "dark" | "purple" | "light";
type PanelId = "music" | "style" | "lang" | "weather" | null;

const themeList: Theme[] = ["brown", "dark", "purple", "light"];
const langList: Lang[] = ["uz", "en", "ru"];
const weatherList: Weather[] = ["off", "rain", "autumn", "winter"];

const weatherIcons: Record<Weather, string> = {
  off: "○",
  rain: "☔",
  autumn: "🍂",
  winter: "❄",
};

export default function SideControls() {
  const { lang, setLang, t } = useT();
  const [open, setOpen] = useState<PanelId>(null);
  const [music, setMusic] = useState(true);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [trackId, setTrackId] = useState<string>("");
  const [theme, setTheme] = useState<Theme>("brown");
  const [weather, setWeather] = useState<Weather>("off");
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMusic(localStorage.getItem("music") !== "off");
    const savedTheme = (localStorage.getItem("theme") as Theme) || "brown";
    setTheme(savedTheme);
    document.documentElement.dataset.theme = savedTheme;
    const savedWeather =
      (localStorage.getItem("weather") as Weather) || "off";
    setWeather(savedWeather);

    fetch("/api/tracks")
      .then((r) => r.json())
      .then((data: { tracks: Track[] }) => {
        const list = data.tracks || [];
        setTracks(list);
        const saved = localStorage.getItem("musicTrack");
        const current =
          (saved && list.find((tr) => tr.id === saved)?.id) ||
          list[0]?.id ||
          "";
        setTrackId(current);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpen(null);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function toggle(panel: PanelId) {
    setOpen((cur) => (cur === panel ? null : panel));
  }

  function setMusicState(next: boolean) {
    setMusic(next);
    localStorage.setItem("music", next ? "on" : "off");
    window.dispatchEvent(new CustomEvent("music-toggle", { detail: next }));
  }

  function selectTrack(track: Track) {
    setTrackId(track.id);
    localStorage.setItem("musicTrack", track.id);
    window.dispatchEvent(
      new CustomEvent("music-track", { detail: track.src }),
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
    setWeather(value);
    localStorage.setItem("weather", value);
    window.dispatchEvent(new CustomEvent("weather-change", { detail: value }));
  }

  return (
    <div className="side-controls" ref={wrapperRef}>
      <div className="side-controls-stack">
        <SideButton
          icon="♪"
          label={t.side.music}
          active={open === "music"}
          onClick={() => toggle("music")}
        />
        {open === "music" && (
          <SidePanel>
            <div className="side-panel-row">
              <span>{t.side.music}</span>
              <button
                className={`mini-toggle ${music ? "on" : "off"}`}
                onClick={() => setMusicState(!music)}
                aria-label="Toggle music"
              >
                <span className="mini-thumb" />
              </button>
            </div>
            <div className="track-divider" />
            <div className="track-list">
              {tracks.length === 0 ? (
                <div className="track-empty">— Hech narsa yo&apos;q —</div>
              ) : (
                tracks.map((tr) => (
                  <button
                    key={tr.id}
                    className={`track-item ${trackId === tr.id ? "active" : ""}`}
                    onClick={() => selectTrack(tr)}
                    title={tr.title}
                  >
                    <span className="track-icon">
                      {trackId === tr.id && music ? "▶" : "♪"}
                    </span>
                    <span className="track-title">{tr.title}</span>
                  </button>
                ))
              )}
            </div>
          </SidePanel>
        )}

        <SideButton
          icon="◆"
          label={t.side.style}
          active={open === "style"}
          onClick={() => toggle("style")}
        />
        {open === "style" && (
          <SidePanel>
            {themeList.map((th) => (
              <button
                key={th}
                className={`side-option ${theme === th ? "active" : ""}`}
                onClick={() => applyTheme(th)}
              >
                <span
                  className="side-swatch"
                  data-theme-preview={th}
                />
                {t.themes[th]}
              </button>
            ))}
          </SidePanel>
        )}

        <SideButton
          icon="A"
          label={t.side.lang}
          active={open === "lang"}
          onClick={() => toggle("lang")}
        />
        {open === "lang" && (
          <SidePanel>
            {langList.map((l) => (
              <button
                key={l}
                className={`side-option ${lang === l ? "active" : ""}`}
                onClick={() => applyLang(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </SidePanel>
        )}

        <SideButton
          icon={weatherIcons[weather]}
          label={t.side.weather}
          active={open === "weather"}
          onClick={() => toggle("weather")}
        />
        {open === "weather" && (
          <SidePanel>
            {weatherList.map((w) => (
              <button
                key={w}
                className={`side-option ${weather === w ? "active" : ""}`}
                onClick={() => applyWeather(w)}
              >
                <span className="side-swatch weather-icon">
                  {weatherIcons[w]}
                </span>
                {t.weather[w]}
              </button>
            ))}
          </SidePanel>
        )}
      </div>
    </div>
  );
}

function SideButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`side-btn ${active ? "active" : ""}`}
      onClick={onClick}
      aria-label={label}
    >
      <span className="side-btn-icon">{icon}</span>
      <span className="side-btn-label">{label}</span>
    </button>
  );
}

function SidePanel({ children }: { children: React.ReactNode }) {
  return <div className="side-panel">{children}</div>;
}
