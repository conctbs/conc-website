export const SITE = {
  name: 'CONC Thammasat',
  site: import.meta.env.PUBLIC_SITE_URL ?? 'https://conc-website.vercel.app',
  base: '/',
  trailingSlash: false,
};

export const I18N = {
  language: 'th',
  textDirection: 'ltr',
};

export const UI = {
  theme: 'light:only',
};
