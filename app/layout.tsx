import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";
import MusicPlayer from "@/components/MusicPlayer";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import TerminalChrome from "@/components/TerminalChrome";
import WeatherEffect from "@/components/WeatherEffect";
import { LangProvider } from "@/components/LangProvider";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: "Portfolio | Muhammaddin Xoliqov",
  description: "Retro DOS-style personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uz"
      className={vt323.variable}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var t = localStorage.getItem('theme') || 'green';
                  document.documentElement.dataset.theme = t;
                  var l = localStorage.getItem('lang') || 'uz';
                  document.documentElement.lang = l;
                } catch(e){}
              })();
            `,
          }}
        />
      </head>
      <body>
        <LangProvider>
          <div className="scanline" aria-hidden="true" />
          <div className="crt-vignette" aria-hidden="true" />
          <WeatherEffect />
          <KeyboardShortcuts />
          <div className="app-shell">
            <TerminalChrome>{children}</TerminalChrome>
          </div>
          <MusicPlayer />
        </LangProvider>
      </body>
    </html>
  );
}
