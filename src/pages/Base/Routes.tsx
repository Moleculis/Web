import React from "react";
import {AuthState} from "../../redux/auth/AuthReducer";
import {useSelector} from "react-redux";
import {StoreState} from "../../redux/Store";
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import LanguageDropdown from "../../components/LanguageDropdown";
import Home from "../Home";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import SendResetPass from "../SendResetPass";
import ResetPass from "../ResetPass";
import RegistrationConfirm from "../RegistrationConfirm";

interface RouteProps {
    exact?: boolean,
    path: string,
    component: React.ComponentType<any>
}

const homeEndpoint = '/';
const signInEndpoint = "/sign-in";
const signUpEndpoint = "/sign-up";
const sendResetPassEndpoint = "/send-reset-pass";
const resetPassEndpoint = "/reset-pass";
const registrationConfirmEndpoint = "/registration-confirm";

const Routes = {
    home: homeEndpoint,
    signIn: signInEndpoint,
    signUp: signUpEndpoint,
    sendResetPass: sendResetPassEndpoint,
    resetPass: resetPassEndpoint,
    registrationConfirm: registrationConfirmEndpoint
};

export const Pages = () => {
    return (
        <>
            <Router>
                <Switch>
                    <LoggedInRoute path={Routes.home} exact component={Home}/>
                    <AuthRoute path={Routes.signIn} component={SignIn}/>
                    <AuthRoute path={Routes.signUp} component={SignUp}/>
                    <AuthRoute path={Routes.sendResetPass} component={SendResetPass}/>
                    <AuthRoute path={Routes.resetPass} component={ResetPass}/>
                    <Route path={Routes.registrationConfirm} component={RegistrationConfirm}/>
                </Switch>
            </Router>
        </>
    );
}

const LoggedInRoute = ({component: Component}: RouteProps) => {
    const authState: AuthState = useSelector((state: StoreState) => state.auth);
    const history = useHistory();
    if (!authState.isLoggedIn) {
        history.push(Routes.signIn);
    }
    return (
        <>
            <Route render={otherProps => (
                <>
                    <Component {...otherProps} />
                </>
            )}/>
        </>
    );
};

const AuthRoute = ({component: Component}: RouteProps) => {
    return (
        <>
            <Route render={otherProps => (
                <>
                    <LanguageDropdown/>
                    <Component {...otherProps} />
                </>
            )}/>
        </>
    );
};

export default Routes;