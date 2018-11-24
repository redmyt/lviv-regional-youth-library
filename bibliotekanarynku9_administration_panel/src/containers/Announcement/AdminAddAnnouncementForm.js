import React from 'react';
import AdminButton from '../../components/AdminButton';
import AdminAvatarField from '../../components/AdminAvatarField';
import {getUpdatedState} from '../../helpers';

const greenColor = '#C8E6C9',
    redColor = '#FFCDD2';

const okStyle = {
    background: greenColor
};

const errStyle = {
    background: redColor
};

const addABtnStyle = {
    padding: 20
};

const saveBtnStyle = {
    padding: 20
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
            avatar: null
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

    handleSaveClick = () => {
        this.props.onAddSaveClick(this.state.avatar);
    }

    render() {
        return (
            <div style={this.props.isError ? errStyle : okStyle}>
                <AdminButton
                    text='Add Announcement'
                    color='primary'
                    variant='contained'
                    onClick={this.handleAddClick}
                    style={addABtnStyle}
                />
                <div style={this.state.isOpen ? visibleBlockStyle : invisibleBlockStyle}>
                    <AdminAvatarField
                        isEdit={true}
                        onAvatarChange={this.handleAvatarChange}
                    />
                    <AdminButton
                        text='Save'
                        color='primary'
                        variant='outlined'
                        onClick={this.handleSaveClick}
                        style={saveBtnStyle}
                    />
                </div>
            </div>
        );
    }
}
