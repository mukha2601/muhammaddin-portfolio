export type Lang = "uz" | "en" | "ru";

export type Translation = {
  nav: {
    me: string;
    stack: string;
    projects: string;
    experience: string;
    contact: string;
    settings: string;
  };
  settings: { enabled: string; noTracks: string };
  status: { f1: string; f2: string; musicOn: string; musicOff: string };
  side: {
    music: string;
    style: string;
    lang: string;
    weather: string;
    musicHint: string;
  };
  themes: { green: string; amber: string; white: string; dim: string };
  weather: { off: string; rain: string; autumn: string; winter: string };
  me: {
    downloadCv: string;
    labels: {
      role: string;
      cv: string;
    };
  };
  stack: {
    frontend: string;
    mobile: string;
  };
  projects: {
    visit: string;
    url: string;
  };
  experience: {
    period: string;
  };
};

export const translations: Record<Lang, Translation> = {
  uz: {
    nav: {
      me: "Men",
      stack: "Stack",
      projects: "Loyihalar",
      experience: "Tajriba",
      contact: "Aloqa",
      settings: "Settings",
    },
    settings: {
      enabled: "Yoqilgan",
      noTracks: "— Hech narsa yo'q —",
    },
    status: {
      f1: "F1 — Musiqa",
      f2: "F2 — Ob-havo",
      musicOn: "yoqilgan",
      musicOff: "o'chirilgan",
    },
    side: {
      music: "MUSIQA",
      style: "STIL",
      lang: "TIL",
      weather: "OB-HAVO",
      musicHint: "♪ MUSIQA UCHUN BOSING",
    },
    themes: {
      green: "YASHIL",
      amber: "AMBER",
      white: "OQ",
      dim: "XIRA",
    },
    weather: {
      off: "YO'Q",
      rain: "YOMG'IR",
      autumn: "KUZ",
      winter: "QISH",
    },
    me: {
      downloadCv: "Download CV",
      labels: {
        role: "Processor Type",
        cv: "Resume File",
      },
    },
    stack: {
      frontend: "Frontend Stack",
      mobile: "Mobile Stack",
    },
    projects: {
      visit: "Run Test",
      url: "Target URL",
    },
    experience: {
      period: "Date Range",
    },
  },
  en: {
    nav: {
      me: "Me",
      stack: "Stack",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
      settings: "Settings",
    },
    settings: {
      enabled: "Enabled",
      noTracks: "— No tracks —",
    },
    status: {
      f1: "F1 — Music",
      f2: "F2 — Weather",
      musicOn: "on",
      musicOff: "off",
    },
    side: {
      music: "MUSIC",
      style: "STYLE",
      lang: "LANG",
      weather: "WEATHER",
      musicHint: "♪ CLICK TO PLAY MUSIC",
    },
    themes: {
      green: "GREEN",
      amber: "AMBER",
      white: "WHITE",
      dim: "DIM",
    },
    weather: {
      off: "NONE",
      rain: "RAIN",
      autumn: "AUTUMN",
      winter: "WINTER",
    },
    me: {
      downloadCv: "Download CV",
      labels: {
        role: "Processor Type",
        cv: "Resume File",
      },
    },
    stack: {
      frontend: "Frontend Stack",
      mobile: "Mobile Stack",
    },
    projects: {
      visit: "Run Test",
      url: "Target URL",
    },
    experience: {
      period: "Date Range",
    },
  },
  ru: {
    nav: {
      me: "Обо мне",
      stack: "Stack",
      projects: "Проекты",
      experience: "Опыт",
      contact: "Контакт",
      settings: "Settings",
    },
    settings: {
      enabled: "Включено",
      noTracks: "— Нет треков —",
    },
    status: {
      f1: "F1 — Музыка",
      f2: "F2 — Погода",
      musicOn: "включено",
      musicOff: "выключено",
    },
    side: {
      music: "МУЗЫКА",
      style: "СТИЛЬ",
      lang: "ЯЗЫК",
      weather: "ПОГОДА",
      musicHint: "♪ НАЖМИТЕ ДЛЯ МУЗЫКИ",
    },
    themes: {
      green: "ЗЕЛЁНЫЙ",
      amber: "ЯНТАРНЫЙ",
      white: "БЕЛЫЙ",
      dim: "ТУСКЛЫЙ",
    },
    weather: {
      off: "НЕТ",
      rain: "ДОЖДЬ",
      autumn: "ОСЕНЬ",
      winter: "ЗИМА",
    },
    me: {
      downloadCv: "Download CV",
      labels: {
        role: "Processor Type",
        cv: "Resume File",
      },
    },
    stack: {
      frontend: "Frontend Stack",
      mobile: "Mobile Stack",
    },
    projects: {
      visit: "Run Test",
      url: "Target URL",
    },
    experience: {
      period: "Date Range",
    },
  },
};

export type Track = { id: string; title: string; src: string };
