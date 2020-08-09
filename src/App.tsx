import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Routes from "./Routes";

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path={Routes.home} exact component={SignIn}/>
                    <Route path={Routes.signIn} component={SignIn}/>
                    <Route path={Routes.signUp} component={SignUp}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;