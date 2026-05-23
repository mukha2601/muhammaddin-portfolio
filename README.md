# Muhammaddin — Pixel Portfolio

Pixel-art uslubidagi shaxsiy portfolio sayti. **Next.js 15**, **React 19** va **TypeScript** asosida qurilgan. Saytda ko'p tilli qo'llab-quvvatlash (uz/en/ru), 4 ta rang temasi, ob-havo effektlari va fonda musiqa pleyer mavjud.

![Stack](https://img.shields.io/badge/Next.js-15-black) ![React](https://img.shields.io/badge/React-19-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)

---

## Asosiy imkoniyatlar

- **4 ta rang temasi** — Jigarrang, Qora, Binafsha, Oq (foydalanuvchi tanlaydi va `localStorage` da saqlanadi)
- **3 ta til** — O'zbekcha, Inglizcha, Ruscha
- **Ob-havo effektlari** — Yomg'ir, Kuz (barg), Qish (qor) — pixel-art zarralar
- **Musiqa pleyer** — fonda mp3 treklar bilan ishlaydi
- **JSON-asosli mazmun** — barcha ma'lumotlar `data/portfolio.json` da
- **Responsive** — telefon, planshet va kompyuterga moslashgan
- **Pixel-art dizayn** — Press Start 2P va VT323 shriftlari, scanline effekt
- **SEO-tayyor** — metadata va favicon (`app/icon.png`)

---

## Tezkor boshlash

### Talablar
- **Node.js** 18 yoki undan yuqori
- **npm** yoki **yarn**

### O'rnatish

```bash
npm install
```

### Ishga tushirish (dev mode)

```bash
npm run dev
```

So'ng brauzeringizda [http://localhost:3000](http://localhost:3000) ni oching.

### Production build

```bash
npm run build
npm start
```

---

## Loyiha tuzilmasi

```
portfolio-website/
├── app/
│   ├── api/
│   │   └── tracks/
│   │       └── route.ts          # Musiqa treklari API endpoint
│   ├── contact/page.tsx          # Aloqa sahifasi
│   ├── experience/page.tsx       # Tajriba sahifasi
│   ├── me/page.tsx               # Asosiy "Men" sahifasi
│   ├── projects/page.tsx         # Loyihalar sahifasi
│   ├── globals.css               # Global stillar va temalar
│   ├── icon.png                  # Favicon (brauzer vkladkasi)
│   ├── apple-icon.png            # iOS uchun ikonka
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # /me ga redirect
│
├── components/
│   ├── BottomNav.tsx             # Pastdagi navigatsiya
│   ├── FloatingPixels.tsx        # Suzuvchi pikselli zarralar
│   ├── LangProvider.tsx          # Til context (i18n)
│   ├── MusicPlayer.tsx           # Audio pleyer
│   ├── SideControls.tsx          # O'ng tomondagi sozlama tugmalari
│   └── WeatherEffect.tsx         # Ob-havo zarralari effekti
│
├── data/
│   └── portfolio.json            # ⭐ Barcha mazmun (profil, loyihalar, tajriba)
│
├── lib/
│   ├── i18n.ts                   # UI yorliqlari (3 tilda)
│   └── portfolio.ts              # Portfolio ma'lumotlarini o'qish (type-safe)
│
├── public/
│   ├── me.png                    # Profil rasmi
│   └── music/                    # Musiqa fayllari (mp3)
│
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Mazmunni o'zgartirish

Saytdagi barcha matnli ma'lumotlar **`data/portfolio.json`** faylida joylashgan. Kodga tegmasdan, faqat shu faylni tahrirlab, butun saytni yangilash mumkin.

### 1. Profil ma'lumotlari

```json
{
  "profile": {
    "name": "MUHAMMADDIN XOLIQOV",
    "cvUrl": "/cv.pdf",
    "photoUrl": "/me.png",
    "translations": {
      "uz": { "role": "Frontend & Mobile Developer" },
      "en": { "role": "Frontend & Mobile Developer" },
      "ru": { "role": "Frontend & Mobile Developer" }
    }
  }
}
```

### 2. Ko'nikmalar (Skills)

```json
{
  "skills": {
    "frontend": [
      { "name": "HTML", "icon": "◼" },
      { "name": "React", "icon": "⚛" }
    ],
    "mobile": [
      { "name": "Flutter", "icon": "▼" }
    ]
  }
}
```

### 3. Yangi loyiha qo'shish

`projects` massiviga yangi obyekt qo'shing:

```json
{
  "id": 4,
  "url": "https://yangiloyiham.uz",
  "colors": ["#ffd93d", "#6b4423", "#3d2817", "..."],
  "translations": {
    "uz": {
      "title": "Mening yangi loyiham",
      "description": "Loyiha tavsifi..."
    },
    "en": {
      "title": "My New Project",
      "description": "Project description..."
    },
    "ru": {
      "title": "Мой новый проект",
      "description": "Описание проекта..."
    }
  }
}
```

> `colors` massivi loyiha kartochkasida pixel-art tarzida ko'rsatiladi — 20 ta rang HEX formatida.

### 4. Tajriba qo'shish

```json
{
  "id": 4,
  "translations": {
    "uz": {
      "company": "Kompaniya nomi",
      "role": "Lavozim",
      "period": "2024 — Hozir",
      "description": "Tajriba haqida..."
    },
    "en": { "...": "..." },
    "ru": { "...": "..." }
  }
}
```

### 5. Aloqa havolalari

```json
{
  "contactLinks": [
    {
      "label": "Email",
      "value": "email@example.com",
      "href": "mailto:email@example.com",
      "icon": "✉"
    }
  ]
}
```

---

## UI matnlarini o'zgartirish

Tugma matnlari, sahifa sarlavhalari va boshqa **UI yorliqlari** `lib/i18n.ts` faylida saqlanadi. Bu fayl 3 tilda — `uz`, `en`, `ru` — tarjimalarni o'z ichiga oladi.

Masalan, "CV YUKLAB OLISH" tugmasi matnini o'zgartirish:

```typescript
me: {
  downloadCv: "CV YUKLAB OLISH ↓",
  // ...
}
```

---

## Musiqa qo'shish

1. `public/music/` papkasiga `.mp3` fayl qo'shing
2. Sayt avtomatik aniqlaydi (chunki `app/api/tracks/route.ts` papka ichidagi fayllarni o'qiydi)
3. Sahifani yangilang — yangi trek pleyer ro'yxatida ko'rinadi

---

## Tema sozlash

Mavjud temalar: `brown`, `dark`, `purple`, `light`.

Yangi tema qo'shish uchun:

1. **`app/globals.css`** ga yangi `[data-theme="..."]` blokini qo'shing:

```css
[data-theme="ocean"] {
  --bg-dark: #0a2540;
  --bg-brown: #143a5e;
  --bg-panel: #1c4a78;
  --brown-mid: #2a6ba8;
  --brown-light: #5b9bd5;
  --yellow: #66ccff;
  --yellow-dark: #3a99d4;
  --cream: #e6f3ff;
  --black: #000c1a;
}
```

2. **`components/SideControls.tsx`** da `Theme` tipi va `themeList` ga `"ocean"` qo'shing
3. **`lib/i18n.ts`** ning `themes` obyektiga 3 tilda nomini qo'shing

---

## Texnologiyalar

| Texnologiya | Versiya | Maqsadi |
|-------------|---------|---------|
| Next.js     | 15.3+   | React framework, App Router |
| React       | 19      | UI kutubxonasi |
| TypeScript  | 5.8+    | Tip xavfsizligi |
| CSS (vanilla) | -     | Stillar (CSS variables bilan tema) |
| Google Fonts | -      | Press Start 2P, VT323 |

---

## Deploy qilish

### Vercel (tavsiya etiladi)

1. [vercel.com](https://vercel.com) ga kiring va GitHub'ga ulang
2. `mukha2601/muhammaddin-portfolio` repongizni import qiling
3. Hech qanday sozlash kerak emas — avtomatik aniqlaydi
4. **Deploy** tugmasini bosing

Bir necha daqiqada sayt internetda chiqadi.

### Boshqa servislarga

```bash
npm run build
# Hosil bo'lgan .next papkasini server'ga yuklang
```

---

## Litsenziya

Shaxsiy portfolio loyihasi. Kodni o'rganish va o'z portfolioringiz uchun andoza sifatida foydalanish mumkin.

---

## Aloqa

- **GitHub**: [@mukha2601](https://github.com/mukha2601)
- **Email**: mukha0126@gmail.com
- **Telegram**: [@mukhammad_din](https://t.me/mukhammad_din)
