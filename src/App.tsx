import React, {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Routes, {LoggedInRoute} from './Routes';
import Home from "./pages/Home/Home";
import {connect} from "react-redux";
import {silentLogIn} from "./redux/auth/AuthActions";
import {StoreState} from "./redux/Store";

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
                <Route path={Routes.signIn} component={SignIn}/>
                <Route path={Routes.signUp} component={SignUp}/>
            </Switch>
        </Router>
    ) : null;
    return (
        <div className='App'>
            {app}
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