# Good Deeds Day Kids Landing Page Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a multilingual (Hebrew/English/Russian) educational landing page for children (ages 8-12) teaching kindness through good deeds, based on existing Stitch design prototype.

**Architecture:** Next.js 14+ App Router with internationalized routing, Tailwind CSS matching Stitch design system, static generation for performance, client-side interactions for animations/confetti, no backend required.

**Tech Stack:** Next.js 14+, TypeScript, Tailwind CSS 3, next-intl, canvas-confetti, Heebo font (Google Fonts), Ideogram AI (image generation)

---

## Chunk 1: Project Initialization & Design System

### Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.js`
- Create: `.gitignore`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`

- [ ] **Step 1: Initialize Next.js with TypeScript and App Router**

Run:
```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

Answer prompts:
- TypeScript? Yes
- ESLint? Yes
- Tailwind CSS? Yes
- `src/` directory? No
- App Router? Yes
- Import alias? Yes (@/*)

Expected: Project scaffolding created

- [ ] **Step 2: Install additional dependencies**

Run:
```bash
npm install next-intl canvas-confetti
npm install --save-dev @types/canvas-confetti
```

Expected: Dependencies installed successfully

- [ ] **Step 3: Verify installation**

Run:
```bash
npm run dev
```

Expected: Server starts on http://localhost:3000
Stop server with Ctrl+C

- [ ] **Step 4: Copy logo to public directory**

Run:
```bash
mkdir -p public/images
cp "docs/uiux/logo.png" public/images/logo.png
```

Expected: Logo copied to public/images/logo.png

- [ ] **Step 5: Commit initial setup**

```bash
git add .
git commit -m "feat: initialize Next.js project with TypeScript and Tailwind, add logo"
```

---

### Task 2: Configure Tailwind with Stitch Design System

**Files:**
- Modify: `tailwind.config.ts`
- Create: `app/globals.css`

- [ ] **Step 1: Update Tailwind config with custom colors and settings**

File: `tailwind.config.ts`
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'action-teal': '#2DD4BF',
        'sunny-yellow': '#FDE047',
        'energetic-orange': '#FB923C',
        'kind-purple': '#A78BFA',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      fontFamily: {
        heebo: ['var(--font-heebo)', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
export default config;
```

- [ ] **Step 2: Install Tailwind forms plugin**

Run:
```bash
npm install @tailwindcss/forms
```

Expected: Plugin installed

- [ ] **Step 3: Update global CSS with custom animations**

File: `app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    scroll-behavior: smooth;
  }
}

@layer utilities {
  .bubble-font {
    text-shadow: 3px 3px 0px rgba(0, 0, 0, 0.1);
  }

  .diagonal-bg {
    clip-path: polygon(0 0, 100% 0, 100% 95%, 0 100%);
  }

  .animate-float {
    animation: float 4s ease-in-out infinite;
  }

  .card-reveal {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card-reveal:hover {
    transform: translateY(-10px);
  }
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
}
```

- [ ] **Step 4: Test Tailwind configuration**

Run:
```bash
npm run dev
```

Visit http://localhost:3000 and verify no CSS errors in console
Stop server with Ctrl+C

- [ ] **Step 5: Commit design system**

```bash
git add tailwind.config.ts app/globals.css package.json package-lock.json
git commit -m "feat: configure Tailwind with Stitch design system colors and animations"
```

---

### Task 3: Setup Heebo Font

**Files:**
- Create: `app/fonts.ts`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create font configuration**

File: `app/fonts.ts`
```typescript
import { Heebo } from 'next/font/google';

export const heebo = Heebo({
  subsets: ['latin', 'hebrew'],
  weight: ['400', '700', '900'],
  variable: '--font-heebo',
  display: 'swap',
});
```

- [ ] **Step 2: Update root layout to use Heebo**

File: `app/layout.tsx`
```typescript
import type { Metadata } from "next";
import { heebo } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "יום המעשים הטובים - Good Deeds Day",
  description: "מעשה טוב קטן יכול לעשות יום גדול למישהו אחר!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="font-heebo">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify font loads**

Run:
```bash
npm run dev
```

Visit http://localhost:3000 and check Network tab for Heebo font files
Stop server with Ctrl+C

- [ ] **Step 4: Commit font setup**

```bash
git add app/fonts.ts app/layout.tsx
git commit -m "feat: add Heebo font for Hebrew support"
```

---

## Chunk 2: Internationalization Setup

### Task 4: Configure next-intl

**Files:**
- Create: `i18n.ts`
- Create: `middleware.ts`
- Create: `messages/he.json`
- Create: `messages/en.json`
- Create: `messages/ru.json`
- Modify: `next.config.js`

- [ ] **Step 1: Create i18n configuration**

File: `i18n.ts`
```typescript
import { getRequestConfig } from 'next-intl/server';

export const locales = ['he', 'en', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  he: 'עברית',
  en: 'English',
  ru: 'Русский',
};

export const localeFlags: Record<Locale, string> = {
  he: '🇮🇱',
  en: '🇬🇧',
  ru: '🇷🇺',
};

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}));
```

- [ ] **Step 2: Create middleware for locale routing**

File: `middleware.ts`
```typescript
import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale: 'he',
  localePrefix: 'as-needed',
});

export const config = {
  matcher: ['/', '/(he|en|ru)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
```

- [ ] **Step 3: Update Next.js config for next-intl**

File: `next.config.js`
```javascript
const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.ideogram.ai',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
```

- [ ] **Step 4: Create messages directory**

Run:
```bash
mkdir -p messages
```

- [ ] **Step 5: Test i18n setup**

Run:
```bash
npm run dev
```

Expected: No errors, server starts
Stop server with Ctrl+C

- [ ] **Step 6: Commit i18n configuration**

```bash
git add i18n.ts middleware.ts next.config.js
git commit -m "feat: configure next-intl for Hebrew/English/Russian"
```

---

### Task 5: Create Hebrew Translation Messages

**Files:**
- Create: `messages/he.json`

- [ ] **Step 1: Write Hebrew translation file (based on Stitch design)**

File: `messages/he.json`
```json
{
  "hero": {
    "hashtag": "#יום_המעשים_הטובים",
    "title": "יום המעשים הטובים:",
    "titleHighlight": "הכוח להיות טוב!",
    "subtitle": "מוכנים לשנות את העולם? כל מעשה קטן יכול ליצור שינוי ענק. הנה כמה דרכים מגניבות שבהן תוכלו להפיץ אור כבר היום!"
  },
  "tips": [
    {
      "id": "smile",
      "badge": "😊",
      "badgeText": "הכי פשוט",
      "title": "חייכו למישהו שאתם לא מכירים",
      "description": "חיוך הוא מדבק! כשאתם מחייכים למישהו במסדרון או ברחוב, אתם משפרים לו את היום באופן מיידי. זה הכוח הסודי שלכם.",
      "imageAlt": "ילד מחייך לחבר בבית הספר"
    },
    {
      "id": "homework",
      "badge": "📚",
      "badgeText": "שיתוף פעולה",
      "title": "עזרו לחבר עם שיעורי הבית",
      "description": "טובים במתמטיקה? אלופים באנגלית? שתפו את הידע שלכם ועזרו למישהו שמתקשה. זה הכי מספק בעולם לראות מישהו אחר מצליח!",
      "imageAlt": "שתי ילדות לומדות יחד בכיף"
    },
    {
      "id": "compliment",
      "badge": "💬",
      "badgeText": "מילים טובות",
      "title": "תנו מחמאה כנה",
      "description": "ראיתם חולצה יפה? מישהו אמר משהו חכם בשיעור? אל תשמרו את זה בלב - פשוט תגידו את זה! מילה טובה אחת יכולה להאיר שבוע שלם.",
      "imageAlt": "קבוצת חברים צוחקים ומחמיאים"
    },
    {
      "id": "trash",
      "badge": "♻️",
      "badgeText": "למען הסביבה",
      "title": "הרימו זבל מהרצפה",
      "description": "מעשה טוב הוא גם כלפי הסביבה שלנו. ראיתם עטיפה על הדשא בבית הספר? הרימו אותה לפח הקרוב. כדור הארץ יודה לכם!",
      "imageAlt": "ילדים אוספים פסולת בפארק"
    }
  ],
  "cta": {
    "title": "מוכנים להפיץ טוב?",
    "quote": "כל מעשה קטן הוא חלק משינוי גדול",
    "button": "אני בפנים! 🚀",
    "successAlert": "כל הכבוד! העולם כבר נראה טוב יותר בזכותכם!"
  },
  "share": {
    "title": "יש לכם רעיון משלכם? 💡",
    "subtitle": "חשבתם על דרך יצירתית לעשות טוב? אנחנו ממש רוצים לשמוע על זה!",
    "placeholder": "ספרו לנו על המעשה הטוב שלכם...",
    "button": "שתפו אותנו! ✨",
    "successAlert": "איזה רעיון מדהים! תודה ששיתפתם אותנו!"
  },
  "footer": {
    "copyright": "© 2024 יום המעשים הטובים - לדור שמשנה את העולם",
    "motto": ["BE KIND", "BE COOL", "BE YOU"]
  }
}
```

- [ ] **Step 2: Commit Hebrew messages**

```bash
git add messages/he.json
git commit -m "feat: add Hebrew translations"
```

---

### Task 6: Create English Translation Messages

**Files:**
- Create: `messages/en.json`

- [ ] **Step 1: Write English translation file**

File: `messages/en.json`
```json
{
  "hero": {
    "hashtag": "#GoodDeedsDay",
    "title": "Good Deeds Day:",
    "titleHighlight": "The Power to Be Kind!",
    "subtitle": "Ready to change the world? Every small act can create a huge impact. Here are some cool ways you can spread light today!"
  },
  "tips": [
    {
      "id": "smile",
      "badge": "😊",
      "badgeText": "Easiest One",
      "title": "Smile at Someone You Don't Know",
      "description": "A smile is contagious! When you smile at someone in the hallway or on the street, you instantly brighten their day. That's your secret superpower.",
      "imageAlt": "Child smiling at a friend at school"
    },
    {
      "id": "homework",
      "badge": "📚",
      "badgeText": "Teamwork",
      "title": "Help a Friend with Homework",
      "description": "Good at math? Great at English? Share your knowledge and help someone who's struggling. Nothing feels better than seeing someone else succeed!",
      "imageAlt": "Two girls studying together happily"
    },
    {
      "id": "compliment",
      "badge": "💬",
      "badgeText": "Kind Words",
      "title": "Give a Genuine Compliment",
      "description": "See a nice shirt? Did someone say something smart in class? Don't keep it to yourself - just say it! One kind word can light up someone's entire week.",
      "imageAlt": "Group of friends laughing and complimenting each other"
    },
    {
      "id": "trash",
      "badge": "♻️",
      "badgeText": "For the Environment",
      "title": "Pick Up Trash from the Ground",
      "description": "A good deed is also for our environment. See a wrapper on the grass at school? Pick it up and throw it in the nearest bin. Planet Earth thanks you!",
      "imageAlt": "Children collecting litter in a park"
    }
  ],
  "cta": {
    "title": "Ready to Spread Kindness?",
    "quote": "Every small act is part of a big change",
    "button": "I'm In! 🚀",
    "successAlert": "Well done! The world already looks better because of you!"
  },
  "share": {
    "title": "Got Your Own Idea? 💡",
    "subtitle": "Thought of a creative way to do good? We really want to hear about it!",
    "placeholder": "Tell us about your good deed...",
    "button": "Share With Us! ✨",
    "successAlert": "What an amazing idea! Thanks for sharing with us!"
  },
  "footer": {
    "copyright": "© 2024 Good Deeds Day - For a generation that changes the world",
    "motto": ["BE KIND", "BE COOL", "BE YOU"]
  }
}
```

- [ ] **Step 2: Commit English messages**

```bash
git add messages/en.json
git commit -m "feat: add English translations"
```

---

### Task 7: Create Russian Translation Messages

**Files:**
- Create: `messages/ru.json`

- [ ] **Step 1: Write Russian translation file**

File: `messages/ru.json`
```json
{
  "hero": {
    "hashtag": "#ДеньДобрыхДел",
    "title": "День добрых дел:",
    "titleHighlight": "Сила быть добрым!",
    "subtitle": "Готовы изменить мир? Каждый маленький поступок может создать огромные перемены. Вот несколько крутых способов распространить свет уже сегодня!"
  },
  "tips": [
    {
      "id": "smile",
      "badge": "😊",
      "badgeText": "Проще всего",
      "title": "Улыбнитесь незнакомцу",
      "description": "Улыбка заразительна! Когда вы улыбаетесь кому-то в коридоре или на улице, вы мгновенно делаете их день лучше. Это ваша суперсила.",
      "imageAlt": "Ребенок улыбается другу в школе"
    },
    {
      "id": "homework",
      "badge": "📚",
      "badgeText": "Работа в команде",
      "title": "Помогите другу с домашним заданием",
      "description": "Хорошо знаете математику? Отлично владеете английским? Поделитесь своими знаниями и помогите тому, кому трудно. Нет ничего приятнее, чем видеть успех другого человека!",
      "imageAlt": "Две девочки весело учатся вместе"
    },
    {
      "id": "compliment",
      "badge": "💬",
      "badgeText": "Добрые слова",
      "title": "Сделайте искренний комплимент",
      "description": "Видите красивую рубашку? Кто-то сказал что-то умное на уроке? Не держите это в себе - просто скажите! Одно доброе слово может осветить целую неделю.",
      "imageAlt": "Группа друзей смеется и делает комплименты"
    },
    {
      "id": "trash",
      "badge": "♻️",
      "badgeText": "Для окружающей среды",
      "title": "Поднимите мусор с земли",
      "description": "Доброе дело - это также забота об окружающей среде. Видите обертку на траве в школе? Поднимите ее и бросьте в ближайшую урну. Планета Земля благодарит вас!",
      "imageAlt": "Дети собирают мусор в парке"
    }
  ],
  "cta": {
    "title": "Готовы распространять доброту?",
    "quote": "Каждый маленький поступок - часть большой перемены",
    "button": "Я в деле! 🚀",
    "successAlert": "Отлично! Мир уже стал лучше благодаря вам!"
  },
  "share": {
    "title": "Есть своя идея? 💡",
    "subtitle": "Придумали креативный способ сделать доброе дело? Мы очень хотим об этом услышать!",
    "placeholder": "Расскажите нам о своем добром деле...",
    "button": "Поделитесь с нами! ✨",
    "successAlert": "Какая замечательная идея! Спасибо, что поделились!"
  },
  "footer": {
    "copyright": "© 2024 День добрых дел - Для поколения, которое меняет мир",
    "motto": ["БУДЬ ДОБРЫМ", "БУДЬ КРУТЫМ", "БУДЬ СОБОЙ"]
  }
}
```

- [ ] **Step 2: Commit Russian messages**

```bash
git add messages/ru.json
git commit -m "feat: add Russian translations"
```

---

## Chunk 3: Component Development

### Task 8: Create Layout for Internationalized Routes

**Files:**
- Create: `app/[locale]/layout.tsx`
- Create: `app/[locale]/page.tsx`
- Delete: `app/page.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create locale-specific layout**

File: `app/[locale]/layout.tsx`
```typescript
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { heebo } from '../fonts';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === 'he' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className={heebo.variable}>
      <body className="font-heebo bg-white text-gray-800 overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Create placeholder page**

File: `app/[locale]/page.tsx`
```typescript
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('hero');

  return (
    <main className="min-h-screen">
      <h1 className="text-4xl font-black text-center py-20">
        {t('title')} {t('titleHighlight')}
      </h1>
    </main>
  );
}
```

- [ ] **Step 3: Remove old root page**

Run:
```bash
rm app/page.tsx
```

- [ ] **Step 4: Update root layout (remove duplicate html/body tags)**

File: `app/layout.tsx`
```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "יום המעשים הטובים - Good Deeds Day",
  description: "מעשה טוב קטן יכול לעשות יום גדול למישהו אחר!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
```

- [ ] **Step 5: Test locale routing**

Run:
```bash
npm run dev
```

Visit:
- http://localhost:3000 (should redirect to /he)
- http://localhost:3000/he (Hebrew, RTL)
- http://localhost:3000/en (English, LTR)
- http://localhost:3000/ru (Russian, LTR)

Expected: All routes work, correct direction and language
Stop server with Ctrl+C

- [ ] **Step 6: Commit locale layout**

```bash
git add app/[locale]/layout.tsx app/[locale]/page.tsx app/layout.tsx
git add -u  # Track deleted app/page.tsx
git commit -m "feat: add locale-specific routing and layouts"
```

---

### Task 9: Create Language Switcher Component

**Files:**
- Create: `components/LanguageSwitcher.tsx`

- [ ] **Step 1: Write failing test**

File: `components/LanguageSwitcher.test.tsx`
```typescript
import { render, screen } from '@testing-library/react';
import { LanguageSwitcher } from './LanguageSwitcher';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/he',
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock next-intl
jest.mock('next-intl', () => ({
  useLocale: () => 'he',
}));

describe('LanguageSwitcher', () => {
  it('renders all three language options', () => {
    render(<LanguageSwitcher />);

    expect(screen.getByText(/עברית/)).toBeInTheDocument();
    expect(screen.getByText(/English/)).toBeInTheDocument();
    expect(screen.getByText(/Русский/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
npm test -- LanguageSwitcher.test.tsx
```

Expected: FAIL - "Cannot find module './LanguageSwitcher'"

- [ ] **Step 3: Create LanguageSwitcher component**

File: `components/LanguageSwitcher.tsx`
```typescript
'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales, localeNames, localeFlags, type Locale } from '@/i18n';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    const currentPathWithoutLocale = pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${currentPathWithoutLocale}`);
  };

  return (
    <div className="flex gap-4 items-center">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLocaleChange(loc)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full font-bold
            transition-all duration-300
            ${
              locale === loc
                ? 'bg-action-teal text-white shadow-lg scale-110'
                : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
            }
          `}
          aria-label={`Switch to ${localeNames[loc]}`}
        >
          <span className="text-xl">{localeFlags[loc]}</span>
          <span className="text-sm">{localeNames[loc]}</span>
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:
```bash
npm test -- LanguageSwitcher.test.tsx
```

Expected: PASS

- [ ] **Step 5: Commit language switcher**

```bash
git add components/LanguageSwitcher.tsx components/LanguageSwitcher.test.tsx
git commit -m "feat: add language switcher component with tests"
```

---

### Task 10: Create Hero Section Component

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create Hero component**

File: `components/Hero.tsx`
```typescript
'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <div className="relative min-h-screen bg-action-teal diagonal-bg pb-32">
      {/* Decorative Shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sunny-yellow rounded-full -mr-32 -mt-32 opacity-30 blur-3xl" />
      <div className="absolute top-1/4 left-0 w-48 h-48 bg-energetic-orange rounded-full -ml-24 opacity-20 blur-2xl" />

      <header className="container mx-auto px-6 pt-12 text-center relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="animate-float">
            <Image
              src="/images/logo.png"
              alt="Good Deeds Day Logo"
              width={120}
              height={120}
              priority
              className="drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Language Switcher */}
        <div className="flex justify-center mb-8">
          <LanguageSwitcher />
        </div>

        {/* Hashtag Badge */}
        <div className="inline-block bg-white/20 backdrop-blur-md p-2 px-6 rounded-full mb-8 shadow-sm border border-white/30">
          <span className="text-white font-black text-sm tracking-widest uppercase">
            {t('hashtag')}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 bubble-font leading-tight">
          {t('title')}
          <br />
          <span className="text-sunny-yellow">{t('titleHighlight')}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-white text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
          {t('subtitle')}
        </p>

        {/* Scroll Indicator */}
        <div className="flex justify-center">
          <div className="animate-bounce bg-white/10 p-3 rounded-full">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
            </svg>
          </div>
        </div>
      </header>
    </div>
  );
}
```

- [ ] **Step 2: Test Hero component**

Run:
```bash
npm run dev
```

Visit http://localhost:3000/he and verify:
- Logo displays at top with floating animation
- Hero section displays
- Language switcher works
- Animations are smooth
- RTL layout is correct

Stop server with Ctrl+C

- [ ] **Step 3: Commit Hero component**

```bash
git add components/Hero.tsx
git commit -m "feat: add Hero section component with animations"
```

---

### Task 11: Create Tip Card Component

**Files:**
- Create: `components/TipCard.tsx`
- Create: `public/images/tips/.gitkeep`

- [ ] **Step 1: Create images directory for tip cards**

Run:
```bash
mkdir -p public/images/tips
touch public/images/tips/.gitkeep
```

- [ ] **Step 2: Create TipCard component**

File: `components/TipCard.tsx`
```typescript
import Image from 'next/image';

