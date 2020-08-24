import React, {ReactNode, useContext} from "react";
import {
    AppBar, Container,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    Toolbar,
    Typography
} from "@material-ui/core";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import HomeIcon from '@material-ui/icons/Home';
import {useHistory, useLocation} from "react-router-dom";
import Routes, {getLoggedInRouteTitle} from "./Routes";
import {useTranslation} from "react-i18next";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LanguageDropdown from "../../components/LanguageDropdown";
import DrawerItem from "./components/DrawerItem";
import {StoreState} from "../../redux/Store";
import {AuthState} from "../../redux/auth/AuthReducer";
import {logOutAction} from "../../redux/auth/AuthActions";
import {connect} from "react-redux";
import useLoggedInRouteStyles from "./styles/LoggedInRouteStyles";
import StoreListener from "../../redux/StoreListener";
import {SnackbarContext} from "../../components/Snackbar/SnackbarWrapper";


interface LoggedInRouteWrapperProps {
    children: ReactNode,
    isLoading: boolean,
    logOutAction: () => void
}

const LoggedInRouteWrapper = ({children, isLoading, logOutAction}: LoggedInRouteWrapperProps) => {
    const classes = useLoggedInRouteStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const {t} = useTranslation();

    const location = useLocation();

    const currentTitle: string = getLoggedInRouteTitle(location.pathname)

    const {openSnackBar} = useContext(SnackbarContext);
    const history = useHistory();

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <StoreListener<StoreState, AuthState>
                mapper={(state) => state.auth}
                listener={
                    (dispatch, currentState) => {
                        if (currentState.error) {
                            openSnackBar(currentState.error, "error");
                        } else if (!currentState.isLoggedIn) {
                            history.push(Routes.signIn, {message: currentState.message});
                        }
                    }
                }>
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            component="h1" variant="h6" color="inherit"
                            noWrap className={classes.title}>
                            {currentTitle}
                        </Typography>
                        <LanguageDropdown iconColor="white"/>
                        <IconButton color="inherit" onClick={logOutAction} disabled={isLoading}>
                            <ExitToAppIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        <DrawerItem goToRoute={Routes.home} icon={<HomeIcon/>} text={t("home")}/>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Container maxWidth="lg" className={classes.container}>
                        <>
                            {children}
                        </>
                    </Container>
                </main>
            </StoreListener>
        </div>
    );
};

const mapStateToProps = (state: StoreState) => {
    const authState: AuthState = state.auth;
    return {
        isLoading: authState.isLoading,
    };
}

const mapDispatchToProps = {
    logOutAction: logOutAction
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInRouteWrapper);