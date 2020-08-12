import React, {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Routes from './Routes';
import Home from "./pages/Home/Home";
import {AuthState} from "./redux/auth/AuthReducer";
import {useDispatch, useSelector} from "react-redux";
import {StoreState} from "./redux/Store";
import {silentLogIn} from "./redux/auth/AuthActions";

interface RouteProps {
    exact?: boolean;
    path: string;
    component: React.ComponentType<any>;
}

const App: React.FC = () => {
    const authState: AuthState = useSelector((state: StoreState) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(silentLogIn());
    }, [dispatch]);

    const app = authState.isLoggedIn !== undefined ? (
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

const LoggedInRoute = ({component: Component, ...otherProps}: RouteProps) => {
    const authState: AuthState = useSelector((state: StoreState) => state.auth);
    const history = useHistory();
    if (!authState.token) {
        history.push(Routes.signIn);
    }
    return (
        <>
            <Route render={otherProps => (
                <>
                    <Component {...otherProps} />
                </>
            )}
            />
        </>
    );
};

export default App;