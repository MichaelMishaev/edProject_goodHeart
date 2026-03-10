# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Good Deeds Day Kids Landing Page** - A simple, engaging, multilingual educational website for children (ages 8-12) that teaches kindness and encourages good deeds.

### Languages & Localization
- **Primary Language**: Hebrew (RTL)
- **Secondary Languages**: English (LTR), Russian (LTR)
- **Default**: Hebrew
- All text content must be translated into all three languages
- RTL/LTR switching must be handled properly for Hebrew vs English/Russian

## Existing UI/UX Design

**Location**: `docs/uiux/`

A professional UI design has been created using Google Stitch with:
- **Visual Reference**: `stitch_generated_screen/screen.png` - Mobile screenshot of the design
- **HTML Prototype**: `stitch_generated_screen/code.html` - Fully functional HTML/Tailwind implementation
- **Logo**: `logo.png` - Hands forming a heart with colorful gradients and sparkles

This design is MORE sophisticated than the original PRD and should be used as the reference for implementation.

### Logo Usage
- Display at the top of the Hero section with floating animation
- Use the image at `docs/uiux/logo.png`
- Copy to `public/images/logo.png` during implementation
- Recommended size: 120x120px (mobile), can scale up to 150x150px (desktop)
- The logo features hands forming a heart shape with gradients matching the color palette

### Design Characteristics
- **Modern aesthetic**: Card-based layout with imagery, gradients, and animations
- **Professional photography**: Each tip card includes relevant stock photos
- **Micro-interactions**: Hover states, floating animations, card reveals
- **Glassmorphism effects**: Backdrop blur, semi-transparent overlays
- **Mobile-first**: Designed primarily for mobile viewing

## Technical Stack (Based on Stitch Design)

The Stitch prototype uses:
- **HTML5** with RTL support (`dir="rtl" lang="he"`)
- **Tailwind CSS v3** via CDN (with forms and container-queries plugins)
- **Google Fonts**: Heebo (400, 700, 900 weights) for Hebrew support
- **Custom animations**: Float, card-reveal, diagonal-bg clip-path
- **Color palette** (defined in Tailwind config):
  - `action-teal`: #2DD4BF (primary brand color)
  - `sunny-yellow`: #FDE047 (highlights, accents)
  - `energetic-orange`: #FB923C (CTAs, energy)
  - `kind-purple`: #A78BFA (secondary accent)

### Recommended Production Stack
- **Framework**: Next.js 14+ (App Router for i18n routing)
- **Styling**: Tailwind CSS (matching Stitch design system)
- **Typography**: @next/font with Heebo font family
- **Internationalization**: next-intl
- **Animations**: CSS-based (matching Stitch animations), optional canvas-confetti for CTA
- **Images**: Next.js Image component with proper optimization

## Development Commands (Once Set Up)

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Linting
npm run lint

# Type checking
npm run type-check
```

## Architecture Guidelines

### Localization Structure
Translation files should be organized as:
```
/locales/
  /he.json    # Hebrew (primary)
  /en.json    # English
  /ru.json    # Russian
```

Each translation file must include all content:
- Hero section (title, subtitle, button text)
- Good deeds tips (5 items)
- Fun fact section
- Call-to-action button
- Language switcher labels

### Component Structure
```
/app/
  /[locale]/           # Next.js i18n routing
    page.tsx           # Main landing page
    layout.tsx         # Root layout with lang/dir attributes
/components/
  /LanguageSwitcher/   # Language selection UI
  /Hero/               # Hero section component
  /TipsSection/        # Good deeds tips grid
  /FunFact/            # Educational fact component
  /CallToAction/       # CTA button with confetti
/public/
  /images/             # Optimized images
