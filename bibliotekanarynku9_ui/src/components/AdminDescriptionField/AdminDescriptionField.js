import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {splitTextToParagraphs} from '../../helpers';

const style = {
    margin: '10px 0'
};

export default class AdminDescriptionField extends React.Component {

    handleChange = event => {
        this.props.onDescriptionChange(event.target.value);
    }

    renderEditField = () => {
        return (
            this.props.description &&
            <div>
                <TextField
                    label={this.props.label}
                    value={this.props.description}
                    onChange={this.handleChange}
                    error={this.props.isError}
                    multiline={true}
                    fullWidth={true}
                />
            </div>
        );
    }

    renderLookUpField = () => {
        return (
            this.props.description &&
            <div>
                {
                    splitTextToParagraphs(this.props.description).map(paragraph => {
                        return (
                            <Typography component='p'>
                                {paragraph}
                            </Typography>
                        );
                    })
                }
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