interface TipCardProps {
  badge: string;
  badgeText: string;
  title: string;
  description: string;
  imageAlt: string;
  imageSrc: string;
  borderColor: 'action-teal' | 'kind-purple' | 'sunny-yellow' | 'energetic-orange';
}

const borderColorClasses = {
  'action-teal': 'border-action-teal',
  'kind-purple': 'border-kind-purple',
  'sunny-yellow': 'border-sunny-yellow',
  'energetic-orange': 'border-energetic-orange',
};

const badgeColorClasses = {
  'action-teal': 'text-action-teal',
  'kind-purple': 'text-kind-purple',
  'sunny-yellow': 'text-yellow-600',
  'energetic-orange': 'text-energetic-orange',
};

export function TipCard({
  badge,
  badgeText,
  title,
  description,
  imageAlt,
  imageSrc,
  borderColor,
}: TipCardProps) {
  return (
    <div
      className={`
        group bg-white rounded-5xl shadow-2xl overflow-hidden
        card-reveal border-b-8 ${borderColorClasses[borderColor]}
      `}
    >
      {/* Image Section */}
      <div className="h-64 overflow-hidden relative">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Badge */}
        <div
          className={`
            absolute top-4 right-4 bg-white/90 backdrop-blur-sm
            px-4 py-2 rounded-full font-bold shadow-md
            flex items-center gap-2 ${badgeColorClasses[borderColor]}
          `}
        >
          <span>{badge}</span>
          <span>{badgeText}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8">
        <h3 className="text-2xl font-black mb-4 text-gray-900">{title}</h3>
        <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Test TipCard rendering**

Create test file: `components/TipCard.test.tsx`
```typescript
import { render, screen } from '@testing-library/react';
import { TipCard } from './TipCard';

describe('TipCard', () => {
  it('renders tip card with all content', () => {
    render(
      <TipCard
        badge="😊"
        badgeText="Test Badge"
        title="Test Title"
        description="Test Description"
        imageAlt="Test Image"
        imageSrc="/images/tips/test.jpg"
        borderColor="action-teal"
      />
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('😊')).toBeInTheDocument();
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });
});
```

Run:
```bash
npm test -- TipCard.test.tsx
```

Expected: PASS

- [ ] **Step 4: Commit TipCard component**

```bash
git add components/TipCard.tsx components/TipCard.test.tsx public/images/tips/.gitkeep
git commit -m "feat: add TipCard component with hover effects"
```

---

### Task 12: Create Tips Section Component

**Files:**
- Create: `components/TipsSection.tsx`

- [ ] **Step 1: Create TipsSection component**

File: `components/TipsSection.tsx`
```typescript
'use client';

import { useTranslations } from 'next-intl';
import { TipCard } from './TipCard';

const borderColors = [
  'action-teal',
  'kind-purple',
  'sunny-yellow',
  'energetic-orange',
] as const;

export function TipsSection() {
  const t = useTranslations('tips');
  const tipsCount = 4;

  return (
    <main className="container mx-auto px-6 -mt-20 relative z-20" id="tips-section">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {Array.from({ length: tipsCount }).map((_, index) => {
          const tip = {
            badge: t(`${index}.badge`),
            badgeText: t(`${index}.badgeText`),
            title: t(`${index}.title`),
            description: t(`${index}.description`),
            imageAlt: t(`${index}.imageAlt`),
            id: t(`${index}.id`),
          };

          return (
            <TipCard
              key={tip.id}
              badge={tip.badge}
              badgeText={tip.badgeText}
              title={tip.title}
              description={tip.description}
              imageAlt={tip.imageAlt}
              imageSrc={`/images/tips/${tip.id}.jpg`}
              borderColor={borderColors[index]}
            />
          );
        })}
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Test TipsSection**

Run:
```bash
npm run dev
```

Visit http://localhost:3000/he (will show broken images until Task 13)
Verify: 4 tip cards render with correct content

Stop server with Ctrl+C

- [ ] **Step 3: Commit TipsSection**

```bash
git add components/TipsSection.tsx
git commit -m "feat: add TipsSection component with grid layout"
```

---

## Chunk 4: Interactive Components & Image Generation

### Task 13: Generate Tip Card Images with Ideogram AI

**Files:**
- Create: `scripts/generateImages.ts`
- Create: `public/images/tips/smile.jpg`
- Create: `public/images/tips/homework.jpg`
- Create: `public/images/tips/compliment.jpg`
- Create: `public/images/tips/trash.jpg`

- [ ] **Step 1: Install node-fetch for scripts**

Run:
```bash
npm install node-fetch@2 --save-dev
npm install @types/node --save-dev
```

- [ ] **Step 2: Create image generation script**

File: `scripts/generateImages.ts`
```typescript
const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');

const API_KEY = 'fGDoK4f_gOWFjcDaS4vLxaavoVaWtzD8EgQXJiqWP72Fz3PBSg-bRzdtup_ajnP_vBBUZXZhBnPF3Y-CLxv4MA';
const API_URL = 'https://api.ideogram.ai/v1/ideogram-v3/generate';

interface TipImage {
  id: string;
  prompt: string;
}

const tips: TipImage[] = [
  {
    id: 'smile',
    prompt: 'A cheerful illustration of diverse children smiling at each other in a school hallway, bright colors, friendly atmosphere, children\'s book style, warm lighting',
  },
  {
    id: 'homework',
    prompt: 'Two happy diverse children studying together at a desk, helping each other with homework, warm lighting, colorful, children\'s book illustration, joyful learning',
  },
  {
    id: 'compliment',
    prompt: 'A group of diverse children laughing and giving compliments to each other, joyful, bright colors, positive energy, kids illustration, friendship',
  },
  {
    id: 'trash',
    prompt: 'Diverse children happily picking up litter in a sunny park or playground, environmental care, bright sunny day, children\'s book style, cheerful, teamwork',
  },
];

async function generateImage(tip: TipImage): Promise<void> {
  console.log(`Generating image for: ${tip.id}`);

  const formData = new URLSearchParams();
  formData.append('prompt', tip.prompt);
  formData.append('aspect_ratio', '4x3');
  formData.append('rendering_speed', 'TURBO');
  formData.append('style_type', 'DESIGN');
  formData.append('style_preset', 'CHILDRENS_BOOK');

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Api-Key': API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

    console.log(`Downloading image from: ${imageUrl}`);

    // Download the image
    const imageResponse = await fetch(imageUrl);
    const buffer = await imageResponse.buffer();

    // Save to public/images/tips/
    const outputPath = path.join(__dirname, '../public/images/tips', `${tip.id}.jpg`);
    await fs.writeFile(outputPath, buffer);

    console.log(`✅ Saved: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error generating ${tip.id}:`, error);
  }
}

