import React from "react";
import {AuthState} from "../redux/auth/AuthReducer";
import {useSelector} from "react-redux";
import {StoreState} from "../redux/Store";
import {Route, useHistory} from "react-router-dom";

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

export {
    LoggedInRoute
}

export default Routes;