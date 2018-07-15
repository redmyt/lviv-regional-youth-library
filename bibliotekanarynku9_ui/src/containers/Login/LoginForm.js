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


export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
    }

    handleButtonClick = () => {
        this.props.onLogin();
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
                <AdminSubmitButton
                    style={btnStyle}
                    onClick={this.handleButtonClick}
                />
            </div>
        );
    }
}