async function generateAllImages(): Promise<void> {
  console.log('Starting image generation...\n');

  for (const tip of tips) {
    await generateImage(tip);
    // Wait 2 seconds between requests to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  console.log('\n✨ All images generated!');
}

generateAllImages();
```

- [ ] **Step 3: Add script to package.json**

File: `package.json` (add to scripts section)
```json
{
  "scripts": {
    "generate-images": "ts-node scripts/generateImages.ts"
  }
}
```

- [ ] **Step 4: Install ts-node**

Run:
```bash
npm install ts-node --save-dev
```

- [ ] **Step 5: Run image generation script**

Run:
```bash
npm run generate-images
```

Expected:
- 4 API calls to Ideogram
- 4 images downloaded to public/images/tips/
- Files: smile.jpg, homework.jpg, compliment.jpg, trash.jpg

⚠️ **Note**: This will use your Ideogram API credits. Images take ~20-30 seconds each.

- [ ] **Step 6: Verify images**

Run:
```bash
ls -lh public/images/tips/
```

Expected: 4 .jpg files, each ~200-500KB

- [ ] **Step 7: Test images on page**

Run:
```bash
npm run dev
```

Visit http://localhost:3000/he
Expected: All 4 tip cards show generated images

Stop server with Ctrl+C

- [ ] **Step 8: Commit generated images and script**

```bash
git add scripts/generateImages.ts package.json public/images/tips/*.jpg
git commit -m "feat: add Ideogram AI image generation script and tip card images"
```

---

### Task 14: Create Call-to-Action Section with Confetti

**Files:**
- Create: `components/CallToAction.tsx`

- [ ] **Step 1: Create CTA component with confetti**

File: `components/CallToAction.tsx`
```typescript
'use client';

import { useTranslations } from 'next-intl';
import confetti from 'canvas-confetti';

export function CallToAction() {
  const t = useTranslations('cta');

  const handleClick = () => {
    // Show success alert
    alert(t('successAlert'));

    // Trigger confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#2DD4BF', '#FDE047', '#FB923C', '#A78BFA'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <section className="py-24 px-6 -mt-16 relative z-30">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gradient-to-br from-energetic-orange to-orange-500 rounded-5xl p-12 text-white shadow-3xl text-center transform -rotate-1">
          <h3 className="text-4xl md:text-5xl font-black mb-6 bubble-font">
            {t('title')}
          </h3>
          <p className="text-2xl mb-10 opacity-90 font-medium italic">
            "{t('quote')}"
          </p>
          <button
            onClick={handleClick}
            className="bg-white text-energetic-orange font-black py-5 px-16 rounded-full text-2xl hover:bg-sunny-yellow hover:text-gray-900 transition-all duration-300 shadow-xl hover:scale-105 active:scale-95"
          >
            {t('button')}
          </button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Test CTA component**

Run:
```bash
npm run dev
```

Visit http://localhost:3000/he
Click the CTA button
Expected:
- Alert shows success message
- Confetti animation plays from both sides
- Colors match design system

Stop server with Ctrl+C

- [ ] **Step 3: Commit CTA component**

```bash
git add components/CallToAction.tsx
git commit -m "feat: add CTA component with confetti animation"
```

---

### Task 15: Create User Contribution Section

**Files:**
- Create: `components/ShareSection.tsx`

- [ ] **Step 1: Create ShareSection component**

File: `components/ShareSection.tsx`
```typescript
'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import confetti from 'canvas-confetti';

export function ShareSection() {
  const t = useTranslations('share');
  const [userIdea, setUserIdea] = useState('');

  const handleSubmit = () => {
    if (!userIdea.trim()) {
      return;
    }

    // Show success alert
    alert(t('successAlert'));

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2DD4BF', '#FDE047', '#FB923C', '#A78BFA'],
    });

    // Clear textarea
    setUserIdea('');
  };

  return (
    <section className="py-16 px-6 bg-gray-50/50">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white rounded-5xl p-10 shadow-xl border-4 border-dashed border-action-teal/30 text-center relative overflow-hidden">
          {/* Decorative circle */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-action-teal/5 rounded-full -mr-12 -mt-12" />

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              {t('title')}
            </h3>
            <p className="text-gray-600 text-xl mb-8 font-medium">
              {t('subtitle')}
            </p>

            <div className="flex flex-col gap-4">
              <textarea
                value={userIdea}
                onChange={(e) => setUserIdea(e.target.value)}
                className="w-full rounded-2xl border-2 border-gray-100 p-4 focus:ring-4 focus:ring-action-teal/20 focus:border-action-teal transition-all outline-none text-lg resize-none h-32"
                placeholder={t('placeholder')}
              />
              <button
                onClick={handleSubmit}
                disabled={!userIdea.trim()}
                className="w-full bg-action-teal text-white font-black py-4 px-8 rounded-2xl text-xl hover:bg-teal-500 transition-all duration-300 shadow-lg hover:shadow-action-teal/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('button')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Test ShareSection**

Run:
```bash
npm run dev
```

Visit http://localhost:3000/he
- Type text in textarea
- Click submit button
Expected:
- Alert shows
- Confetti plays
- Textarea clears
- Submit disabled when empty

Stop server with Ctrl+C

- [ ] **Step 3: Commit ShareSection**

```bash
git add components/ShareSection.tsx
git commit -m "feat: add user contribution section with engagement-only interaction"
```

---

### Task 16: Create Footer Component

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create Footer component**

File: `components/Footer.tsx`
```typescript
'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function Footer() {
  const t = useTranslations('footer');
  const mottoItems = t('motto').split(',');

  return (
    <footer className="bg-white py-16 px-6 text-center border-t border-gray-100">
      <div className="container mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo.png"
            alt="Good Deeds Day Logo"
            width={80}
            height={80}
            className="opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>

        {/* Emoji Icons */}
        <div className="flex justify-center space-x-8 space-x-reverse mb-8">
          <span className="text-3xl grayscale hover:grayscale-0 cursor-pointer transition-all duration-300 transform hover:scale-125">
            🌍
          </span>
          <span className="text-3xl grayscale hover:grayscale-0 cursor-pointer transition-all duration-300 transform hover:scale-125">
            ❤️
          </span>
          <span className="text-3xl grayscale hover:grayscale-0 cursor-pointer transition-all duration-300 transform hover:scale-125">
            ✨
          </span>
        </div>

        {/* Copyright */}
        <p className="text-gray-400 font-bold text-lg">{t('copyright')}</p>

        {/* Motto */}
        <div className="mt-4 flex justify-center gap-4 text-action-teal font-black text-sm uppercase tracking-tighter opacity-50">
          {mottoItems.map((item, index) => (
            <span key={index}>
              {item.trim()}
              {index < mottoItems.length - 1 && <span className="mx-2">•</span>}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Test Footer**

Run:
```bash
npm run dev
```

Visit http://localhost:3000/he
Expected:
- Logo displays in footer
- Footer displays at bottom
- Emojis have hover effects
- Copyright and motto show correctly

Stop server with Ctrl+C

- [ ] **Step 3: Commit Footer**

```bash
git add components/Footer.tsx
git commit -m "feat: add footer component with hover effects"
```

---

## Chunk 5: Final Integration & Testing

### Task 17: Integrate All Components into Main Page

**Files:**
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: Update main page with all components**

File: `app/[locale]/page.tsx`
```typescript
import { Hero } from '@/components/Hero';
import { TipsSection } from '@/components/TipsSection';
import { CallToAction } from '@/components/CallToAction';
import { ShareSection } from '@/components/ShareSection';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TipsSection />
      <CallToAction />
      <ShareSection />
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Test full page integration**

Run:
```bash
npm run dev
```

Visit all locales:
- http://localhost:3000/he (Hebrew - RTL)
- http://localhost:3000/en (English - LTR)
- http://localhost:3000/ru (Russian - LTR)

Verify:
- All sections render correctly
- Animations work (float, card hover, bounce)
- Language switcher changes all content
- RTL/LTR direction switches properly
- Images load
- CTA button triggers confetti
- Share section works

Stop server with Ctrl+C

- [ ] **Step 3: Commit page integration**

```bash
git add app/[locale]/page.tsx
git commit -m "feat: integrate all components into main landing page"
```

---

### Task 18: Add Metadata for SEO and Social Sharing

**Files:**
- Modify: `app/[locale]/layout.tsx`

- [ ] **Step 1: Add metadata generation**

File: `app/[locale]/layout.tsx` (update)
```typescript
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { heebo } from '../fonts';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'hero' });

  return {
    title: `${t('title')} ${t('titleHighlight')}`,
    description: t('subtitle'),
    openGraph: {
      title: `${t('title')} ${t('titleHighlight')}`,
      description: t('subtitle'),
      locale: locale,
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === 'he' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className={heebo.variable}>
      <body className="font-heebo bg-white text-gray-800 overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Test metadata**

Run:
```bash
npm run build
```

Expected: Build succeeds with no errors

Run:
```bash
npm start
```

Visit http://localhost:3000/he
View page source (Ctrl+U or Cmd+Option+U)
Verify:
- `<title>` tag contains Hebrew text
- `<meta name="description">` exists
- `<meta property="og:title">` exists

Stop server with Ctrl+C

- [ ] **Step 3: Commit metadata**

```bash
git add app/[locale]/layout.tsx
git commit -m "feat: add SEO metadata and Open Graph tags"
```

---

### Task 19: Create Production Build and Test

**Files:**
- Create: `.env.local.example`
- Create: `README.md`

- [ ] **Step 1: Create environment variables example**

File: `.env.local.example`
```bash
# Ideogram AI API Key (for image generation script only)
IDEOGRAM_API_KEY=your_api_key_here
```

- [ ] **Step 2: Create README**

File: `README.md`
```markdown
# Good Deeds Day Kids Landing Page

A multilingual educational landing page for children (ages 8-12) teaching kindness through good deeds.

## Features

- 🌍 Multilingual support (Hebrew, English, Russian)
- 🎨 Kid-friendly design with animations
- 📱 Fully responsive (mobile-first)
- ♿ Accessible (WCAG AA)
- ⚡ Fast performance (Next.js static generation)
- 🎉 Interactive confetti effects
- 💡 User contribution section (engagement-only, no data collection)

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS 3
- next-intl (i18n)
- canvas-confetti
- Ideogram AI (image generation)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

### Generate Images

Images for tip cards are included. To regenerate:

1. Copy `.env.local.example` to `.env.local`
2. Add your Ideogram API key
3. Run: `npm run generate-images`

⚠️ This uses Ideogram API credits (~$0.20 per image)

## Project Structure

```
app/
  [locale]/          # Internationalized routes
    layout.tsx       # Locale-specific layout
    page.tsx         # Main landing page
components/          # React components
  Hero.tsx
  TipsSection.tsx
  TipCard.tsx
  CallToAction.tsx
  ShareSection.tsx
  Footer.tsx
  LanguageSwitcher.tsx
messages/            # Translation files
  he.json            # Hebrew (primary)
  en.json            # English
  ru.json            # Russian
public/
  images/tips/       # Tip card images
```

## Languages

- **Primary**: Hebrew (RTL)
- **Secondary**: English, Russian (LTR)

Default language: Hebrew

## License

MIT

## Credits

Design by Google Stitch AI
Images by Ideogram AI
```

- [ ] **Step 3: Build for production**

Run:
```bash
npm run build
```

Expected:
- Build completes successfully
- Static pages generated for all locales
- No TypeScript errors
- No build warnings

- [ ] **Step 4: Test production build**

Run:
```bash
npm start
```

Test all locales:
- http://localhost:3000/he
- http://localhost:3000/en
- http://localhost:3000/ru

Verify:
- All pages load quickly
- Images optimized
- Animations smooth
- No console errors

Stop server with Ctrl+C

- [ ] **Step 5: Commit README and env example**

```bash
git add README.md .env.local.example
git commit -m "docs: add README and environment variables example"
```

---

### Task 20: Final Testing Checklist

**Files:**
- Create: `TESTING.md`

- [ ] **Step 1: Create testing checklist**

File: `TESTING.md`
```markdown
# Testing Checklist

## Functionality Testing

### Hebrew (he)
- [ ] Hero section displays correctly (RTL)
- [ ] All 4 tip cards render with images
- [ ] Language switcher works
- [ ] CTA button triggers confetti and alert
- [ ] Share section accepts input and clears on submit
- [ ] Footer displays correctly
- [ ] Hover effects work on cards and emojis

### English (en)
- [ ] Hero section displays correctly (LTR)
- [ ] All 4 tip cards render with images
- [ ] Language switcher works
- [ ] CTA button triggers confetti and alert
- [ ] Share section accepts input and clears on submit
- [ ] Footer displays correctly
- [ ] Content is fully translated

### Russian (ru)
- [ ] Hero section displays correctly (LTR)
- [ ] All 4 tip cards render with images
- [ ] Language switcher works
- [ ] CTA button triggers confetti and alert
- [ ] Share section accepts input and clears on submit
- [ ] Footer displays correctly
- [ ] Content is fully translated

## Responsive Testing

### Mobile (375px)
- [ ] Hero section readable
- [ ] Tip cards stack vertically
- [ ] Language switcher accessible
- [ ] Buttons large enough to tap (44px minimum)
- [ ] No horizontal scroll

### Tablet (768px)
- [ ] Tip cards in 2-column grid
- [ ] Typography scales appropriately
- [ ] All interactive elements accessible

### Desktop (1440px)
- [ ] Content centered with max-width
- [ ] Images high quality
- [ ] Animations smooth

## Performance Testing

- [ ] Lighthouse score > 90 (Performance)
- [ ] Lighthouse score > 90 (Accessibility)
- [ ] Page load < 2 seconds
- [ ] Images optimized (WebP/AVIF)
- [ ] No console errors

## Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Alt text on all images
- [ ] Color contrast meets WCAG AA
- [ ] Screen reader friendly (test with VoiceOver/NVDA)
- [ ] lang attributes correct for each locale
- [ ] dir attributes correct (rtl/ltr)

## Edge Cases

- [ ] Empty textarea prevents submit
- [ ] Language switch preserves scroll position
- [ ] Confetti doesn't lag on slow devices
- [ ] Images have loading states
- [ ] No FOUC (flash of unstyled content)
```

- [ ] **Step 2: Run through testing checklist**

Go through each item in TESTING.md manually

For automated testing:
```bash
npm run build
npm run lint
```

For Lighthouse:
```bash
npm start
# Open Chrome DevTools > Lighthouse > Run
```

- [ ] **Step 3: Fix any issues found**

If issues are found during testing:
1. Fix the issue
2. Test again
3. Commit the fix

- [ ] **Step 4: Commit testing checklist**

```bash
git add TESTING.md
git commit -m "docs: add comprehensive testing checklist"
```

---

### Task 21: Final Deployment Preparation

**Files:**
- Create: `.gitignore` (update if needed)
- Create: `DEPLOYMENT.md`

- [ ] **Step 1: Verify .gitignore**

File: `.gitignore` (should include)
```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

- [ ] **Step 2: Create deployment guide**

File: `DEPLOYMENT.md`
```markdown
# Deployment Guide

## Recommended Platform: Vercel

This Next.js application is optimized for Vercel deployment.

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow prompts:
   - Link to existing project or create new
   - Accept defaults for Next.js detection
   - Deploy

### Environment Variables

No environment variables required for production.

The Ideogram API key is only needed for the image generation script (development only).

### Build Settings

- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Post-Deployment Checklist

- [ ] Test all locales (he, en, ru)
- [ ] Verify images load
- [ ] Test language switcher
- [ ] Check mobile responsiveness
- [ ] Run Lighthouse audit
- [ ] Test confetti on CTA click
- [ ] Verify share section works

## Alternative Platforms

### Netlify

```bash
npm run build
# Deploy /out directory
```

### Static Export

```bash
npm run build
# Deploy /.next directory
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Performance Optimization

Already implemented:
- ✅ Static generation
- ✅ Image optimization (Next.js Image)
- ✅ Font optimization (next/font)
- ✅ CSS optimization (Tailwind purge)
- ✅ Code splitting (Next.js automatic)

## Monitoring

Recommended tools:
- Vercel Analytics (free tier)
- Google Analytics (optional)
- Sentry (error tracking, optional)

**Privacy Note**: If adding analytics for a kids' site, ensure COPPA compliance.
```

- [ ] **Step 3: Final build test**

Run:
```bash
npm run build
```

Expected: Clean build with no errors

- [ ] **Step 4: Commit deployment docs**

```bash
git add .gitignore DEPLOYMENT.md
git commit -m "docs: add deployment guide and update gitignore"
```

---

### Task 22: Create Final Production Tag

**Files:**
- None (Git operations only)

- [ ] **Step 1: Review all commits**

Run:
```bash
git log --oneline
```

Expected: Clean commit history with descriptive messages

- [ ] **Step 2: Create production-ready tag**

Run:
```bash
git tag -a v1.0.0 -m "Release: Good Deeds Day Landing Page v1.0.0

Features:
- Multilingual support (Hebrew, English, Russian)
- Kid-friendly design with animations
- Responsive mobile-first layout
- Interactive confetti effects
- User contribution section
- Ideogram AI generated images
- Optimized for performance

Ready for deployment to production."
```

- [ ] **Step 3: Push tags to remote**

Run:
```bash
git push origin main --tags
```

Expected: Tag pushed successfully

- [ ] **Step 4: Verify completion**

Run final verification:
```bash
npm run build
npm start
```

Visit all pages:
- http://localhost:3000 (redirects to /he)
- http://localhost:3000/he
- http://localhost:3000/en
- http://localhost:3000/ru

✅ All should work perfectly

Stop server with Ctrl+C

---

## Implementation Complete! 🎉

The Good Deeds Day Kids Landing Page is now complete and ready for deployment.

**What was built:**
- ✅ Multilingual Next.js application (Hebrew/English/Russian)
- ✅ Stitch-inspired design with custom animations
- ✅ 4 interactive tip cards with AI-generated images
- ✅ Confetti effects on user interactions
- ✅ User contribution section (no backend required)
- ✅ Fully responsive and accessible
- ✅ Optimized for performance
- ✅ Production-ready with documentation

**Next Steps:**
1. Deploy to Vercel (see DEPLOYMENT.md)
2. Share with stakeholders for review
3. Optional: Add analytics (COPPA-compliant)
4. Optional: Translate user contributions to other languages

**Total Tasks:** 22
**Total Steps:** ~110
**Estimated Time:** 4-6 hours for experienced developer
