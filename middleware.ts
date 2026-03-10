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
