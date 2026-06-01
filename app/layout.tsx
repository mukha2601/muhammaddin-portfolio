import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";
import MusicPlayer from "@/components/MusicPlayer";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import TerminalChrome from "@/components/TerminalChrome";
import WeatherEffect from "@/components/WeatherEffect";
import { PortfolioProvider } from "@/components/PortfolioProvider";
import { getPortfolioData } from "@/lib/portfolio.server";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await getPortfolioData();
  return {
    title: `Portfolio | ${portfolio.profile.name}`,
    description: "Retro DOS-style personal portfolio",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialPortfolio = await getPortfolioData();

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
        <PortfolioProvider initialPortfolio={initialPortfolio}>
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
