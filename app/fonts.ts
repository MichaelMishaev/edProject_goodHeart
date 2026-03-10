import { Heebo } from 'next/font/google';

export const heebo = Heebo({
  subsets: ['latin', 'hebrew'],
  weight: ['400', '700', '900'],
  variable: '--font-heebo',
  display: 'swap',
});
