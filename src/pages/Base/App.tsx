import React, {useEffect} from "react";
import {connect} from "react-redux";
import {silentLogIn} from "../../redux/auth/AuthActions";
import {StoreState} from "../../redux/Store";
import SnackbarWrapper from "../../components/Snackbar/SnackbarWrapper";
import {Pages} from "./Routes";
import PagePlaceholder from "../../components/PagePlaceholder";
import {getCurrentUser} from "../../redux/user/UserActions";
import User from "../../models/User";

interface AppProps {
    isLoggedIn?: boolean,
    silentLogIn: () => void
    getCurrentUser: () => void,
    currentUser?: User
}

const App = ({isLoggedIn, silentLogIn, getCurrentUser, currentUser}: AppProps) => {
    useEffect(() => {
        silentLogIn();
        getCurrentUser();
    }, [silentLogIn, getCurrentUser]);

    const app = isLoggedIn !== undefined && currentUser !== undefined ? (
        <Pages/>
    ) : <PagePlaceholder/>;
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
    const userState = state.user;
    return {
        isLoggedIn: authState.isLoggedIn,
        currentUser: userState.currentUser,
    };
}

const mapDispatchToProps = {
    silentLogIn: silentLogIn,
    getCurrentUser: getCurrentUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);