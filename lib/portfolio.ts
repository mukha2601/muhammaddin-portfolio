import portfolioData from "@/data/portfolio.json";
import type { Lang } from "./i18n";

export type Skill = { name: string; icon: string };

export type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: string;
};

export type LocalizedProject = {
  id: number;
  url: string;
  colors: string[];
  title: string;
  description: string;
};

export type LocalizedExperience = {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string;
};

export type LocalizedProfile = {
  name: string;
  cvUrl: string;
  photoUrl: string;
  role: string;
};

export type LocalizedPortfolio = {
  profile: LocalizedProfile;
  skills: { frontend: Skill[]; mobile: Skill[] };
  projects: LocalizedProject[];
  experience: LocalizedExperience[];
  contactLinks: ContactLink[];
};

type RawPortfolio = {
  profile: {
    name: string;
    cvUrl: string;
    photoUrl: string;
    translations: Record<Lang, { role: string }>;
  };
  skills: { frontend: Skill[]; mobile: Skill[] };
  projects: {
    id: number;
    url: string;
    colors: string[];
    translations: Record<Lang, { title: string; description: string }>;
  }[];
  experience: {
    id: number;
    translations: Record<
      Lang,
      { company: string; role: string; period: string; description: string }
    >;
  }[];
  contactLinks: ContactLink[];
};

const data = portfolioData as RawPortfolio;

export function getPortfolio(lang: Lang): LocalizedPortfolio {
  return {
    profile: {
      name: data.profile.name,
      cvUrl: data.profile.cvUrl,
      photoUrl: data.profile.photoUrl,
      role: data.profile.translations[lang].role,
    },
    skills: data.skills,
    projects: data.projects.map((p) => ({
      id: p.id,
      url: p.url,
      colors: p.colors,
      title: p.translations[lang].title,
      description: p.translations[lang].description,
    })),
    experience: data.experience.map((e) => ({
      id: e.id,
      ...e.translations[lang],
    })),
    contactLinks: data.contactLinks,
  };
}
