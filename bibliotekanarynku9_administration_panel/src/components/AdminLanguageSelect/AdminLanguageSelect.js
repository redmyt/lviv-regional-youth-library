
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {getUpdatedState} from '../../helpers';

const baseStyle = {
    display: 'flex'
};

const selectStyle = {
    width: '100%'
};

export default class AdminLanguageSelect extends React.Component {

    handleSelectChange = event => {
        this.props.onLanguageChange(event.target.value);
    }

    render() {
        const style = this.props.style ? Object.assign(this.props.style, baseStyle) : baseStyle;
        return (
            <div style={style}>
                <FormControl style={selectStyle}>
                    <InputLabel>Language</InputLabel>
                    <Select
                        onChange={this.handleSelectChange}
                        value={this.props.language}
                    >
                        <MenuItem value='uk'>Ukrainian</MenuItem>
                        <MenuItem value='en'>English</MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
    }
}
