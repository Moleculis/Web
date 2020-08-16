import React, {useEffect} from "react";
import {BrowserRouter as Router, Switch} from "react-router-dom";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Routes, {AuthRoute, LoggedInRoute} from "../utils/Routes";
import Home from "./Home/Home";
import {connect} from "react-redux";
import {silentLogIn} from "../redux/auth/AuthActions";
import {StoreState} from "../redux/Store";
import SnackbarWrapper from "../components/SnackbarWrapper";

interface AppProps {
    isLoggedIn?: boolean,
    silentLogIn: () => void
}

const App = ({isLoggedIn, silentLogIn}: AppProps) => {
    useEffect(() => {
        silentLogIn();
    }, [silentLogIn]);

    const app = isLoggedIn !== undefined ? (
        <Router>
            <Switch>
                <LoggedInRoute path={Routes.home} exact component={Home}/>
                <AuthRoute path={Routes.signIn} component={SignIn}/>
                <AuthRoute path={Routes.signUp} component={SignUp}/>
            </Switch>
        </Router>
    ) : null;
    return (
        <div className="App">
            <SnackbarWrapper>
                {app}
            </SnackbarWrapper>
        </div>
    );
}

const mapStateToProps = (state: StoreState) => {
    const authState = state.auth;
    return {isLoggedIn: authState.isLoggedIn};
}

const mapDispatchToProps = {
    silentLogIn: silentLogIn
}

export default connect(mapStateToProps, mapDispatchToProps)(App);