const tokenKey = 'accessToken';

const setToken = (token: string) => {
    localStorage.setItem(tokenKey, token);
}

const getToken = (): string | null => {
    return localStorage.getItem(tokenKey);
}

export {
    setToken,
    getToken
}