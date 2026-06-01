"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { defaultPortfolio, type Portfolio } from "@/lib/portfolio";
import {
  clearStoredPortfolio,
  loadStoredPortfolio,
  savePortfolioToStorage,
} from "@/lib/portfolioStorage";

type PortfolioContextValue = {
  portfolio: Portfolio;
  savePortfolio: (data: Portfolio) => void;
  resetPortfolio: () => void;
};

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

function syncDocumentTitle(data: Portfolio) {
  document.title = `Portfolio | ${data.profile.name}`;
}

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolio, setPortfolio] = useState<Portfolio>(defaultPortfolio);

  useEffect(() => {
    const stored = loadStoredPortfolio(defaultPortfolio);
    setPortfolio(stored);
    syncDocumentTitle(stored);
  }, []);

  const savePortfolio = useCallback((data: Portfolio) => {
    savePortfolioToStorage(data);
    setPortfolio(data);
    syncDocumentTitle(data);
  }, []);

  const resetPortfolio = useCallback(() => {
    clearStoredPortfolio();
    setPortfolio(defaultPortfolio);
    syncDocumentTitle(defaultPortfolio);
  }, []);

  return (
    <PortfolioContext.Provider
      value={{ portfolio, savePortfolio, resetPortfolio }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error("usePortfolio must be used inside PortfolioProvider");
  }
  return ctx;
}
