import React from 'react';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import Link from '@material-ui/icons/Link';
import AdminButton from '../AdminButton';
import {getUpdatedState} from '../../helpers';

const style = {
    margin: '10px 0'
};

const linkInputStyle = {
    margin: '0 15px'
};

const linkInputLookUpStyle = {
    width: '50%'
};

const buttonsStyle = {
    margin: '10px 10px 0px 10px'
};

export default class AdminLinkField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            label: props.label,
            baseLabel: props.label,
            href: props.href,
            baseHref: props.href
        };
    }

    haveFieldsChanged = () => {
        return !(
            this.state.label === this.state.baseLabel &&
            this.state.href === this.state.baseHref
        );
    }

    handleChange = () => {
        const newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(getUpdatedState(newState, this.state));
    }

    handleUpdateClick = () => {
        this.props.onUpdateClick(this.props.id, this.state.label, this.state.href);
        this.setState(getUpdatedState({
            baseLabel: this.state.label,
            baseHref: this.state.href
        }, this.state));
    }

    handleRemoveClick = () => {
        this.props.onRemoveClick(this.props.id);
    }

    renderEditField = () => {
        return (
            <div>
                <ListItem button>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <TextField
                        style={linkInputStyle}
                        label={'label'}
                        name='label'
                        value={this.state.label}
                        error={this.props.isError}
                        onChange={this.handleChange}
                    />
                    <TextField
                        style={linkInputStyle}
                        label={'href'}
                        name='href'
                        value={this.state.href}
                        error={this.props.isError}
                        onChange={this.handleChange}
                    />
                    <AdminButton
                        size='small'
                        color='primary'
                        variant='outlined'
                        text={'Update Link'}
                        onClick={this.handleUpdateClick}
                        disabled={!this.haveFieldsChanged()}
                        style={buttonsStyle}
                    />
                    <AdminButton
                        size='small'
                        color='secondary'
                        variant='contained'
                        text={'Remove Link'}
                        onClick={this.handleRemoveClick}
                        style={buttonsStyle}
                    />
                </ListItem>
            </div>
        );
    }

    renderLookUpField = () => {
        return (
            <div>
                <ListItem button>
                    <ListItemIcon>
                        <Link />
                    </ListItemIcon>
                    <ListItemText
                        primary={`label: ${this.props.label}`}
                        style={linkInputLookUpStyle}
                    />
                    <ListItemText
                        primary={`href: ${this.props.href}`}
                        style={linkInputLookUpStyle}
                    />
                </ListItem>
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
