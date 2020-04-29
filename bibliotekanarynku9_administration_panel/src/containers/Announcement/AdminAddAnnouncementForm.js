import React from 'react';
import AdminButton from '../../components/AdminButton';
import AdminAvatarField from '../../components/AdminAvatarField';
import AdminDateField from '../../components/AdminDateField';
import {getUpdatedState} from '../../helpers';

const greenColor = '#C8E6C9',
    redColor = '#FFCDD2';

const okStyle = {
    background: greenColor
};

const errStyle = {
    background: redColor
};

const buttonsStyle = {
    padding: 20
};

const startAtStyle = {
    paddingLeft: 25
};

const visibleBlockStyle = {
    display: 'block'
};

const invisibleBlockStyle = {
    display: 'none'
};

export default class AdminAddAnnouncementForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen,
            avatar: null,
            startAt: (new Date()).toISOString(),
            endAt: (new Date()).toISOString()
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState(getUpdatedState({isOpen: nextProps.isOpen}, this.state));
    }

    handleAddClick = () => {
        this.setState(getUpdatedState({isOpen: !this.state.isOpen}, this.state));
    }

    handleAvatarChange = avatar => {
        this.setState(getUpdatedState({avatar: avatar}, this.state));
    }

    handleStartAtChange = startAt => {
        this.setState(getUpdatedState({startAt: startAt}, this.state));
    }

    handleEndAtChange = endAt => {
        this.setState(getUpdatedState({endAt: endAt}, this.state));
    }

    handleSaveClick = () => {
        this.props.onAddSaveClick(this.state.avatar, this.state.startAt, this.state.endAt);
        this.setState(getUpdatedState({
            avatar: null,
            startAt: (new Date()).toISOString(),
            endAt: (new Date()).toISOString()
        }, this.state));
    }

    render() {
        return (
            <div style={this.props.isError ? errStyle : okStyle}>
                <AdminButton
                    text='Add Announcement'
                    color='primary'
                    variant='contained'
                    onClick={this.handleAddClick}
                    style={buttonsStyle}
                />
                <div style={this.state.isOpen ? visibleBlockStyle : invisibleBlockStyle}>
                    <AdminAvatarField
                        isEdit={true}
                        avatar={this.state.avatar}
                        onAvatarChange={this.handleAvatarChange}
                    />
                    <AdminDateField
                        label='Start at'
                        date={this.state.startAt}
                        onDateChange={this.handleStartAtChange}
                        isEdit={true}
                        style={startAtStyle}
                    />
                    <AdminDateField
                        label='End at'
                        date={this.state.endAt}
                        onDateChange={this.handleEndAtChange}
                        isEdit={true}
                        style={startAtStyle}
                    />
                    <AdminButton
                        text='Save'
                        color='primary'
                        variant='outlined'
                        onClick={this.handleSaveClick}
                        style={buttonsStyle}
                    />
                </div>
            </div>
        );
    }
}
