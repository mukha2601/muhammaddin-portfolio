export type Lang = "uz" | "en" | "ru";

export type Translation = {
  nav: {
    me: string;
    projects: string;
    experience: string;
    contact: string;
    settings: string;
  };
  settings: { track: string; noTracks: string };
  status: { musicKey: string; weatherKey: string; musicOn: string; musicOff: string };
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
      name: string;
      role: string;
      cv: string;
      frontend: string;
      mobile: string;
    };
  };
  projects: {
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
      projects: "Loyihalar",
      experience: "Tajriba",
      contact: "Aloqa",
      settings: "Settings",
    },
    settings: {
      track: "track",
      noTracks: "— Hech narsa yo'q —",
    },
    status: {
      musicKey: "[M] — Musiqa",
      weatherKey: "[W] — Ob-havo",
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
        name: "Ism",
        role: "Lavozim",
        cv: "CV",
        frontend: "Frontend Stack",
        mobile: "Mobile Stack",
      },
    },
    projects: {
      url: "URL",
    },
    experience: {
      period: "Date",
    },
  },
  en: {
    nav: {
      me: "Me",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
      settings: "Settings",
    },
    settings: {
      track: "track",
      noTracks: "— No tracks —",
    },
    status: {
      musicKey: "[M] — Music",
      weatherKey: "[W] — Weather",
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
        name: "Name",
        role: "Role",
        cv: "CV",
        frontend: "Frontend Stack",
        mobile: "Mobile Stack",
      },
    },
    projects: {
      url: "URL",
    },
    experience: {
      period: "Date",
    },
  },
  ru: {
    nav: {
      me: "Обо мне",
      projects: "Проекты",
      experience: "Опыт",
      contact: "Контакт",
      settings: "Settings",
    },
    settings: {
      track: "track",
      noTracks: "— Нет треков —",
    },
    status: {
      musicKey: "[M] — Музыка",
      weatherKey: "[W] — Погода",
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
        name: "Имя",
        role: "Должность",
        cv: "CV",
        frontend: "Frontend Stack",
        mobile: "Mobile Stack",
      },
    },
    projects: {
      url: "URL",
    },
    experience: {
      period: "Date",
    },
  },
};

export type Track = { id: string; title: string; src: string };
