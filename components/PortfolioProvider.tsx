"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  clonePortfolio,
  getDefaultPortfolio,
  type Portfolio,
} from "@/lib/portfolio";
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
  const [portfolio, setPortfolio] = useState<Portfolio>(() =>
    getDefaultPortfolio(),
  );

  useEffect(() => {
    const stored = loadStoredPortfolio();
    setPortfolio(stored);
    syncDocumentTitle(stored);
  }, []);

  const savePortfolio = useCallback((data: Portfolio) => {
    const copy = clonePortfolio(data);
    savePortfolioToStorage(copy);
    setPortfolio(copy);
    syncDocumentTitle(copy);
  }, []);

  const resetPortfolio = useCallback(() => {
    clearStoredPortfolio();
    const fresh = getDefaultPortfolio();
    setPortfolio(fresh);
    syncDocumentTitle(fresh);
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
