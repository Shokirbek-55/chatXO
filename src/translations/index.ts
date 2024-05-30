import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { en } from './en';
import { de } from './de';
import { es } from './es';
import { fr } from './fr';
import { it } from './it';
import { pt } from './pt';

i18n.use(LanguageDetector)

    .use(initReactI18next)

    .init({
        debug: false,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: {
                    ...en,
                },
            },
            de: {
                translation: {
                    ...de,
                },
            },
            es: {
                translation: {
                    ...es,
                },
            },
            fr: {
                translation: {
                    ...fr,
                },
            },
            it: {
                translation: {
                    ...it,
                },
            },
            pt: {
                translation: {
                    ...pt,
                },
            },
        },
    });

export default i18n;
