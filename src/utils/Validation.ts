import {t} from "../i18n";

const usernameRegexp = new RegExp(String.raw`^[a-zA-Z0-9]+$`);
const emailRegexp = new RegExp(String.raw`^[a-zA-Z0-9.!#\\$%&’*+/=?^_\`{|}~-]+
@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*\\$`);

const checkUsernameValid = (value: string): string | undefined => {
    if (value.length < 4) {
        return t("username_short");
    }
    if (value.length > 30) {
        return t("username_long");
    }
    if (!usernameRegexp.test(value)) {
        return t("username_wrong");
    }
    return undefined;
}

const checkPasswordValid = (value: string): string | undefined => {
    if (value.length < 8) {
        return t("password_short");
    }
    return undefined;
}

const checkEmailValid = (value: string): string | undefined => {
    if (!emailRegexp.test(value)) {
        return t("wrong_email");
    }
    return undefined;
}

// const prepareString = (value: string): string =>{
//     let newValue:string = value.trim();
//     newValue = newValue.replace(/\s\s+/g, " ");
//     return newValue;
// }

export {
    checkUsernameValid,
    checkPasswordValid,
    checkEmailValid
}