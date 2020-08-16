import i18n from "i18next";
import {getLanguage, setLanguage} from "./services/Storage";
import Language from "./utils/Language";
import translationEn from "./assets/locales/en/translation.json";
import translationUa from "./assets/locales/ua/translation.json";
import {initReactI18next} from "react-i18next";

const namespace: string = "translations";

const currentLanguage: Language = getLanguage();

i18n.use(initReactI18next).init({
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

export const t = i18n.t.bind(i18n);

export const changeLanguage = async (language: Language): Promise<void> => {
    await i18n.changeLanguage(language);
    await setLanguage(language);
}

export default i18n;