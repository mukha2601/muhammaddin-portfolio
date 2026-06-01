import portfolioData from "@/data/portfolio.json";

export type ContactLink = {
  label: string;
  value: string;
  href: string;
};

export type Project = {
  id: number;
  url: string;
  title: string;
  description: string;
};

export type Experience = {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string;
};

export type Profile = {
  name: string;
  cvUrl: string;
  photoUrl: string;
  role: string;
};

export type Portfolio = {
  profile: Profile;
  skills: { frontend: string[]; mobile: string[] };
  projects: Project[];
  experience: Experience[];
  contactLinks: ContactLink[];
};

export type Track = { id: string; title: string; src: string };

export const portfolio = portfolioData as Portfolio;
