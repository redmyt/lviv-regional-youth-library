import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {formatDateToView, formatDateToPicker} from '../../helpers';

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
                    value={formatDateToPicker(this.props.date)}
                    onChange={this.handleChange}
                    type='datetime-local'
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </div>
        )
    }

    renderLookUpField = () => {
        return (
            <div>
                <Typography component='p'>
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
