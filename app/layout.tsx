import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import FloatingPixels from "@/components/FloatingPixels";
import MusicPlayer from "@/components/MusicPlayer";
import SideControls from "@/components/SideControls";
import WeatherEffect from "@/components/WeatherEffect";
import { LangProvider } from "@/components/LangProvider";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: "Portfolio | Muhammaddin Xoliqov",
  description: "Pixel-style personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uz"
      className={`${pressStart.variable} ${vt323.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var t = localStorage.getItem('theme') || 'brown';
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
          <FloatingPixels />
          <WeatherEffect />
          <div className="app-shell">
            <div className="site-container">{children}</div>
          </div>
          <BottomNav />
          <SideControls />
          <MusicPlayer />
        </LangProvider>
      </body>
    </html>
  );
}
