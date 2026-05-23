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
  themes: { brown: string; dark: string; purple: string };
  weather: { off: string; rain: string; autumn: string; winter: string };
  me: {
    tag: string;
    role: string;
    downloadCv: string;
    skillsTitle: string;
    frontendTitle: string;
    mobileTitle: string;
  };
  skills: {
    frontend: { name: string; icon: string }[];
    mobile: { name: string; icon: string }[];
  };
  projects: {
    tag: string;
    title: string;
    visit: string;
    list: { id: number; title: string; description: string }[];
  };
  experience: {
    tag: string;
    title: string;
    list: {
      id: number;
      company: string;
      role: string;
      period: string;
      description: string;
    }[];
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
    },
    weather: {
      off: "YO'Q",
      rain: "YOMG'IR",
      autumn: "KUZ",
      winter: "QISH",
    },
    me: {
      tag: "// ME",
      role: "Frontend & Mobile Developer",
      downloadCv: "CV YUKLAB OLISH ↓",
      skillsTitle: "KO'NIKMALAR",
      frontendTitle: "FRONTEND",
      mobileTitle: "MOBILE / FLUTTER",
    },
    skills: {
      frontend: [
        { name: "HTML", icon: "◼" },
        { name: "CSS", icon: "◻" },
        { name: "JavaScript", icon: "JS" },
        { name: "TypeScript", icon: "TS" },
        { name: "React", icon: "⚛" },
        { name: "Next.js", icon: "▲" },
        { name: "Tailwind", icon: "≋" },
        { name: "Git", icon: "⎇" },
      ],
      mobile: [
        { name: "Dart", icon: "◆" },
        { name: "Flutter", icon: "▼" },
        { name: "Riverpod", icon: "⚡" },
        { name: "Firebase", icon: "🔥" },
        { name: "REST API", icon: "⇄" },
        { name: "Hive", icon: "⬢" },
      ],
    },
    projects: {
      tag: "// LOYIHALAR",
      title: "PROJECTS",
      visit: "SAYTGA O'TISH →",
      list: [
        {
          id: 1,
          title: "E-Commerce App",
          description:
            "Onlayn do'kon ilovasi — mahsulotlar, savat va to'lov tizimi bilan to'liq funksional platforma.",
        },
        {
          id: 2,
          title: "Task Manager",
          description:
            "Vazifalarni boshqarish ilovasi — drag & drop va real-time yangilanish imkoniyatlari.",
        },
        {
          id: 3,
          title: "Weather Dashboard",
          description:
            "Ob-havo ma'lumotlari paneli — shahar bo'yicha prognoz va interaktiv grafiklar.",
        },
      ],
    },
    experience: {
      tag: "// TAJRIBA",
      title: "EXPERIENCE",
      list: [
        {
          id: 1,
          company: "Tech Company",
          role: "Frontend Developer",
          period: "2023 — Hozir",
          description:
            "React va Next.js bilan veb-ilovalar yaratish, UI komponentlar kutubxonasi va dizayn tizimini rivojlantirish.",
        },
        {
          id: 2,
          company: "Startup XYZ",
          role: "Junior Developer",
          period: "2021 — 2023",
          description:
            "Full-stack loyihalarda ishlash, REST API integratsiyasi va ma'lumotlar bazasi bilan ishlash.",
        },
        {
          id: 3,
          company: "Freelance",
          role: "Web Developer",
          period: "2020 — 2021",
          description:
            "Mijozlar uchun landing page va portfolio saytlar yaratish, pixel-perfect dizayn amalga oshirish.",
        },
      ],
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
    },
    weather: {
      off: "NONE",
      rain: "RAIN",
      autumn: "AUTUMN",
      winter: "WINTER",
    },
    me: {
      tag: "// ME",
      role: "Frontend & Mobile Developer",
      downloadCv: "DOWNLOAD CV ↓",
      skillsTitle: "SKILLS",
      frontendTitle: "FRONTEND",
      mobileTitle: "MOBILE / FLUTTER",
    },
    skills: {
      frontend: [
        { name: "HTML", icon: "◼" },
        { name: "CSS", icon: "◻" },
        { name: "JavaScript", icon: "JS" },
        { name: "TypeScript", icon: "TS" },
        { name: "React", icon: "⚛" },
        { name: "Next.js", icon: "▲" },
        { name: "Tailwind", icon: "≋" },
        { name: "Git", icon: "⎇" },
      ],
      mobile: [
        { name: "Dart", icon: "◆" },
        { name: "Flutter", icon: "▼" },
        { name: "Riverpod", icon: "⚡" },
        { name: "Firebase", icon: "🔥" },
        { name: "REST API", icon: "⇄" },
        { name: "Hive", icon: "⬢" },
      ],
    },
    projects: {
      tag: "// PROJECTS",
      title: "PROJECTS",
      visit: "VISIT SITE →",
      list: [
        {
          id: 1,
          title: "E-Commerce App",
          description:
            "Online store application — a full-featured platform with products, cart and payment system.",
        },
        {
          id: 2,
          title: "Task Manager",
          description:
            "Task management application — drag & drop and real-time updates.",
        },
        {
          id: 3,
          title: "Weather Dashboard",
          description:
            "Weather data panel — city-based forecast and interactive charts.",
        },
      ],
    },
    experience: {
      tag: "// EXPERIENCE",
      title: "EXPERIENCE",
      list: [
        {
          id: 1,
          company: "Tech Company",
          role: "Frontend Developer",
          period: "2023 — Present",
          description:
            "Building web apps with React and Next.js, developing UI component library and design system.",
        },
        {
          id: 2,
          company: "Startup XYZ",
          role: "Junior Developer",
          period: "2021 — 2023",
          description:
            "Working on full-stack projects, REST API integration and database operations.",
        },
        {
          id: 3,
          company: "Freelance",
          role: "Web Developer",
          period: "2020 — 2021",
          description:
            "Creating landing pages and portfolio sites for clients, implementing pixel-perfect design.",
        },
      ],
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
    },
    weather: {
      off: "НЕТ",
      rain: "ДОЖДЬ",
      autumn: "ОСЕНЬ",
      winter: "ЗИМА",
    },
    me: {
      tag: "// Я",
      role: "Frontend & Mobile Developer",
      downloadCv: "СКАЧАТЬ CV ↓",
      skillsTitle: "НАВЫКИ",
      frontendTitle: "FRONTEND",
      mobileTitle: "MOBILE / FLUTTER",
    },
    skills: {
      frontend: [
        { name: "HTML", icon: "◼" },
        { name: "CSS", icon: "◻" },
        { name: "JavaScript", icon: "JS" },
        { name: "TypeScript", icon: "TS" },
        { name: "React", icon: "⚛" },
        { name: "Next.js", icon: "▲" },
        { name: "Tailwind", icon: "≋" },
        { name: "Git", icon: "⎇" },
      ],
      mobile: [
        { name: "Dart", icon: "◆" },
        { name: "Flutter", icon: "▼" },
        { name: "Riverpod", icon: "⚡" },
        { name: "Firebase", icon: "🔥" },
        { name: "REST API", icon: "⇄" },
        { name: "Hive", icon: "⬢" },
      ],
    },
    projects: {
      tag: "// ПРОЕКТЫ",
      title: "PROJECTS",
      visit: "ПЕРЕЙТИ →",
      list: [
        {
          id: 1,
          title: "E-Commerce App",
          description:
            "Приложение интернет-магазина — полнофункциональная платформа с товарами, корзиной и системой оплаты.",
        },
        {
          id: 2,
          title: "Task Manager",
          description:
            "Приложение для управления задачами — drag & drop и обновления в реальном времени.",
        },
        {
          id: 3,
          title: "Weather Dashboard",
          description:
            "Панель погодных данных — прогноз по городу и интерактивные графики.",
        },
      ],
    },
    experience: {
      tag: "// ОПЫТ",
      title: "EXPERIENCE",
      list: [
        {
          id: 1,
          company: "Tech Company",
          role: "Frontend Developer",
          period: "2023 — наст. время",
          description:
            "Разработка веб-приложений на React и Next.js, развитие библиотеки UI-компонентов и дизайн-системы.",
        },
        {
          id: 2,
          company: "Startup XYZ",
          role: "Junior Developer",
          period: "2021 — 2023",
          description:
            "Работа над full-stack проектами, интеграция REST API и работа с базой данных.",
        },
        {
          id: 3,
          company: "Freelance",
          role: "Web Developer",
          period: "2020 — 2021",
          description:
            "Создание landing-страниц и портфолио-сайтов для клиентов, реализация pixel-perfect дизайна.",
        },
      ],
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

export const profileMeta = {
  name: "MUHAMMADDIN XOLIQOV",
  cvUrl: "/cv.pdf",
  projectUrls: [
    "https://example.com",
    "https://example.com",
    "https://example.com",
  ],
  contactLinks: [
    {
      label: "Email",
      value: "mukha0126@gmail.com",
      href: "mailto:mukha0126@gmail.com",
      icon: "✉",
    },
    {
      label: "Phone",
      value: "+998 90 654 96 59",
      href: "tel:+998906549659",
      icon: "☏",
    },
    {
      label: "Telegram",
      value: "@mukhammad_din",
      href: "https://t.me/mukhammad_din",
      icon: "✈",
    },
    {
      label: "GitHub",
      value: "github.com/mukha2601",
      href: "https://github.com/mukha2601",
      icon: "⌘",
    },
  ],
  projectColors: [
    [
      "#ffd93d", "#6b4423", "#3d2817", "#fff8e7", "#8b6914",
      "#2a1810", "#ffd93d", "#6b4423", "#3d2817", "#fff8e7",
      "#8b6914", "#2a1810", "#ffd93d", "#6b4423", "#3d2817",
      "#fff8e7", "#8b6914", "#2a1810", "#ffd93d", "#6b4423",
    ],
    [
      "#6b4423", "#ffd93d", "#2a1810", "#8b6914", "#fff8e7",
      "#3d2817", "#6b4423", "#ffd93d", "#2a1810", "#8b6914",
      "#fff8e7", "#3d2817", "#6b4423", "#ffd93d", "#2a1810",
      "#8b6914", "#fff8e7", "#3d2817", "#6b4423", "#ffd93d",
    ],
    [
      "#3d2817", "#8b6914", "#ffd93d", "#6b4423", "#fff8e7",
      "#2a1810", "#3d2817", "#ffd93d", "#6b4423", "#8b6914",
      "#fff8e7", "#2a1810", "#3d2817", "#8b6914", "#ffd93d",
      "#6b4423", "#fff8e7", "#2a1810", "#3d2817", "#ffd93d",
    ],
  ],
};

