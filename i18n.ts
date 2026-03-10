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
