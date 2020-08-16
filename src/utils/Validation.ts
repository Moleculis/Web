const usernameRegexp = new RegExp(String.raw`^[a-zA-Z0-9]+$`);
// const emailRegexp = new RegExp(String.raw`^[a-zA-Z0-9.!#\\$%&’*+/=?^_\`{|}~-]+
// @[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*\\$`);

const checkUsernameValid = (value: string): string | undefined => {
    if (value.length < 4) {
        return "Username is too short";
    }
    if (value.length > 30) {
        return "Username is too long";
    }
    if (!usernameRegexp.test(value)) {
        return "Wrong username";
    }
    return undefined;
}

const checkPasswordValid = (value:string): string | undefined => {
    if(value.length < 8){
        return "Password is too short"
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
    checkPasswordValid
}