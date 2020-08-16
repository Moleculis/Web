import React from "react";
import {AuthState} from "../redux/auth/AuthReducer";
import {useSelector} from "react-redux";
import {StoreState} from "../redux/Store";
import {Route, useHistory} from "react-router-dom";
import LanguageDropdown from "../components/LanguageDropdown";

interface RouteProps {
    exact?: boolean,
    path: string,
    component: React.ComponentType<any>
}

const homeEndpoint = '/';
const signInEndpoint = "/sign-in";
const signUpEndpoint = "/sign-up";

const Routes = {
    home: homeEndpoint,
    signIn: signInEndpoint,
    signUp: signUpEndpoint
};

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

export {
    LoggedInRoute,
    AuthRoute
}

export default Routes;