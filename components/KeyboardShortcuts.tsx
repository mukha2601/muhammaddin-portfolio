"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { navHrefForKey } from "@/lib/nav";
import { toggleMusic, cycleWeather } from "@/lib/preferences";

export default function KeyboardShortcuts() {
  const router = useRouter();

  useEffect(() => {
    function isTypingTarget(target: EventTarget | null) {
      if (!(target instanceof HTMLElement)) return false;
      const tag = target.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (isTypingTarget(e.target)) return;

      const key = e.key.toLowerCase();

      if (key === "m") {
        e.preventDefault();
        toggleMusic();
        return;
      }

      if (key === "w") {
        e.preventDefault();
        cycleWeather();
        return;
      }

      const href = navHrefForKey(e.key);
      if (href) {
        e.preventDefault();
        router.push(href);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return null;
}
