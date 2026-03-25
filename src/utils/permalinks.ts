import { SITE } from '~/theme-config';

export const trimSlash = (value = '') => value.replace(/^\/+|\/+$/g, '');

const createPath = (...params: string[]) => {
  const paths = params.map((item) => trimSlash(item)).filter(Boolean).join('/');
  return '/' + paths + (SITE.trailingSlash && paths ? '/' : '');
};

const BASE_PATHNAME = SITE.base || '/';

export const getCanonical = (path = ''): string | URL => {
  const url = String(new URL(path, SITE.site));
  if (SITE.trailingSlash === false && path && url.endsWith('/')) {
    return url.slice(0, -1);
  }
  if (SITE.trailingSlash === true && path && !url.endsWith('/')) {
    return `${url}/`;
  }
  return url;
};

export const getPermalink = (slug = ''): string => {
  if (
    slug.startsWith('https://') ||
    slug.startsWith('http://') ||
    slug.startsWith('://') ||
    slug.startsWith('#') ||
    slug.startsWith('javascript:')
  ) {
    return slug;
  }

  return createPath(BASE_PATHNAME, slug);
};

export const getHomePermalink = (): string => getPermalink('/');

export const getAsset = (path: string): string =>
  '/' +
  [BASE_PATHNAME, path]
    .map((item) => trimSlash(item))
    .filter(Boolean)
    .join('/');
