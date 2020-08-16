import React, {useEffect} from "react";
import {connect} from "react-redux";
import {silentLogIn} from "../../redux/auth/AuthActions";
import {StoreState} from "../../redux/Store";
import SnackbarWrapper from "../../components/Snackbar/SnackbarWrapper";
import {Pages} from "./Routes";

interface AppProps {
    isLoggedIn?: boolean,
    silentLogIn: () => void
}

const App = ({isLoggedIn, silentLogIn}: AppProps) => {
    useEffect(() => {
        silentLogIn();
    }, [silentLogIn]);

    const app = isLoggedIn !== undefined ? (
        <Pages/>
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