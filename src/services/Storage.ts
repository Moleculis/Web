import Language from "../utils/Language";

const tokenKey = "accessToken";
const languageKey = "language";

const setToken = (token: string) => {
    localStorage.setItem(tokenKey, token);
}

const getToken = (): string | null => {
    return localStorage.getItem(tokenKey);
}

const setLanguage = (language: Language) => {
    localStorage.setItem(languageKey, language);
}

const getLanguage = (): Language => {
    const languageItem = localStorage.getItem(languageKey);
    return languageItem ? stringToLanguage(languageItem) : Language.en;
}

const stringToLanguage = (value: string): Language => {
    return Language[value as keyof typeof Language];
}

export {
    setToken,
    getToken,
    setLanguage,
    getLanguage
}