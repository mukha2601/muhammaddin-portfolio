import {
  clonePortfolio,
  type Portfolio,
} from "./portfolio";

export const PORTFOLIO_STORAGE_KEY = "portfolio-override";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export function isPortfolio(value: unknown): value is Portfolio {
  if (!value || typeof value !== "object") return false;

  const data = value as Record<string, unknown>;
  const profile = data.profile;
  if (!profile || typeof profile !== "object") return false;

  const p = profile as Record<string, unknown>;
  if (
    !isNonEmptyString(p.name) ||
    !isNonEmptyString(p.role) ||
    !isNonEmptyString(p.cvUrl) ||
    !isNonEmptyString(p.photoUrl)
  ) {
    return false;
  }

  const skills = data.skills;
  if (!Array.isArray(skills)) return false;
  for (const item of skills) {
    if (!item || typeof item !== "object") return false;
    const group = item as Record<string, unknown>;
    if (!isNonEmptyString(group.name) || !isStringArray(group.items)) {
      return false;
    }
  }

  if (!Array.isArray(data.projects)) return false;
  for (const item of data.projects) {
    if (!item || typeof item !== "object") return false;
    const project = item as Record<string, unknown>;
    if (
      typeof project.id !== "number" ||
      !isNonEmptyString(project.title) ||
      !isNonEmptyString(project.description) ||
      !isNonEmptyString(project.url)
    ) {
      return false;
    }
  }

  if (!Array.isArray(data.experience)) return false;
  for (const item of data.experience) {
    if (!item || typeof item !== "object") return false;
    const exp = item as Record<string, unknown>;
    if (
      typeof exp.id !== "number" ||
      !isNonEmptyString(exp.company) ||
      !isNonEmptyString(exp.role) ||
      !isNonEmptyString(exp.period) ||
      !isNonEmptyString(exp.description)
    ) {
      return false;
    }
  }

  if (!Array.isArray(data.contactLinks)) return false;
  for (const item of data.contactLinks) {
    if (!item || typeof item !== "object") return false;
    const link = item as Record<string, unknown>;
    if (
      !isNonEmptyString(link.label) ||
      !isNonEmptyString(link.value) ||
      !isNonEmptyString(link.href)
    ) {
      return false;
    }
  }

  return true;
}

export function parsePortfolioJson(
  text: string,
): { ok: true; data: Portfolio } | { ok: false; error: string } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, error: "Invalid JSON syntax." };
  }

  if (!isPortfolio(parsed)) {
    return {
      ok: false,
      error: "JSON structure does not match portfolio.json format.",
    };
  }

  return { ok: true, data: clonePortfolio(parsed) };
}

export function loadStoredPortfolio(base: Portfolio): Portfolio {
  const fallback = clonePortfolio(base);
  if (typeof window === "undefined") return fallback;

  const saved = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
  if (!saved) return fallback;

  const result = parsePortfolioJson(saved);
  return result.ok ? result.data : fallback;
}

export function savePortfolioToStorage(data: Portfolio) {
  localStorage.setItem(
    PORTFOLIO_STORAGE_KEY,
    JSON.stringify(clonePortfolio(data), null, 2),
  );
}

export function clearStoredPortfolio() {
  localStorage.removeItem(PORTFOLIO_STORAGE_KEY);
}

export function downloadPortfolioJson(data: Portfolio) {
  const blob = new Blob([JSON.stringify(clonePortfolio(data), null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "portfolio.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

export function formatPortfolioJson(data: Portfolio) {
  return JSON.stringify(clonePortfolio(data), null, 2);
}
