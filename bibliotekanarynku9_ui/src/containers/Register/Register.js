import React from 'react';
import {withRouter} from 'react-router';
import RegisterForm from './RegisterForm';
import RegisterMessage from './RegisterMessage';
import {postRegisterService} from './registerService';
import {getUpdatedState, isLogged} from '../../helpers';

const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
};

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            isDataValid: true,
            doPasswordsMatch: true,
            isRegistered: false || isLogged()
        };
    }

    handleCredentialFieldChange = (value, fieldName) => {
        const changesObj = {
            [fieldName]: value,
            isDataValid: true,
        };
        const nextState = getUpdatedState(changesObj, this.state);
        this.setState(getUpdatedState({
            doPasswordsMatch: nextState.password === nextState.confirmPassword
        }, nextState));
    }

    handleRegister = () => {
        postRegisterService(
            this.state.firstName,
            this.state.lastName,
            this.state.email,
            this.state.password
        ).then(response => {
            if (response.status === 201) {
                this.setState(getUpdatedState({isRegistered: true}, this.state));
            }
        }).catch(() => {
            this.setState(getUpdatedState({isDataValid: false}, this.state));
        });
    }

    renderRegisterForm = () => {
        return (
            <div style={style}>
                <RegisterForm
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    password={this.state.password}
                    confirmPassword={this.state.confirmPassword}
                    isValid={this.state.isDataValid}
                    doPasswordsMatch={this.state.doPasswordsMatch}
                    onInputChange={this.handleCredentialFieldChange}
                    onRegister={this.handleRegister}
                />
            </div>
        );
    }

    renderMessage = () => {
        return (
            <div>
                <RegisterMessage />
            </div>
        );
    }

    render() {
        const element = this.state.isRegistered ? this.renderMessage() : this.renderRegisterForm();
        return (
            element
        );
    }
}

export default withRouter(Register);
