import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const AUDIO_EXTENSIONS = new Set([".mp3", ".ogg", ".wav", ".m4a", ".aac"]);

function titleFromFilename(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "");
  return base.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
}

export async function GET() {
  try {
    const musicDir = path.join(process.cwd(), "public", "music");
    const entries = await readdir(musicDir, { withFileTypes: true });

    const tracks = entries
      .filter((e) => e.isFile())
      .filter((e) => AUDIO_EXTENSIONS.has(path.extname(e.name).toLowerCase()))
      .map((e) => ({
        id: e.name.replace(/\.[^.]+$/, ""),
        title: titleFromFilename(e.name),
        src: `/music/${e.name}`,
      }))
      .sort((a, b) => a.title.localeCompare(b.title));

    return NextResponse.json({ tracks });
  } catch {
    return NextResponse.json({ tracks: [] });
  }
}
