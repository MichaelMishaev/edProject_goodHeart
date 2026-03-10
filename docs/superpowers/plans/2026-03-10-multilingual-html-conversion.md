# Multilingual Good Deeds Landing Page Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert Stitch HTML template to multilingual (Hebrew/English/Russian) plain HTML/JS solution with dynamic language switching

**Architecture:** Single-page application using vanilla JavaScript for language switching. Three translation JSON files with client-side rendering. Tailwind CSS CDN for styling, maintaining Stitch design system. Logo integration in hero and footer sections.

**Tech Stack:** HTML5, CSS3 (Tailwind CDN), Vanilla JavaScript, canvas-confetti (optional for CTA effects)

---

## File Structure

```
/
├── index.html                    # Main HTML file with language switching
├── js/
│   ├── translations.js           # Translation data (he/en/ru)
│   └── app.js                    # Language switching logic
├── images/
│   └── logo.png                  # Hands forming heart logo
└── README.md                     # Project documentation
```

## Translation Content Source

All translations already exist in:
- `/Users/michaelmishayev/Desktop/Projects/edProj_good heart/messages/he.json`
- `/Users/michaelmishayev/Desktop/Projects/edProj_good heart/messages/en.json`
- `/Users/michaelmishayev/Desktop/Projects/edProj_good heart/messages/ru.json`

## Design Reference

Base template: `/Users/michaelmishayev/Desktop/Projects/edProj_good heart/docs/uiux/stitch_generated_screen/code.html`

---

## Chunk 1: Core HTML Structure

### Task 1: Create Base HTML Structure

**Files:**
- Create: `index.html`

- [ ] **Step 1: Copy Stitch HTML as starting point**

```bash
cp "/Users/michaelmishayev/Desktop/Projects/edProj_good heart/docs/uiux/stitch_generated_screen/code.html" index.html
```

Expected: File created with complete Stitch template

- [ ] **Step 2: Add language switcher to header**

Modify `index.html` line 64 (inside `<header>` before existing content):

```html
<!-- Language Switcher -->
<div class="fixed top-4 left-4 z-50 flex gap-2" id="language-switcher">
    <button
        data-lang="he"
        class="lang-btn bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold shadow-md hover:bg-action-teal hover:text-white transition-all duration-300 active:scale-95"
        aria-label="עברית">
        🇮🇱 עברית
    </button>
    <button
        data-lang="en"
        class="lang-btn bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold shadow-md hover:bg-action-teal hover:text-white transition-all duration-300 active:scale-95"
        aria-label="English">
        🇬🇧 English
    </button>
    <button
        data-lang="ru"
        class="lang-btn bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold shadow-md hover:bg-action-teal hover:text-white transition-all duration-300 active:scale-95"
        aria-label="Русский">
        🇷🇺 Русский
    </button>
</div>
```

- [ ] **Step 3: Add data-i18n attributes to translatable content**

Modify `index.html`:

Replace line 6:
```html
<title data-i18n="hero.title">יום המעשים הטובים: הכוח להיות טוב!</title>
```

Replace line 66:
```html
<span class="text-white font-black text-sm tracking-widest uppercase" data-i18n="hero.hashtag">#יום_המעשים_הטובים</span>
```

Replace lines 68-71:
```html
<h1 class="text-5xl md:text-7xl font-black text-white mb-8 bubble-font leading-tight">
    <span data-i18n="hero.heading.line1">יום המעשים הטובים:</span><br/>
    <span class="text-sunny-yellow" data-i18n="hero.heading.line2">הכוח להיות טוב!</span>
</h1>
```

Replace lines 72-76:
```html
<p class="text-white text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
    <span data-i18n="hero.description.line1">מוכנים לשנות את העולם? כל מעשה קטן יכול ליצור שינוי ענק.</span>
    <br class="hidden md:block"/>
    <span data-i18n="hero.description.line2">הנה כמה דרכים מגניבות שבהן תוכלו להפיץ אור כבר היום!</span>
</p>
```

- [ ] **Step 4: Add data-i18n to tip cards**

Modify tip card 1 (lines 89-102):

