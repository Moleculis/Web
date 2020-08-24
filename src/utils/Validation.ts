import {t} from "../i18n";

const usernameRegexp = new RegExp(/^[a-zA-Z0-9]+$/);
const emailRegexp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

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

const checkNotEmpty = (value: string, fieldName: string): string | undefined => {
    if (removeSpaces(value) === "") {
        return t("value_empty", {fieldName: fieldName});
    }
    return undefined;
}

const removeSpaces = (value: string): string => {
    let newValue: string = value.trim();
    newValue = newValue.replace(/\s/g, "");
    return newValue;
}

export {
    checkUsernameValid,
    checkPasswordValid,
    checkEmailValid,
    checkNotEmpty
}