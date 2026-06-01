import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";
import MusicPlayer from "@/components/MusicPlayer";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import TerminalChrome from "@/components/TerminalChrome";
import WeatherEffect from "@/components/WeatherEffect";
import { defaultPortfolio } from "@/lib/portfolio";
import { PortfolioProvider } from "@/components/PortfolioProvider";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: `Portfolio | ${defaultPortfolio.profile.name}`,
  description: "Retro DOS-style personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
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
                } catch(e){}
              })();
            `,
          }}
        />
      </head>
      <body>
        <PortfolioProvider>
          <div className="scanline" aria-hidden="true" />
          <div className="crt-vignette" aria-hidden="true" />
          <WeatherEffect />
          <KeyboardShortcuts />
          <div className="app-shell">
            <TerminalChrome>{children}</TerminalChrome>
          </div>
          <MusicPlayer />
        </PortfolioProvider>
      </body>
    </html>
  );
}
