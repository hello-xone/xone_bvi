import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

const langFiles = import.meta.glob("../public/locales/*.json", { eager: true });
export const supportedLngs = Object.keys(langFiles).map(key => key.replace(/^.*\/([^/]+)\.json$/, '$1'));

export const langs = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "ja",
    label: "日本語",
  },
  {
    value: "ko",
    label: "한국어",
  },
  {
    value: "ms",
    label: "Bahasa Melayu",
  },
  {
    value: "th",
    label: "แบบไทย",
  },
  {
    value: "vi",
    label: "Tiếng Việt",
  },
  {
    value: "zh-TW",
    label: "繁體中文",
  },
  {
    value: "zh-CN",
    label: "简体中文",
  },
];


export const changeLanguage = async (type: (typeof supportedLngs)[number]) => {
  const res = await i18n.changeLanguage(type);
  return res;
};

if (typeof window !== 'undefined') {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      supportedLngs,
      debug: process.env.NODE_ENV === 'development',
      detection: {
        order: ['path', 'cookie', 'navigator'],
        lookupFromPathIndex: 0,
        caches: ['cookie'],
      },
      backend: {
        loadPath: '/locales/{{lng}}.json',
      },
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n;