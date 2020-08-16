import {uaFlagPath, usFlagPath} from "./Assets";

enum Language {
    en = "en",
    ua = "ua"
}

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

export const getLanguageName = (language: Language | string): string | undefined => {
    switch (language) {
        case Language.en:
            return "English";
        case Language.ua:
            return "Українська";
        default:
            return undefined;
    }
}

export default Language;