```html
<div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-action-teal shadow-md flex items-center gap-2">
    <span>😊</span> <span data-i18n="tips.0.badge">הכי פשוט</span>
</div>
<!-- ... -->
<h3 class="text-2xl font-black mb-4 text-gray-900" data-i18n="tips.0.title">חייכו למישהו שאתם לא מכירים</h3>
<p class="text-gray-600 text-lg leading-relaxed" data-i18n="tips.0.description">
    חיוך הוא מדבק! כשאתם מחייכים למישהו במסדרון או ברחוב, אתם משפרים לו את היום באופן מיידי. זה הכוח הסודי שלכם.
</p>
```

Repeat for tip cards 2, 3, and 4 (using `tips.1`, `tips.2`, `tips.3`)

- [ ] **Step 5: Add data-i18n to CTA section**

Modify lines 155-159:

```html
<h3 class="text-4xl md:text-5xl font-black mb-6 bubble-font" data-i18n="cta.heading">מוכנים להפיץ טוב?</h3>
<p class="text-2xl mb-10 opacity-90 font-medium italic" data-i18n="cta.quote">"כל מעשה קטן הוא חלק משינוי גדול"</p>
<button class="bg-white text-energetic-orange font-black py-5 px-16 rounded-full text-2xl hover:bg-sunny-yellow hover:text-gray-900 transition-all duration-300 shadow-xl hover:scale-105 active:scale-95"
    onclick="handleCtaClick()"
    data-i18n="cta.button">
    אני בפנים! 🚀
</button>
```

- [ ] **Step 6: Add data-i18n to share section**

Modify lines 169-177:

```html
<h3 class="text-3xl md:text-4xl font-black text-gray-900 mb-4" data-i18n="share.heading">יש לכם רעיון משלכם? 💡</h3>
<p class="text-gray-600 text-xl mb-8 font-medium" data-i18n="share.description">
    חשבתם על דרך יצירתית לעשות טוב? אנחנו ממש רוצים לשמוע על זה!
</p>
<textarea
    class="w-full rounded-2xl border-2 border-gray-100 p-4 focus:ring-4 focus:ring-action-teal/20 focus:border-action-teal transition-all outline-none text-lg resize-none h-32"
    data-i18n-placeholder="share.placeholder">
</textarea>
<button class="w-full bg-action-teal text-white font-black py-4 px-8 rounded-2xl text-xl hover:bg-teal-500 transition-all duration-300 shadow-lg hover:shadow-action-teal/20 active:scale-[0.98]"
    onclick="handleShareClick()"
    data-i18n="share.button">
    שתפו אותנו! ✨
</button>
```

- [ ] **Step 7: Add data-i18n to footer**

Modify line 191:

```html
<p class="text-gray-400 font-bold text-lg" data-i18n="footer.copyright">© 2024 יום המעשים הטובים - לדור שמשנה את העולם</p>
```

- [ ] **Step 8: Test HTML structure in browser**

```bash
open index.html
```

Expected: Page loads with Hebrew content (original Stitch design), language switcher visible in top-left

- [ ] **Step 9: Commit base HTML structure**

```bash
git add index.html
git commit -m "feat: create base HTML structure with i18n attributes

- Copy Stitch template as starting point
- Add language switcher (Hebrew/English/Russian)
- Add data-i18n attributes to all translatable content
- Prepare for JavaScript-based language switching

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 2: Create Translation Data

**Files:**
- Create: `js/translations.js`

- [ ] **Step 1: Create js directory**

```bash
mkdir -p js
```

Expected: Directory created

- [ ] **Step 2: Read existing Hebrew translations**

```bash
cat messages/he.json
```

Expected: Display Hebrew translation JSON with hero, tips, cta, share, footer sections

- [ ] **Step 3: Read existing English translations**

```bash
cat messages/en.json
```

Expected: Display English translation JSON

- [ ] **Step 4: Read existing Russian translations**

```bash
cat messages/ru.json
```

Expected: Display Russian translation JSON

- [ ] **Step 5: Create translations.js with all three languages**

Create `js/translations.js`:

```javascript
/**
 * Translation data for Good Deeds Day landing page
 * Supports Hebrew (RTL), English (LTR), Russian (LTR)
 */

