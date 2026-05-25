import { ui } from './ui';
import { defaultLang, type Lang } from './languages';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function getLangFromUrl(url: URL): Lang {
  const path = url.pathname.replace(base, '');
  const [, lang] = path.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLocalizedPath(lang: Lang, path: string): string {
  return `${base}/${lang}${path}`;
}

export function getAlternateLang(lang: Lang): Lang {
  return lang === 'zh' ? 'en' : 'zh';
}
