import React, {ReactNode, useContext, useEffect} from "react";
import {
    AppBar, Container,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List, ListSubheader,
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
import BackupIcon from '@material-ui/icons/Backup';
import {UserState} from "../../redux/user/UserReducer";
import Role from "../../models/enums/Role";
import {resetToInitial} from "../../redux/user/UserActions";
import User from "../../models/User";


interface LoggedInRouteWrapperProps {
    children: ReactNode,
    isLoading: boolean,
    logOutAction: () => void,
    resetToInitial: () => void,
    currentUserRoles?: Role[],
    currentUser?: User
}

let logOutMessage: string | undefined;

const LoggedInRouteWrapper = ({
                                  children, isLoading,
                                  logOutAction, currentUserRoles,
                                  resetToInitial, currentUser
                              }: LoggedInRouteWrapperProps) => {
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
    console.log(history.location.pathname);
    useEffect(() => {
        if (!currentUser) {
            history.push(Routes.signIn, {message: logOutMessage});
        }
    });

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <StoreListener<StoreState, AuthState>
                mapper={(state) => state.auth}
                listener={
                    (dispatch, authState) => {
                        if (authState.error) {
                            openSnackBar(authState.error, "error");
                        } else if (!authState.isLoggedIn) {
                            logOutMessage = authState.message;
                            resetToInitial();
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
                    <Divider/>
                    {currentUserRoles ? currentUserRoles.includes(Role.ROLE_ADMIN) && (
                        <>
                            <ListSubheader inset>{t("administration")}</ListSubheader>
                            <List>
                                <DrawerItem goToRoute={Routes.databaseBackup} icon={<BackupIcon/>}
                                            text={t("db_backup")}/>
                            </List>
                        </>
                    ) : undefined}
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
    const userState: UserState = state.user;
    return {
        isLoading: authState.isLoading,
        currentUserRoles: userState.currentUser?.roles,
        currentUser: userState.currentUser
    };
}

const mapDispatchToProps = {
    logOutAction: logOutAction,
    resetToInitial: resetToInitial
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInRouteWrapper);