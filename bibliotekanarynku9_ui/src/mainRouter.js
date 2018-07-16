import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Admin from './containers/Admin/Admin';
import Login from './containers/Login';
import Register from './containers/Register';
import HelloMessage from './containers/button/btn';

export default class MainRouter extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route path='/home' component={HelloMessage} />
                    <Route path='/admin' component={Admin} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Redirect path='*' to='/home' />
                </Switch>
            </main>
        );
    }
}