const translations = {
    he: {
        hero: {
            title: "יום המעשים הטובים: הכוח להיות טוב!",
            hashtag: "#יום_המעשים_הטובים",
            heading: {
                line1: "יום המעשים הטובים:",
                line2: "הכוח להיות טוב!"
            },
            description: {
                line1: "מוכנים לשנות את העולם? כל מעשה קטן יכול ליצור שינוי ענק.",
                line2: "הנה כמה דרכים מגניבות שבהן תוכלו להפיץ אור כבר היום!"
            }
        },
        tips: [
            {
                badge: "הכי פשוט",
                title: "חייכו למישהו שאתם לא מכירים",
                description: "חיוך הוא מדבק! כשאתם מחייכים למישהו במסדרון או ברחוב, אתם משפרים לו את היום באופן מיידי. זה הכוח הסודי שלכם."
            },
            {
                badge: "שיתוף פעולה",
                title: "עזרו לחבר עם שיעורי הבית",
                description: "טובים במתמטיקה? אלופים באנגלית? שתפו את הידע שלכם ועזרו למישהו שמתקשה. זה הכי מספק בעולם לראות מישהו אחר מצליח!"
            },
            {
                badge: "מילים טובות",
                title: "תנו מחמאה כנה",
                description: "ראיתם חולצה יפה? מישהו אמר משהו חכם בשיעור? אל תשמרו את זה בלב - פשוט תגידו את זה! מילה טובה אחת יכולה להאיר שבוע שלם."
            },
            {
                badge: "למען הסביבה",
                title: "הרימו זבל מהרצפה",
                description: "מעשה טוב הוא גם כלפי הסביבה שלנו. ראיתם עטיפה על הדשא בבית הספר? הרימו אותה לפח הקרוב. כדור הארץ יודה לכם!"
            }
        ],
        cta: {
            heading: "מוכנים להפיץ טוב?",
            quote: "\"כל מעשה קטן הוא חלק משינוי גדול\"",
            button: "אני בפנים! 🚀",
            alert: "כל הכבוד! העולם כבר נראה טוב יותר בזכותכם!"
        },
        share: {
            heading: "יש לכם רעיון משלכם? 💡",
            description: "חשבתם על דרך יצירתית לעשות טוב? אנחנו ממש רוצים לשמוע על זה!",
            placeholder: "ספרו לנו על המעשה הטוב שלכם...",
            button: "שתפו אותנו! ✨",
            alert: "איזה רעיון מדהים! תודה ששיתפתם אותנו!"
        },
        footer: {
            copyright: "© 2024 יום המעשים הטובים - לדור שמשנה את העולם"
        }
    },
    en: {
        hero: {
            title: "Good Deeds Day: The Power to Be Good!",
            hashtag: "#GoodDeedsDay",
            heading: {
                line1: "Good Deeds Day:",
                line2: "The Power to Be Good!"
            },
            description: {
                line1: "Ready to change the world? Every small act can create a huge change.",
                line2: "Here are some cool ways you can spread light today!"
            }
        },
        tips: [
            {
                badge: "Easiest",
                title: "Smile at someone you don't know",
                description: "A smile is contagious! When you smile at someone in the hallway or on the street, you instantly brighten their day. It's your secret superpower."
            },
            {
                badge: "Teamwork",
                title: "Help a friend with homework",
                description: "Good at math? Great at English? Share your knowledge and help someone who's struggling. It's the most rewarding feeling to see someone else succeed!"
            },
            {
                badge: "Kind Words",
                title: "Give a genuine compliment",
                description: "Saw a nice shirt? Someone said something smart in class? Don't keep it to yourself - just say it! One kind word can brighten an entire week."
            },
            {
                badge: "For the Environment",
                title: "Pick up litter from the ground",
                description: "A good deed is also towards our environment. Saw a wrapper on the grass at school? Pick it up to the nearest bin. Planet Earth will thank you!"
            }
        ],
        cta: {
            heading: "Ready to spread goodness?",
            quote: "\"Every small act is part of a big change\"",
            button: "I'm in! 🚀",
            alert: "Well done! The world already looks better because of you!"
        },
        share: {
            heading: "Got your own idea? 💡",
            description: "Thought of a creative way to do good? We really want to hear about it!",
            placeholder: "Tell us about your good deed...",
            button: "Share with us! ✨",
            alert: "What an amazing idea! Thank you for sharing!"
        },
        footer: {
            copyright: "© 2024 Good Deeds Day - For the generation changing the world"
        }
    },
    ru: {
        hero: {
            title: "День добрых дел: Сила быть добрым!",
            hashtag: "#ДеньДобрыхДел",
            heading: {
                line1: "День добрых дел:",
                line2: "Сила быть добрым!"
            },
            description: {
                line1: "Готовы изменить мир? Каждое маленькое действие может создать огромные перемены.",
                line2: "Вот несколько классных способов, как вы можете нести свет уже сегодня!"
            }
        },
        tips: [
            {
                badge: "Самое простое",
                title: "Улыбнитесь незнакомцу",
                description: "Улыбка заразительна! Когда вы улыбаетесь кому-то в коридоре или на улице, вы мгновенно делаете их день лучше. Это ваша секретная суперсила."
            },
            {
                badge: "Командная работа",
                title: "Помогите другу с домашним заданием",
                description: "Хорошо разбираетесь в математике? Отлично знаете английский? Поделитесь своими знаниями и помогите тому, кто испытывает трудности. Это самое приятное чувство - видеть, как кто-то другой добивается успеха!"
            },
            {
                badge: "Добрые слова",
                title: "Сделайте искренний комплимент",
                description: "Увидели красивую рубашку? Кто-то сказал что-то умное на уроке? Не держите это в себе - просто скажите! Одно доброе слово может осветить целую неделю."
            },
            {
                badge: "Для окружающей среды",
                title: "Поднимите мусор с земли",
                description: "Доброе дело - это также забота о нашей окружающей среде. Увидели обертку на траве в школе? Отнесите ее в ближайшую урну. Планета Земля скажет вам спасибо!"
            }
        ],
        cta: {
            heading: "Готовы распространять добро?",
            quote: "\"Каждое маленькое действие - часть большой перемены\"",
            button: "Я в деле! 🚀",
            alert: "Молодец! Мир уже выглядит лучше благодаря вам!"
        },
        share: {
            heading: "Есть своя идея? 💡",
            description: "Придумали творческий способ сделать добро? Мы очень хотим услышать об этом!",
            placeholder: "Расскажите нам о вашем добром деле...",
            button: "Поделитесь с нами! ✨",
            alert: "Какая замечательная идея! Спасибо, что поделились!"
        },
        footer: {
            copyright: "© 2024 День добрых дел - Для поколения, меняющего мир"
        }
    }
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = translations;
}
```

- [ ] **Step 6: Test translations.js loads without errors**

```bash
node -e "const t = require('./js/translations.js'); console.log('Hebrew tips:', t.he.tips.length); console.log('English tips:', t.en.tips.length); console.log('Russian tips:', t.ru.tips.length);"
```

Expected: Output shows "Hebrew tips: 4", "English tips: 4", "Russian tips: 4"

- [ ] **Step 7: Commit translation data**

```bash
git add js/translations.js
git commit -m "feat: create translation data for all three languages

