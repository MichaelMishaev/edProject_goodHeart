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
