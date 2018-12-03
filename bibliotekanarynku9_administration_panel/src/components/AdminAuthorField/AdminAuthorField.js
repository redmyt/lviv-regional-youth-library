import React from 'react';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const style = {
    margin: '10px 0'
};

export default class AdminAuthorField extends React.Component {

    handleChange = event => {
        this.props.onAuthorChange(event.target.value);
    }

    renderEditField = () => {
        return (
            <div>
                <FormControl>
                    <InputLabel>{this.props.label}</InputLabel>
                    <Input
                        value={this.props.author}
                        onChange={this.handleChange}
                        error={this.props.isError}
                    />
                </FormControl>
            </div>
        );
    }

    renderLookUpField = () => {
        return (
            this.props.author &&
            <div>
                <Typography component='p'>
                    Author: {this.props.author}
                </Typography>
            </div>
        );
    }

    render() {
        return (
            <div style={style}>
                {this.props.isEdit ? this.renderEditField() : this.renderLookUpField()}
            </div>
        );
    }
}