```

### Key Requirements

**Accessibility**
- Large font sizes (kid-friendly)
- High contrast ratios (WCAG AA minimum)
- Simple language (age 8-12 comprehension level)
- Proper `lang` and `dir` attributes for each language
- Semantic HTML structure

**Performance**
- Page must load under 2 seconds
- Optimize all images (use Next.js Image component)
- Minimize JavaScript bundle size
- Use CSS-in-JS or Tailwind for critical CSS

**Design**
- Use the Stitch design color palette (teal, yellow, orange, purple)
- Large, touch-friendly buttons with hover states (minimum 44x44px tap targets)
- Fully responsive (mobile-first approach)
- Card-based layout with images and rounded corners (5xl = 3rem)
- Animated elements: floating icons, card hover lifts, smooth transitions

**RTL Support**
- Use logical properties (`inline-start`/`inline-end` instead of `left`/`right`)
- Test Hebrew layout thoroughly
- Ensure icons/emojis don't flip incorrectly
- Use `dir="rtl"` and `dir="ltr"` appropriately

### Content Guidelines

**Good Deeds Tips** (from Stitch design - Hebrew version):
1. **חייכו למישהו שאתם לא מכירים** (Smile at someone you don't know)
   - Badge: 😊 הכי פשוט
   - Color: action-teal border

2. **עזרו לחבר עם שיעורי הבית** (Help a friend with homework)
   - Badge: 📚 שיתוף פעולה
   - Color: kind-purple border

3. **תנו מחמאה כנה** (Give a genuine compliment)
   - Badge: 💬 מילים טובות
   - Color: sunny-yellow border

4. **הרימו זבל מהרצפה** (Pick up trash from the floor)
   - Badge: ♻️ למען הסביבה
   - Color: energetic-orange border

Each tip card includes:
- Professional photograph (use placeholder images until real photos acquired)
- Badge with emoji and category label
- Title (2xl font, font-black)
- Description paragraph (lg font, text-gray-600)
- Hover effect: scale image, lift card (-10px translateY)

**Hero Section** (from Stitch design):
- Hashtag badge: `#יום_המעשים_הטובים` (white/20 bg, backdrop-blur)
- Title: "יום המעשים הטובים: הכוח להיות טוב!"
- Subtitle: Multi-line encouraging message
- Scroll indicator: Animated bouncing arrow (SVG)
- Diagonal clip-path background with action-teal color

**CTA Section**:
- Orange gradient background (energetic-orange to orange-500)
- Title: "מוכנים להפיץ טוב?"
- Quote: "כל מעשה קטן הוא חלק משינוי גדול"
- Button text: "אני בפנים! 🚀"
- Alert message: "כל הכבוד! העולם כבר נראה טוב יותר בזכותכם!"

**User Contribution Section** (in Stitch design):
- Section title: "יש לכם רעיון משלכם? 💡"
- Textarea for user to share their own good deed ideas
- Submit button: "שתפו אותנו! ✨"
- Alert on submit: "איזה רעיון מדהים! תודה ששיתפתם אותנו!"
- This section needs backend implementation for storing user submissions

