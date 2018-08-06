import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Login from './containers/Login';
import Register from './containers/Register';
import Admin from './containers/Admin';

export default class MainRouter extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/admin' component={Admin} />
                    <Redirect path='*' to='/admin' />
                </Switch>
            </main>
        );
    }
}
