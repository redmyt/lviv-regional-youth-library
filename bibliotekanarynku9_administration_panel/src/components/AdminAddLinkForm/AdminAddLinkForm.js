import React from 'react';
import TextField from '@material-ui/core/TextField';
import AdminButton from '../AdminButton';
import {getUpdatedState} from '../../helpers';

const linkInputStyle = {
    margin: '0 15px'
};

const addLinkBlockStyle = {
    display: 'flex',
    alignItems: 'baseline',
    marginBottom: 10
};

class AdminAddLinkForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            label: '',
            href: ''
        };
    }

    handleAddLinkInputChange = event => {
        const newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(getUpdatedState(newState, this.state));
    }

    handleAddLinkClick = () => {
        this.props.onAddLinkClick(this.state.label, this.state.href);
        this.setState(getUpdatedState({
            label: '',
            href: ''
        }, this.state));
    }

    render() {
        return (
            <div style={addLinkBlockStyle}>
                <TextField
                    style={linkInputStyle}
                    name='label'
                    label='label'
                    value={this.state.label}
                    onChange={this.handleAddLinkInputChange}
                    error={this.props.isError}
                />
                <TextField
                    style={linkInputStyle}
                    name='href'
                    label='href'
                    value={this.state.href}
                    onChange={this.handleAddLinkInputChange}
                    error={this.props.isError}
                />
                <AdminButton
                    size='small'
                    color='primary'
                    variant='contained'
                    onClick={this.handleAddLinkClick}
                    text={'Add Link'}
                />
            </div>
        );
    }
}

export default AdminAddLinkForm;
