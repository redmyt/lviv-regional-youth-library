import React from 'react';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {formatDateToView, formatDateToPicker} from '../../helpers';
import TextField from '@material-ui/core/TextField';

const style = {
    margin: '10px 0'
};

const labelStyle = {
    fontWeight: 'bold'
};

export default class AdminDateField extends React.Component {

    handleChange = event => {
        this.props.onDateChange(event.target.value);
    }

    renderEditField = () => {
        return (
            <div>
                <TextField
                    label={this.props.label}
                    type="datetime-local"
                    value={formatDateToPicker(this.props.date)}
                    InputLabelProps={{
                        shrink: true
                    }}
                    onChange={this.handleChange}
                />
            </div>
        )
    }

    renderLookUpField = () => {
        return (
            <div>
                <Typography component="p">
                    <span style={labelStyle}> {this.props.label}: </span>
                    {formatDateToView(this.props.date)}
                </Typography>
            </div>
        )
    }

    render() {
        return (
            <div style={style}>
                {this.props.isEdit ? this.renderEditField() : this.renderLookUpField()}
            </div>
        )
    }
}