- Add Hebrew, English, Russian translations
- Structure matches Stitch template content
- Export translations object for client-side use

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 3: Implement Language Switching Logic

**Files:**
- Create: `js/app.js`

- [ ] **Step 1: Create app.js with language switching logic**

Create `js/app.js`:

```javascript
/**
 * Good Deeds Day Landing Page - Language Switching Logic
 * Handles dynamic content switching between Hebrew (RTL), English (LTR), Russian (LTR)
 */

// Default language
let currentLang = 'he';

// Language direction mapping
const langDirections = {
    he: 'rtl',
    en: 'ltr',
    ru: 'ltr'
};

/**
 * Initialize the application
 */
function init() {
    // Get language from localStorage or default to Hebrew
    currentLang = localStorage.getItem('preferredLanguage') || 'he';

    // Set up language switcher buttons
    setupLanguageSwitcher();

    // Apply initial language
    switchLanguage(currentLang);
}

/**
 * Set up language switcher button event listeners
 */
function setupLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
}

/**
 * Switch to a new language
 * @param {string} lang - Language code (he/en/ru)
 */
function switchLanguage(lang) {
    if (!translations[lang]) {
        console.error(`Translation not found for language: ${lang}`);
        return;
    }

    currentLang = lang;

    // Save preference to localStorage
    localStorage.setItem('preferredLanguage', lang);

    // Update HTML direction and lang attributes
    document.documentElement.setAttribute('dir', langDirections[lang]);
    document.documentElement.setAttribute('lang', lang);

    // Update all translatable elements
    updateContent(translations[lang]);

    // Update active button state
    updateActiveButton(lang);
}

/**
 * Update all content with translation data
 * @param {object} data - Translation data for current language
 */
function updateContent(data) {
    // Update page title
    document.title = data.hero.title;

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const value = getNestedValue(data, key);

        if (value) {
            element.textContent = value;
        }
    });

    // Update placeholder for textarea
    const textarea = document.querySelector('[data-i18n-placeholder]');
    if (textarea) {
        const key = textarea.getAttribute('data-i18n-placeholder');
        const value = getNestedValue(data, key);
        if (value) {
            textarea.placeholder = value;
        }
    }
}

/**
 * Get nested object value by string path
 * @param {object} obj - Object to traverse
 * @param {string} path - Dot-notation path (e.g., "hero.title")
 * @returns {*} Value at path or undefined
 */
function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => {
        // Handle array indices (e.g., "tips.0.title")
        if (!isNaN(key)) {
            key = parseInt(key);
        }
        return current ? current[key] : undefined;
    }, obj);
}

/**
 * Update active button visual state
 * @param {string} lang - Active language code
 */
function updateActiveButton(lang) {
    const buttons = document.querySelectorAll('.lang-btn');

    buttons.forEach(button => {
        if (button.getAttribute('data-lang') === lang) {
            button.classList.add('bg-action-teal', 'text-white');
            button.classList.remove('bg-white/90');
        } else {
            button.classList.remove('bg-action-teal', 'text-white');
            button.classList.add('bg-white/90');
        }
    });
}

/**
 * Handle CTA button click
 */
function handleCtaClick() {
    const message = translations[currentLang].cta.alert;
    alert(message);
}

/**
 * Handle share button click
 */
function handleShareClick() {
    const message = translations[currentLang].share.alert;
    alert(message);
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
```

