import React, {ChangeEvent, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import formStyles from '../../styles/FormStyle';
import {Link as RouterLink, useHistory, useLocation} from 'react-router-dom';
import Routes from '../../utils/Routes';
import {connect} from 'react-redux';
import {logInAction} from '../../redux/auth/AuthActions';
import {StoreState} from "../../redux/Store";
import {AuthState} from "../../redux/auth/AuthReducer";
import ProjectSnackbar from "../../components/ProjectSnackbar";
import TextFormField from "../../components/Form/TextFormField";
import Form from "../../components/Form/Form";
import {checkPasswordValid, checkUsernameValid} from "../../utils/Validation";

interface SignInProps {
    isLoading: boolean,
    isLoggedIn?: boolean,
    logInAction: (username: string, password: string, isRememberMe: boolean) => void,
}

interface SignInLocationState {
    message?: string
}

let message: string | undefined;

interface SignInState {
    isSnackbarOpen: boolean,
    username: string,
    password: string,
    isRememberMe: boolean
}

const SignIn = ({isLoading, isLoggedIn, logInAction}: SignInProps) => {
    const classes = formStyles();

    const location = useLocation();
    const shackBarMessage: string | undefined = (location.state as SignInLocationState)?.message;
    if (!message) {
        message = shackBarMessage;
    }

    const [state, setState] = useState({
        isSnackbarOpen: !!shackBarMessage,
        username: '',
        password: '',
        isRememberMe: false,
    } as SignInState);

    const {isSnackbarOpen, username, password, isRememberMe} = state;

    const handleSnackbarClose = () => {
        setState({...state, isSnackbarOpen: false});
        message = undefined;
    }

    const updateUsername = (value: string) => {
        setState({...state, username: value});
    }

    const updatePassword = (value: string) => {
        setState({...state, password: value});
    }

    const updateRememberMe = (e: ChangeEvent<{}>, checked: boolean) => {
        setState({...state, isRememberMe: checked});
    }

    const onSubmit = () => {
        logInAction(username, password, isRememberMe);
    }
    const history = useHistory();
    useEffect(() => {
        if (isLoggedIn) {
            history.push(Routes.home);
        }
        if (shackBarMessage) {
            history.replace({});
        }
    });

    return (
        <Container component='main' maxWidth='xs'>
            <ProjectSnackbar open={isSnackbarOpen} message={message} severity={'success'}
                             handleClose={handleSnackbarClose}/>
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component='h1' variant='h5'>
                    Sign in
                </Typography>
                <Form className={classes.form} onSubmit={onSubmit}>
                    <TextFormField
                        required
                        autoFocus
                        label='Username'
                        validation={checkUsernameValid}
                        value={username}
                        onChange={updateUsername}
                    />
                    <TextFormField
                        required
                        label='Password'
                        type='password'
                        value={password}
                        onChange={updatePassword}
                        validation={checkPasswordValid}
                        autoComplete='current-password'
                    />
                    <FormControlLabel
                        control={<Checkbox value='remember' color='primary'/>}
                        label='Remember me'
                        checked={isRememberMe}
                        onChange={updateRememberMe}
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Sign In'}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link variant='body2'>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link variant='body2' component={RouterLink} to={Routes.signUp}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Form>
            </div>
        </Container>
    );
}

const mapStateToProps = (state: StoreState) => {
    const authState: AuthState = state.auth;
    return {
        isLoading: authState.isLoading,
        isLoggedIn: authState.isLoggedIn
    };
}

const mapDispatchToProps = {
    logInAction: logInAction
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);