### Translation Keys Example (Based on Stitch Design)
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
      "imageAlt": "ילד מחייך לחבר בבית הספר",
      "borderColor": "action-teal"
    },
    {
      "id": "homework",
      "badge": "📚",
      "badgeText": "שיתוף פעולה",
      "title": "עזרו לחבר עם שיעורי הבית",
      "description": "טובים במתמטיקה? אלופים באנגלית? שתפו את הידע שלכם ועזרו למישהו שמתקשה. זה הכי מספק בעולם לראות מישהו אחר מצליח!",
      "imageAlt": "שתי ילדות לומדות יחד בכיף",
      "borderColor": "kind-purple"
    },
    {
      "id": "compliment",
      "badge": "💬",
      "badgeText": "מילים טובות",
      "title": "תנו מחמאה כנה",
      "description": "ראיתם חולצה יפה? מישהו אמר משהו חכם בשיעור? אל תשמרו את זה בלב - פשוט תגידו את זה! מילה טובה אחת יכולה להאיר שבוע שלם.",
      "imageAlt": "קבוצת חברים צוחקים ומחמיאים",
      "borderColor": "sunny-yellow"
    },
    {
      "id": "trash",
      "badge": "♻️",
      "badgeText": "למען הסביבה",
      "title": "הרימו זבל מהרצפה",
      "description": "מעשה טוב הוא גם כלפי הסביבה שלנו. ראיתם עטיפה על הדשא בבית הספר? הרימו אותה לפח הקרוב. כדור הארץ יודה לכם!",
      "imageAlt": "ילדים אוספים פסולת בפארק",
      "borderColor": "energetic-orange"
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

## Image Generation with Ideogram AI

**API Documentation**: `docs/3rdParty/ideogramAI.md`

The Stitch design includes professional images for each tip card. Generate kid-friendly images using Ideogram AI:

### Quick Start
```typescript
const response = await fetch('https://api.ideogram.ai/v1/ideogram-v3/generate', {
  method: 'POST',
  headers: {
    'Api-Key': 'fGDoK4f_gOWFjcDaS4vLxaavoVaWtzD8EgQXJiqWP72Fz3PBSg-bRzdtup_ajnP_vBBUZXZhBnPF3Y-CLxv4MA'
  },
  body: formData
});
```

### Recommended Settings for This Project
- **Style Preset**: `CHILDRENS_BOOK`, `FLAT_ART`, or `BRIGHT_ART` (kid-friendly styles)
- **Aspect Ratio**: `1x1` or `4x3` (for card images)
- **Rendering Speed**: `TURBO` (good balance of quality/speed)
- **Style Type**: `AUTO` or `DESIGN`
- **Color Palette**: Use `FRESH` or `PASTEL` presets to match kid-friendly theme

### Prompts for Each Tip Card

Based on Stitch design Hebrew content:

1. **Smile Tip**:
   - `"A cheerful illustration of a child smiling at a friend in a school hallway, bright colors, friendly atmosphere, children's book style"`

2. **Homework Tip**:
   - `"Two happy children studying together at a desk, helping each other with homework, warm lighting, colorful, children's book illustration"`

3. **Compliment Tip**:
   - `"A group of diverse children laughing and giving compliments to each other, joyful, bright colors, positive energy, kids illustration"`

4. **Trash/Environment Tip**:
   - `"Children happily picking up litter in a park or playground, environmental care, bright sunny day, children's book style, cheerful"`

### Critical: Download and Store Images
⚠️ **IMPORTANT**: Ideogram API image links **expire after a limited time**.

After generating images:
```typescript
// Download and save locally
const imageResponse = await fetch(generatedImageUrl);
const buffer = await imageResponse.arrayBuffer();
await fs.writeFile(`public/images/${imageName}.png`, buffer);
```

Store downloaded images in: `public/images/tips/`

## Important Notes

- **Reference the Stitch design**: `docs/uiux/stitch_generated_screen/` contains the approved visual design
- **API Key**: Located at top of `docs/3rdParty/ideogramAI.md`
- Target audience is children aged 8-12, so keep UI simple and engaging
- Test on mobile devices (primary access method)
- Ensure all three languages are complete before deployment
- The Stitch design includes a user contribution section for kids to submit their own good deed ideas (no backend storage - engagement only)
- Keep bundle size minimal for fast loading on school networks
- Generate images with Ideogram AI using kid-friendly style presets

## User-Generated Content (No Backend Required)

**Decision**: Simple engagement-only approach (no data storage)

The Stitch design includes a section for users to share their own good deed ideas. This is implemented as a **feel-good interaction** without backend storage:

**Implementation**:
- Textarea for kids to type their good deed idea
- Submit button shows success alert/modal
- **No data is collected or stored** (COPPA-safe, privacy-friendly)
- User's input is cleared after submission
- Purely for engagement and encouraging creative thinking

**Success Message** (translated):
- Hebrew: "איזה רעיון מדהים! תודה ששיתפתם אותנו!"
- English: "What an amazing idea! Thanks for sharing with us!"
- Russian: "Какая замечательная идея! Спасибо, что поделились!"

**Optional Enhancement**:
- Add confetti animation on submission (matching main CTA button)
- Show encouraging message like "Your kindness is inspiring!"
- Consider adding a "share another idea" button to clear form

**Why This Approach**:
- COPPA compliant (no data collection from minors)
- No moderation needed (no public display)
- No database/backend infrastructure required
- Encourages kids to think creatively about good deeds
- Zero privacy/security concerns

## Future Enhancements (Not Yet in Scope)

Additional features mentioned in PRD but not in current design:
- Good deed counter (track how many deeds have been done)
- Printable kindness cards
- School participation leaderboard

Do not implement these unless explicitly requested.
