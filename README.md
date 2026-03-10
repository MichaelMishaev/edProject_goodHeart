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
