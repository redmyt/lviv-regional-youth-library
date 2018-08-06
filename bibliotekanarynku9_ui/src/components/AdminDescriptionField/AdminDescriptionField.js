import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {getUpdatedState, splitTextToParagraphs} from '../../helpers';

const style = {
    margin: '10px 0'
};

export default class AdminDescriptionField extends React.Component {

    handleChange = event => {
        this.props.onDescriptionChange(event.target.value);
    }

    renderEditField = () => {
        return (
            <div>
                <TextField
                    label='Description'
                    error={this.props.isError}
                    multiline={true}
                    fullWidth={true}
                    value={this.props.description}
                    onChange={this.handleChange}
                />
            </div>
        )
    }

    renderLookUpField = () => {
        return (
            <div>
                {
                    splitTextToParagraphs(this.props.description).map(paragraph => {
                        return (
                            <Typography component="p">
                                {paragraph}
                            </Typography>
                        )
                    })
                }
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
