export type Locales = 'ru' | 'en' | 'zh';

const getLocale = (locale: Locales) => {
  switch (locale) {
    case 'ru':
      return 'en-US';
    case 'en':
      return 'en-US';
    case 'zh':
      return 'zh';
    default:
      return 'en-US';
  }
};

export default getLocale;