- [ ] **Step 2: Add script tags to index.html**

Modify `index.html` before closing `</body>` tag (around line 200):

```html
<!-- Translation Data -->
<script src="js/translations.js"></script>

<!-- Application Logic -->
<script src="js/app.js"></script>
</body>
</html>
```

- [ ] **Step 3: Test language switching in browser**

```bash
open index.html
```

Expected:
- Page loads in Hebrew (default)
- Clicking English button switches to English content
- Clicking Russian button switches to Russian content
- Hebrew button switches back to Hebrew
- Direction changes (RTL for Hebrew, LTR for English/Russian)

- [ ] **Step 4: Test localStorage persistence**

In browser console:
```javascript
localStorage.getItem('preferredLanguage')
```

Expected: Returns current language code after switching languages

- [ ] **Step 5: Commit language switching logic**

```bash
git add js/app.js index.html
git commit -m "feat: implement language switching logic

- Add app.js with language switching functionality
- Support Hebrew (RTL), English (LTR), Russian (LTR)
- Save language preference to localStorage
- Dynamic content updates using data-i18n attributes
- Active button state management

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Chunk 2: Logo Integration and Final Polish

### Task 4: Integrate Logo in Hero Section

**Files:**
- Create: `images/logo.png`
- Modify: `index.html:64-84`

- [ ] **Step 1: Create images directory**

```bash
mkdir -p images
```

Expected: Directory created

- [ ] **Step 2: Copy logo to images directory**

```bash
cp "/Users/michaelmishayev/Desktop/Projects/edProj_good heart/docs/uiux/logo.png" images/logo.png
```

Expected: Logo copied successfully

- [ ] **Step 3: Verify logo dimensions**

```bash
file images/logo.png
```

Expected: Output shows PNG image file

- [ ] **Step 4: Add logo to hero section**

Modify `index.html` after line 67 (after hashtag badge, before h1):

```html
<!-- Logo with Float Animation -->
<div class="flex justify-center mb-8">
    <img
        src="images/logo.png"
        alt="Good Deeds Day Logo - Hands forming heart"
        class="w-32 h-32 md:w-40 md:h-40 animate-float drop-shadow-2xl"
        loading="eager"
    />
</div>
```

- [ ] **Step 5: Test logo appears in hero section**

```bash
open index.html
```

Expected: Logo appears below hashtag, above heading, with float animation

- [ ] **Step 6: Commit hero logo integration**

```bash
git add images/logo.png index.html
git commit -m "feat: add logo to hero section

- Copy logo from docs/uiux/logo.png
- Add 120x120px logo with float animation
- Position between hashtag and heading

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 5: Add Logo to Footer

**Files:**
- Modify: `index.html:184-200`

- [ ] **Step 1: Add logo to footer section**

Modify `index.html` after line 185 (after `<div class="container mx-auto">`):

