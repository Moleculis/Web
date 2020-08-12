import React, {ChangeEvent, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import formStyles from '../../styles/FormStyle';
import {Link as RouterLink, useHistory} from 'react-router-dom';
import Routes from '../../Routes';
import {useDispatch, useSelector} from 'react-redux';
import {StoreState} from '../../redux/Store';
import {AuthState} from '../../redux/auth/AuthReducer';
import {logInAction} from '../../redux/auth/AuthActions';

const SignIn = () => {
    const classes = formStyles();
    const authState: AuthState = useSelector((state: StoreState) => state.auth);

    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRememberMe, setRememberMe] = useState(false);

    const updateUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const updateRememberMe = (e: ChangeEvent<{}>, checked: boolean) => {
        setRememberMe(checked);
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(logInAction(username, password, isRememberMe));
    }
    const history = useHistory();
    useEffect(() => {
        if (authState.token) {
            history.push(Routes.home);
        }
    });

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component='h1' variant='h5'>
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={onSubmit}>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='username'
                        label='Username'
                        name='username'
                        value={username}
                        onChange={updateUsername}
                        autoFocus
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        value={password}
                        onChange={updatePassword}
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
                        disabled={authState.isLoading}
                    >
                        {authState.isLoading ? 'Loading...' : 'Sign In'}
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
                </form>
            </div>
        </Container>
    );
}

export default SignIn;