"use client";

import { useEffect } from "react";
import { toggleMusic, cycleWeather } from "@/lib/preferences";

export default function KeyboardShortcuts() {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "F1") {
        e.preventDefault();
        toggleMusic();
      } else if (e.key === "F2") {
        e.preventDefault();
        cycleWeather();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return null;
}
