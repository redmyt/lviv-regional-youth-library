import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AdminButton from '../../components/AdminButton';

const style = {
    display: 'flex',
    flexDirection: 'column',
    width: '25%'
};

const btnStyle = {
    margin: '5%'
};

const buttonsWrapperStyle = {
    display: 'flex',
    justifyContent: 'center'
};

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
    }

    handleLoginButtonClick = () => {
        this.props.onLogin();
    }

    handleRegisterButtonClick = () => {
        this.props.onRegister();
    }

    handleInputChange = event => {
        this.props.onInputChange(event.target.value, event.target.name);
    }

    render() {
        return (
            <div style={style}>
                <FormControl margin='normal'>
                    <InputLabel>
                        Email
                    </InputLabel>
                    <Input
                        value={this.props.email}
                        name='email'
                        type='email'
                        error={!this.props.isValid}
                        onChange={this.handleInputChange}
                    />
                </FormControl>
                <FormControl margin='normal'>
                    <InputLabel>
                        Password
                    </InputLabel>
                    <Input
                        value={this.props.password}
                        name='password'
                        type='password'
                        error={!this.props.isValid}
                        onChange={this.handleInputChange}
                    />
                </FormControl>
                <div style={buttonsWrapperStyle}>
                    <AdminButton
                        style={btnStyle}
                        variant='contained'
                        color='primary'
                        text='Submit'
                        onClick={this.handleLoginButtonClick}
                    />
                    <AdminButton
                        style={btnStyle}
                        variant='outlined'
                        color='primary'
                        text='Register'
                        onClick={this.handleRegisterButtonClick}
                    />
                </div>
            </div>
        );
    }
}
