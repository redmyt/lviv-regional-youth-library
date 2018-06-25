import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import HelloMessage from './containers/button/btn';

export default class MainRouter extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route path='/home' component={HelloMessage} />
                    <Redirect path='*' to='/home' />
                </Switch>
            </main>
        );
    }
}
