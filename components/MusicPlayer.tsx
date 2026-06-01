"use client";

import { useEffect, useRef } from "react";
import { Track } from "@/lib/portfolio";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.25;
    audio.loop = true;

    let cancelled = false;

    const tryPlay = () => {
      audio.play().catch(() => {});
    };

    fetch("/api/tracks")
      .then((r) => r.json())
      .then((data: { tracks: Track[] }) => {
        if (cancelled) return;
        const list = data.tracks || [];
        if (list.length === 0) return;
        const savedId = localStorage.getItem("musicTrack");
        const track =
          (savedId && list.find((t) => t.id === savedId)) || list[0];
        audio.src = track.src;
        window.dispatchEvent(
          new CustomEvent("music-track-info", {
            detail: { title: track.title },
          }),
        );
        if (localStorage.getItem("music") !== "off") tryPlay();
      })
      .catch(() => {});

    const handleFirstInteraction = () => {
      if (localStorage.getItem("music") !== "off" && audio.paused && audio.src)
        tryPlay();
    };
    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("keydown", handleFirstInteraction);

    const handleToggle = (e: Event) => {
      const on = (e as CustomEvent<boolean>).detail;
      if (on) tryPlay();
      else audio.pause();
    };
    window.addEventListener("music-toggle", handleToggle as EventListener);

    const handleTrackChange = (e: Event) => {
      const src = (e as CustomEvent<string>).detail;
      if (!src) return;
      audio.src = src;
      if (localStorage.getItem("music") !== "off") tryPlay();
    };
    window.addEventListener(
      "music-track",
      handleTrackChange as EventListener,
    );

    return () => {
      cancelled = true;
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("music-toggle", handleToggle as EventListener);
      window.removeEventListener(
        "music-track",
        handleTrackChange as EventListener,
      );
    };
  }, []);

  return <audio ref={audioRef} preload="auto" />;
}
