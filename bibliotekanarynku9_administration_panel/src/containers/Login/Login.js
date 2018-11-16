import React from 'react';
import {withRouter} from 'react-router';
import LoginForm from './LoginForm';
import LoginMessage from './LoginMessage';
import {postLoginService} from './loginService';
import {getUpdatedState, isLogged} from '../../helpers';

const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
};

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isDataValid: true
        };
    }

    handleCredentialFieldChange = (value, fieldName) => {
        const changesObj = {
            [fieldName]: value,
            isDataValid: true
        };
        this.setState(getUpdatedState(changesObj, this.state));
    }

    handleLogin = () => {
        postLoginService(this.state.email, this.state.password).then(response => {
            if (response.status === 200) {
                this.props.history.push('/admin');
            }
        }).catch(() => {
            this.setState(getUpdatedState({isDataValid: false}, this.state));
        });
    }

    renderLoginForm = () => {
        return (
            <div style={style}>
                <LoginForm
                    email={this.state.email}
                    password={this.state.password}
                    isValid={this.state.isDataValid}
                    onInputChange={this.handleCredentialFieldChange}
                    onLogin={this.handleLogin}
                />
            </div>
        );
    }

    renderMessage = () => {
        return (
            <div>
                <LoginMessage />
            </div>
        );
    }

    render() {
        const element = isLogged() ? this.renderMessage() : this.renderLoginForm();
        return (
            element
        );
    }
}

export default withRouter(Login);