```html
<!-- Footer Logo -->
<div class="flex justify-center mb-6">
    <img
        src="images/logo.png"
        alt="Good Deeds Day Logo"
        class="w-20 h-20 opacity-80 hover:opacity-100 transition-opacity duration-300"
        loading="lazy"
    />
</div>
```

- [ ] **Step 2: Test logo appears in footer**

```bash
open index.html
```

Expected: Logo appears at top of footer section, 80x80px, with hover effect

- [ ] **Step 3: Commit footer logo integration**

```bash
git add index.html
git commit -m "feat: add logo to footer section

- Add 80x80px logo with opacity hover effect
- Position at top of footer

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 6: Add Responsive Mobile Optimization

**Files:**
- Modify: `index.html:39-56`

- [ ] **Step 1: Optimize language switcher for mobile**

Modify `index.html` language switcher (around line 64-77):

```html
<!-- Language Switcher - Mobile Optimized -->
<div class="fixed top-4 left-4 z-50 flex flex-col md:flex-row gap-2" id="language-switcher">
    <button
        data-lang="he"
        class="lang-btn bg-white/90 backdrop-blur-sm px-3 py-2 md:px-4 rounded-full font-bold shadow-md hover:bg-action-teal hover:text-white transition-all duration-300 active:scale-95 text-sm md:text-base"
        aria-label="עברית">
        🇮🇱 <span class="hidden md:inline">עברית</span><span class="md:hidden">HE</span>
    </button>
    <button
        data-lang="en"
        class="lang-btn bg-white/90 backdrop-blur-sm px-3 py-2 md:px-4 rounded-full font-bold shadow-md hover:bg-action-teal hover:text-white transition-all duration-300 active:scale-95 text-sm md:text-base"
        aria-label="English">
        🇬🇧 <span class="hidden md:inline">English</span><span class="md:hidden">EN</span>
    </button>
    <button
        data-lang="ru"
        class="lang-btn bg-white/90 backdrop-blur-sm px-3 py-2 md:px-4 rounded-full font-bold shadow-md hover:bg-action-teal hover:text-white transition-all duration-300 active:scale-95 text-sm md:text-base"
        aria-label="Русский">
        🇷🇺 <span class="hidden md:inline">Русский</span><span class="md:hidden">RU</span>
    </button>
</div>
```

- [ ] **Step 2: Add mobile viewport meta tag verification**

Verify `index.html` line 5 has correct meta tag:

```html
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
```

Expected: Meta tag exists and is correct

- [ ] **Step 3: Test on mobile screen sizes**

```bash
open index.html
```

Then resize browser to 375px width (iPhone SE size)

Expected:
- Language buttons stack vertically on mobile
- Show abbreviated text (HE/EN/RU) on mobile
- All content readable and touchable

- [ ] **Step 4: Commit mobile optimization**

```bash
git add index.html
git commit -m "feat: optimize language switcher for mobile

- Stack buttons vertically on mobile screens
- Show abbreviated language codes on small screens
- Maintain touch-friendly spacing

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 7: Add RTL/LTR Direction Fixes

**Files:**
- Modify: `index.html:39-56`

- [ ] **Step 1: Add RTL-specific CSS fixes**

Modify `index.html` in `<style>` section (after line 37, before closing `</style>`):

```css
/* RTL Direction Fixes */
[dir="rtl"] .lang-btn {
    text-align: right;
}

[dir="ltr"] .lang-btn {
    text-align: left;
}

/* Ensure language switcher doesn't flip on RTL */
#language-switcher {
    direction: ltr;
}

/* Footer icons spacing fix for RTL */
[dir="rtl"] footer .space-x-reverse {
    margin-right: 0;
    margin-left: 2rem;
}
```

- [ ] **Step 2: Test RTL direction switching**

```bash
open index.html
```

Switch between Hebrew (RTL) and English (LTR)

Expected:
- Text alignment changes appropriately
- Language switcher stays in same position
- Footer icons maintain proper spacing
- All content flows naturally in correct direction

- [ ] **Step 3: Commit RTL/LTR fixes**

```bash
git add index.html
git commit -m "fix: add RTL/LTR direction handling

- Add CSS rules for proper RTL text alignment
- Keep language switcher in LTR mode
- Fix footer icon spacing in RTL mode

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 8: Create README Documentation

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create README.md**

Create `README.md`:

```markdown
# Good Deeds Day Kids Landing Page

