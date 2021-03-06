import Language from "../utils/Language";

const tokenKey = "accessToken";
const languageKey = "language";

const setToken = (token: string, isRememberMe: boolean) => {
    if (isRememberMe) {
        localStorage.setItem(tokenKey, token);
    } else {
        sessionStorage.setItem(tokenKey, token);
    }
}

const getToken = (): string | null => {
    let token: string | null;
    token = localStorage.getItem(tokenKey);
    if (!token) {
        token = sessionStorage.getItem(tokenKey);
    }
    return token;
}

const removeToken = () => {
    localStorage.removeItem(tokenKey);
    sessionStorage.removeItem(tokenKey);
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
    getLanguage,
    removeToken
}