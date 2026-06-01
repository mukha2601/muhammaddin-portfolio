import fs from "fs/promises";
import path from "path";
import defaultPortfolioJson from "@/data/portfolio.default.json";
import { clonePortfolio, type Portfolio } from "./portfolio";
import { isPortfolio } from "./portfolioStorage";

const PORTFOLIO_PATH = path.join(process.cwd(), "data", "portfolio.json");

export async function getPortfolioData(): Promise<Portfolio> {
  try {
    const raw = await fs.readFile(PORTFOLIO_PATH, "utf-8");
    const parsed: unknown = JSON.parse(raw);
    if (isPortfolio(parsed)) {
      return clonePortfolio(parsed);
    }
  } catch {
    // portfolio.json missing or invalid — use default template
  }

  return clonePortfolio(defaultPortfolioJson as Portfolio);
}
