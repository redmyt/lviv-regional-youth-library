import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {formatDateToView, formatDateToPicker} from '../../helpers';

const baseStyle = {
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
                    error={this.props.isError}
                    type= {this.props.dateType ? 'date' : 'datetime-local'}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </div>
        );
    }

    renderLookUpField = () => {
        return (
            <div>
                <Typography component='p' variant='subheading'>
                    <span style={labelStyle}> {this.props.label}: </span>
                    {formatDateToView(this.props.date)}
                </Typography>
            </div>
        );
    }

    render() {
        const style = this.props.style ? Object.assign(this.props.style, baseStyle) : baseStyle;
        return (
            <div style={style}>
                {this.props.isEdit ? this.renderEditField() : this.renderLookUpField()}
            </div>
        );
    }
}
