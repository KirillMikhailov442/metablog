import { locales } from './i18n';
import { LocalePrefix, Pathnames } from 'next-intl/routing';
import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';

type Locale = typeof locales;

const pathnames: Pathnames<Locale> = {
  '/': '/',
  '/about': '/about',
  '/subjects/*': '/subjects/*',
  '/lectures': '/lectures',
  '/lectures/*': '/lectures/*',
  '/contact': '/contact',
  '/*': '/*',
};

const localePrefix: LocalePrefix<Locale> = 'always';

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
    localePrefix,
  });
