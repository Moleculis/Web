const AuthActionTypes = {
    logIn: "LOG_IN"
};

const logInAction = (username: string, password: string) => {
    return {type: AuthActionTypes.logIn, username, password};
};

export {
    AuthActionTypes,
    logInAction
}