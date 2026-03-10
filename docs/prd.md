⁠ markdown
# Product Requirements Document (PRD)
## Project: Good Deeds Day Kids Landing Page

## 1. Overview

The goal of this project is to create a simple, engaging, and educational landing page for children (around age 10) that teaches kindness and encourages good deeds.

The landing page will support **three languages**:
- Hebrew (Primary / Default)
- English
- Russian

The theme of the website is **"Good Deeds Day"** (יום המעשים הטובים).

The page should be colorful, simple, and easy for children to understand and interact with.

---

# 2. Goals

### Primary Goals
- Teach children about kindness and good deeds
- Encourage simple positive actions
- Provide a fun and easy-to-understand experience
- Support multiple languages

### Success Criteria
- Children can easily understand the tips
- Language switching works smoothly
- Page loads quickly
- Design feels friendly and safe for kids

---

# 3. Target Audience

### Primary Users
Children aged **8–12**

### Secondary Users
- Teachers
- Parents
- Schools participating in Good Deeds Day

---

# 4. Languages

Supported languages:

| Language | Code | Priority |
|--------|--------|--------|
| Hebrew | he | Primary |
| English | en | Secondary |
| Russian | ru | Secondary |

Default language: **Hebrew**

Language direction support:
- Hebrew → **RTL**
- English → **LTR**
- Russian → **LTR**

---

# 5. Core Features

## 5.1 Language Switcher

Users must be able to switch languages easily.

Requirements:
- Visible at top of page
- Uses flags or language names
- Switching language updates all text

Example:

🇮🇱 עברית  
🇬🇧 English  
🇷🇺 Русский

---

## 5.2 Hero Section

Purpose: Introduce the page and theme.

Content:

Hebrew:
 ⁠

יום המעשים הטובים 💛
מעשה טוב קטן יכול לעשות יום גדול למישהו אחר!



English:


Good Deeds Day 💛
A small good deed can make someone's day!



Russian:


День добрых дел 💛
Маленькое доброе дело может сделать чей-то день лучше!



Hero section includes:
- Title
- Subtitle
- Large button

Button text:

Hebrew:  
"אני רוצה לעשות טוב"

English:  
"I Want To Do Good"

Russian:  
"Я хочу сделать доброе дело"

---

# 6. Tips Section (Main Content)

Purpose: Provide simple kindness ideas for kids.

Each tip should be shown with:
- Icon
- Short sentence
- Bright color card

### Hebrew

- להגיד מילים טובות לחבר
- לעזור להורים בבית
- לשתף משחקים או חטיפים
- להגיד תודה
- לצייר ציור כדי לשמח מישהו

### English

- Say kind words to a friend
- Help your parents at home
- Share toys or snacks
- Say thank you
- Draw a picture to make someone happy

### Russian

- Сказать другу добрые слова
- Помочь родителям дома
- Поделиться игрушками или сладостями
- Сказать спасибо
- Нарисовать рисунок чтобы порадовать кого-то

---

# 7. Fun Fact Section

Purpose: Add educational and engaging content.

Example:

Hebrew:


הידעת?
מעשה טוב קטן יכול לשמח מישהו להרבה זמן!



English:


Did you know?
A small good deed can make someone smile for a long time!



Russian:


А вы знали?
Маленькое доброе дело может долго радовать человека!



---

# 8. Call To Action

At the bottom of the page.

Large colorful button encouraging action.

Button text:

Hebrew:


גם אני עושה מעשה טוב!



English:


I Will Do A Good Deed!



Russian:


Я сделаю доброе дело!



Optional:
Clicking button shows:
- Confetti animation
- Message: "כל הכבוד!"

---

# 9. Design Requirements

## Visual Style

The design must be:

- Kid-friendly
- Bright
- Friendly
- Simple

Color palette suggestion:

| Color | Usage |
|------|------|
| Yellow | Happiness |
| Blue | Background |
| Green | Positive actions |
| Red | Hearts |

---

## Icons

Use simple icons:

- ❤️ Heart
- 🎨 Drawing
- 🤝 Helping
- 🍎 Sharing
- ⭐ Kindness

---

# 10. Layout

Page layout:

1. Header
2. Language Switcher
3. Hero Section
4. Good Deeds Tips
5. Fun Fact
6. Call To Action
7. Footer

---

# 11. Mobile Support

Must be **fully responsive**.

Most users will access via:

- Mobile phones
- Tablets
- School computers

Requirements:
- Large buttons
- Readable text
- Touch-friendly spacing

---

# 12. Accessibility

Requirements:

- Large font sizes
- Clear contrast
- Simple language
- RTL support for Hebrew

---

# 13. Performance Requirements

Page must:

- Load under **2 seconds**
- Be lightweight
- Use optimized images

---

# 14. Technical Requirements

Suggested technologies:

Frontend:
- HTML
- CSS
- JavaScript

Optional frameworks:
- React
- Next.js

Language system:
- JSON translation files

Example:



/locales/he.json
/locales/en.json
/locales/ru.json



---

# 15. Analytics (Optional)

Track:

- Language usage
- Button clicks
- Page visits

Possible tools:
- Google Analytics
- Simple privacy-friendly analytics

---

# 16. Future Improvements

Possible future features:

- Kids submit their good deeds
- Good deed counter
- Printable kindness cards
- School participation leaderboard

---

# 17. Risks

Potential challenges:

- Translation accuracy
- RTL layout issues
- Keeping content simple for kids

---

# 18. Timeline (Example)

| Phase | Time |
|------|------|
Planning | 1 day |
Design | 2 days |
Development | 3 days |
Testing | 1 day |
Launch | 1 day |

Total: **~1 week**

---

# 19. Final Deliverables

The final product should include:

- Landing page
- Language switching
- Mobile responsive design
- Kid-friendly visuals
- Fully translated content

---