A colorful, kid-friendly landing page teaching kindness and encouraging good deeds. Supports three languages: Hebrew (RTL), English (LTR), and Russian (LTR).

## 🌈 Features

- **Multilingual Support**: Hebrew (עברית), English, Russian (Русский)
- **RTL/LTR Text Direction**: Automatic direction switching
- **Mobile Responsive**: Optimized for phones, tablets, and desktops
- **Kid-Friendly Design**: Bright colors, simple language, engaging visuals
- **Persistent Language Preference**: Remembers user's language choice

## 🎨 Design

Based on Stitch AI-generated design with:
- **Color Palette**: Teal (#2DD4BF), Yellow (#FDE047), Orange (#FB923C), Purple (#A78BFA)
- **Typography**: Heebo font (Hebrew and Latin support)
- **Animations**: Float, card-reveal, bounce effects
- **Layout**: Mobile-first responsive design

## 🚀 Quick Start

### Option 1: Open Directly
```bash
open index.html
```

### Option 2: Local Server (Recommended)
```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx http-server -p 8000
```

Then visit: `http://localhost:8000`

## 📁 Project Structure

```
/
├── index.html              # Main HTML page
├── js/
│   ├── translations.js     # Translation data (he/en/ru)
│   └── app.js             # Language switching logic
├── images/
│   └── logo.png           # Hands forming heart logo
└── README.md              # This file
```

## 🌍 Languages

| Language | Code | Direction | Status |
|----------|------|-----------|--------|
| עברית (Hebrew) | `he` | RTL | ✅ Default |
| English | `en` | LTR | ✅ Complete |
| Русский (Russian) | `ru` | LTR | ✅ Complete |

## 🎯 Content Sections

1. **Hero Section**: Welcome message and introduction
2. **Tips Section**: 4 good deed ideas with images
   - Smile at someone
   - Help with homework
   - Give compliments
   - Pick up litter
3. **Call to Action**: Encouragement to participate
4. **Share Section**: User input for sharing ideas
5. **Footer**: Copyright and branding

## 💻 Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Tailwind CSS (via CDN)
- **JavaScript**: Vanilla JS (no frameworks)
- **Fonts**: Google Fonts (Heebo)

## 🔧 Customization

### Adding a New Language

1. Add translation data to `js/translations.js`:
```javascript
const translations = {
    // ... existing languages
    es: {
        hero: { title: "...", /* etc */ },
        // ... complete structure
    }
};
```

2. Add language button to `index.html`:
```html
<button data-lang="es" class="lang-btn ...">
    🇪🇸 Español
</button>
```

3. Add direction mapping to `js/app.js`:
```javascript
const langDirections = {
    // ... existing
    es: 'ltr'
};
```

### Changing Colors

Modify Tailwind config in `index.html` (line 40):
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'action-teal': '#YOUR_COLOR',
                // ... other colors
            }
        }
    }
}
```

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎓 Target Audience

Children aged 8-12 years old, with secondary audiences including:
- Teachers
- Parents
- Schools participating in Good Deeds Day

## 📝 License

© 2024 Good Deeds Day - For the generation changing the world

## 🙏 Credits

- Design: Based on Stitch AI-generated prototype
- Logo: Hands forming heart with colorful gradients
- Translation: Complete Hebrew, English, Russian content
- Development: Built with ❤️ for kids learning kindness
```

- [ ] **Step 2: Test README formatting**

```bash
cat README.md | head -20
```

Expected: README displays with proper markdown formatting

- [ ] **Step 3: Commit README documentation**

