import React, {useEffect} from "react";
import {connect} from "react-redux";
import {silentLogIn} from "../../redux/auth/AuthActions";
import {StoreState} from "../../redux/Store";
import SnackbarWrapper from "../../components/Snackbar/SnackbarWrapper";
import {Pages} from "./Routes";
import PagePlaceholder from "../../components/PagePlaceholder";
import {getCurrentUser} from "../../redux/user/UserActions";
import User from "../../models/User";
import AlertDialogWrapper from "../../assets/AlertDialog/AlertDialogWrapper";

interface AppProps {
    isLoggedIn?: boolean,
    silentLogIn: () => void
    getCurrentUser: () => void,
    currentUser?: User
}

const App = ({isLoggedIn, silentLogIn, getCurrentUser, currentUser}: AppProps) => {
    useEffect(() => {
        silentLogIn();
        if (isLoggedIn !== undefined && isLoggedIn && !currentUser) {
            getCurrentUser();
        }
    }, [silentLogIn, getCurrentUser, isLoggedIn, currentUser]);

    const app = isLoggedIn !== undefined &&
    ((isLoggedIn && currentUser !== undefined) || !isLoggedIn) ? (
        <Pages/>
    ) : <PagePlaceholder/>;
    return (
        <div className="App">
            <AlertDialogWrapper>
                <SnackbarWrapper>
                    {app}
                </SnackbarWrapper>
            </AlertDialogWrapper>
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