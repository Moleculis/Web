import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {uaFlagPath, usFlagPath} from "./utils/Assets";
import {getLanguage, setLanguage} from "./services/Storage";
import Language from "./utils/Language";
import translationEn from "./assets/locales/en/translation.json";
import translationUa from "./assets/locales/ua/translation.json";

const namespace: string = "translations";

export const getLanguageAsset = (language: Language | string): string | undefined => {
    switch (language) {
        case Language.en:
            return usFlagPath;
        case Language.ua:
            return uaFlagPath;
        default:
            return undefined;
    }
}

const currentLanguage: Language = getLanguage();

i18n.use(LanguageDetector).init({
    resources: {
        en: {
            translations: translationEn
        },
        ua: {
            translations: translationUa
        },
    },
    fallbackLng: currentLanguage,
    lng: currentLanguage,
    debug: true,

    ns: [namespace],
    defaultNS: namespace,

    keySeparator: false,

    interpolation: {
        escapeValue: false,
        formatSeparator: ","
    },
    react: {
        wait: true
    }
});

export const changeLanguage = async (language: Language): Promise<void> => {
    await i18n.changeLanguage(language);
    await setLanguage(language);
}

export default i18n;