export type Lang = "uz" | "en" | "ru";

export type Translation = {
  nav: { me: string; projects: string; experience: string; contact: string };
  side: {
    music: string;
    style: string;
    lang: string;
    weather: string;
    musicHint: string;
  };
  themes: { brown: string; dark: string; purple: string; light: string };
  weather: { off: string; rain: string; autumn: string; winter: string };
  me: {
    tag: string;
    downloadCv: string;
    skillsTitle: string;
    frontendTitle: string;
    mobileTitle: string;
  };
  projects: {
    tag: string;
    title: string;
    visit: string;
  };
  experience: {
    tag: string;
    title: string;
  };
  contact: {
    tag: string;
    title: string;
    name: string;
    namePlaceholder: string;
    email: string;
    message: string;
    messagePlaceholder: string;
    send: string;
    sent: string;
  };
};

export const translations: Record<Lang, Translation> = {
  uz: {
    nav: {
      me: "ME",
      projects: "LOYIHA",
      experience: "EXP",
      contact: "CONTACT",
    },
    side: {
      music: "MUSIQA",
      style: "STIL",
      lang: "TIL",
      weather: "OB-HAVO",
      musicHint: "♪ MUSIQA UCHUN BOSING",
    },
    themes: {
      brown: "JIGARRANG",
      dark: "QORA",
      purple: "BINAFSHA",
      light: "OQ",
    },
    weather: {
      off: "YO'Q",
      rain: "YOMG'IR",
      autumn: "KUZ",
      winter: "QISH",
    },
    me: {
      tag: "// ME",
      downloadCv: "CV YUKLAB OLISH ↓",
      skillsTitle: "KO'NIKMALAR",
      frontendTitle: "FRONTEND",
      mobileTitle: "MOBILE / FLUTTER",
    },
    projects: {
      tag: "// LOYIHALAR",
      title: "PROJECTS",
      visit: "SAYTGA O'TISH →",
    },
    experience: {
      tag: "// TAJRIBA",
      title: "EXPERIENCE",
    },
    contact: {
      tag: "// ALOQA",
      title: "CONTACT",
      name: "ISM",
      namePlaceholder: "Ismingiz...",
      email: "EMAIL",
      message: "XABAR",
      messagePlaceholder: "Xabaringizni yozing...",
      send: "YUBORISH →",
      sent: "YUBORILDI ✓",
    },
  },
  en: {
    nav: {
      me: "ME",
      projects: "PROJECTS",
      experience: "EXP",
      contact: "CONTACT",
    },
    side: {
      music: "MUSIC",
      style: "STYLE",
      lang: "LANG",
      weather: "WEATHER",
      musicHint: "♪ CLICK TO PLAY MUSIC",
    },
    themes: {
      brown: "BROWN",
      dark: "DARK",
      purple: "PURPLE",
      light: "LIGHT",
    },
    weather: {
      off: "NONE",
      rain: "RAIN",
      autumn: "AUTUMN",
      winter: "WINTER",
    },
    me: {
      tag: "// ME",
      downloadCv: "DOWNLOAD CV ↓",
      skillsTitle: "SKILLS",
      frontendTitle: "FRONTEND",
      mobileTitle: "MOBILE / FLUTTER",
    },
    projects: {
      tag: "// PROJECTS",
      title: "PROJECTS",
      visit: "VISIT SITE →",
    },
    experience: {
      tag: "// EXPERIENCE",
      title: "EXPERIENCE",
    },
    contact: {
      tag: "// CONTACT",
      title: "CONTACT",
      name: "NAME",
      namePlaceholder: "Your name...",
      email: "EMAIL",
      message: "MESSAGE",
      messagePlaceholder: "Write your message...",
      send: "SEND →",
      sent: "SENT ✓",
    },
  },
  ru: {
    nav: {
      me: "Я",
      projects: "ПРОЕКТЫ",
      experience: "ОПЫТ",
      contact: "КОНТАКТ",
    },
    side: {
      music: "МУЗЫКА",
      style: "СТИЛЬ",
      lang: "ЯЗЫК",
      weather: "ПОГОДА",
      musicHint: "♪ НАЖМИТЕ ДЛЯ МУЗЫКИ",
    },
    themes: {
      brown: "КОРИЧНЕВЫЙ",
      dark: "ТЁМНЫЙ",
      purple: "ФИОЛЕТОВЫЙ",
      light: "СВЕТЛЫЙ",
    },
    weather: {
      off: "НЕТ",
      rain: "ДОЖДЬ",
      autumn: "ОСЕНЬ",
      winter: "ЗИМА",
    },
    me: {
      tag: "// Я",
      downloadCv: "СКАЧАТЬ CV ↓",
      skillsTitle: "НАВЫКИ",
      frontendTitle: "FRONTEND",
      mobileTitle: "MOBILE / FLUTTER",
    },
    projects: {
      tag: "// ПРОЕКТЫ",
      title: "PROJECTS",
      visit: "ПЕРЕЙТИ →",
    },
    experience: {
      tag: "// ОПЫТ",
      title: "EXPERIENCE",
    },
    contact: {
      tag: "// КОНТАКТ",
      title: "CONTACT",
      name: "ИМЯ",
      namePlaceholder: "Ваше имя...",
      email: "EMAIL",
      message: "СООБЩЕНИЕ",
      messagePlaceholder: "Напишите сообщение...",
      send: "ОТПРАВИТЬ →",
      sent: "ОТПРАВЛЕНО ✓",
    },
  },
};

export type Track = { id: string; title: string; src: string };