```bash
git add README.md
git commit -m "docs: add comprehensive README documentation

- Add quick start instructions
- Document project structure
- Include customization guide
- Add browser support information
- Document all features and sections

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 9: Final Testing and Validation

**Files:**
- Modify: None (testing only)

- [ ] **Step 1: Test all three languages**

```bash
open index.html
```

Test each language:
1. Click Hebrew button → verify RTL layout, Hebrew text
2. Click English button → verify LTR layout, English text
3. Click Russian button → verify LTR layout, Russian text

Expected: All languages display correctly with proper direction

- [ ] **Step 2: Test localStorage persistence**

1. Open `index.html` in browser
2. Switch to English
3. Close browser tab
4. Reopen `index.html`

Expected: Page opens in English (last selected language)

- [ ] **Step 3: Test mobile responsiveness**

Use Chrome DevTools Device Mode:
1. iPhone SE (375px) - portrait
2. iPad (768px) - portrait
3. iPad (1024px) - landscape
4. Desktop (1920px)

Expected: All layouts work correctly, language switcher adapts

- [ ] **Step 4: Test interactive elements**

Click all interactive elements:
1. Language switcher buttons (all 3)
2. CTA button ("אני בפנים! 🚀")
3. Share button ("שתפו אותנו! ✨")

Expected:
- Language switching works
- Alert messages appear in correct language
- All hover effects work smoothly

- [ ] **Step 5: Test browser compatibility**

Open in multiple browsers:
1. Chrome/Edge
2. Firefox
3. Safari (if on Mac)

Expected: All features work in all browsers

- [ ] **Step 6: Validate HTML**

```bash
# Optional: Use W3C HTML validator
open "https://validator.w3.org/#validate_by_upload"
```

Upload `index.html` and check for errors

Expected: No critical HTML errors

- [ ] **Step 7: Check console for JavaScript errors**

Open browser console (F12) and check for errors while:
1. Loading page
2. Switching languages
3. Clicking buttons

Expected: No JavaScript errors in console

- [ ] **Step 8: Test accessibility**

Check basic accessibility:
1. Tab through all interactive elements
2. Verify alt text on logo images
3. Check contrast ratios on language buttons

Expected: Keyboard navigation works, images have alt text

- [ ] **Step 9: Performance check**

Use Chrome DevTools Lighthouse:
1. Open DevTools → Lighthouse tab
2. Run audit for "Performance" and "Accessibility"

Expected:
- Performance score > 90
- Accessibility score > 90

- [ ] **Step 10: Create final test report commit**

```bash
git commit --allow-empty -m "test: complete final testing and validation

Tested scenarios:
- ✅ All three languages (Hebrew/English/Russian)
- ✅ RTL/LTR direction switching
- ✅ localStorage language persistence
- ✅ Mobile responsiveness (4 screen sizes)
- ✅ Interactive elements (buttons, alerts)
- ✅ Browser compatibility (Chrome/Firefox/Safari)
- ✅ HTML validation
- ✅ Console error check
- ✅ Basic accessibility
- ✅ Performance audit

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 10: Optional Confetti Enhancement

**Files:**
- Modify: `index.html:157-159`
- Modify: `js/app.js:handleCtaClick`

**Note**: This task is optional and adds a fun confetti effect when clicking the CTA button.

- [ ] **Step 1: Add canvas-confetti CDN**

Modify `index.html` before closing `</body>` tag (before other scripts):

```html
<!-- Optional: Canvas Confetti Library -->
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"></script>

<!-- Translation Data -->
<script src="js/translations.js"></script>
```

- [ ] **Step 2: Update handleCtaClick function**

Modify `js/app.js` function `handleCtaClick`:

```javascript
/**
 * Handle CTA button click with confetti effect
 */
function handleCtaClick() {
    const message = translations[currentLang].cta.alert;

    // Trigger confetti if library is loaded
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#2DD4BF', '#FDE047', '#FB923C', '#A78BFA']
        });
    }

    // Show success message
    setTimeout(() => {
        alert(message);
    }, 300);
}
```

- [ ] **Step 3: Test confetti effect**

```bash
open index.html
```

Click the CTA button ("אני בפנים! 🚀")

Expected: Confetti animation appears, then alert message

- [ ] **Step 4: Test without CDN (graceful degradation)**

Temporarily remove canvas-confetti script tag, reload page, click CTA button

Expected: Alert still works, no JavaScript errors (confetti simply doesn't appear)

- [ ] **Step 5: Restore CDN and commit enhancement**

```bash
git add index.html js/app.js
git commit -m "feat: add optional confetti effect to CTA button

- Add canvas-confetti library via CDN
- Trigger confetti on CTA button click
- Use project color palette for confetti
- Graceful degradation if library not loaded

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Plan Complete

Plan saved to: `docs/superpowers/plans/2026-03-10-multilingual-html-conversion.md`

**Summary:**
- ✅ 10 tasks total (9 required + 1 optional)
- ✅ Single-page HTML/JS/CSS solution
- ✅ Three languages with RTL/LTR support
- ✅ Logo integration (hero + footer)
- ✅ Mobile responsive
- ✅ localStorage persistence
- ✅ Complete documentation
- ✅ Testing and validation procedures

Ready to execute with @superpowers:subagent-driven-development
