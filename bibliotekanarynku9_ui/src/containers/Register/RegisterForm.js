import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AdminSubmitButton from '../../components/adminSubmitButton';

const style = {
    display: 'flex',
    flexDirection: 'column',
    width: '25%'
};

const btnStyle = {
    margin: '5%'
};

export default class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
    }

    handleButtonClick = () => {
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
                        First Name
                    </InputLabel>
                    <Input
                        value={this.props.firstName}
                        name='firstName'
                        type='text'
                        error={!this.props.isValid}
                        onChange={this.handleInputChange}
                    />
                </FormControl>
                <FormControl margin='normal'>
                    <InputLabel>
                        Last Name
                    </InputLabel>
                    <Input
                        value={this.props.lastName}
                        name='lastName'
                        type='text'
                        error={!this.props.isValid}
                        onChange={this.handleInputChange}
                    />
                </FormControl>
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
                <FormControl margin='normal'>
                    <InputLabel>
                        Confirm Password
                    </InputLabel>
                    <Input
                        value={this.props.confirmPassword}
                        name='confirmPassword'
                        type='password'
                        error={!this.props.isValid || !this.props.doPasswordsMatch}
                        onChange={this.handleInputChange}
                    />
                </FormControl>
                <AdminSubmitButton
                    style={btnStyle}
                    onClick={this.handleButtonClick}
                />
            </div>
        );
    }
}
