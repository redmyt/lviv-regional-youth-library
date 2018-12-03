import React from 'react';
import Divider from '@material-ui/core/Divider';
import AdminButton from '../../components/AdminButton';
import AdminTitleField from '../../components/AdminTitleField';
import AdminDescriptionField from '../../components/AdminDescriptionField';
import AdminOrganizerField from '../../components/AdminOrganizerField/AdminOrganizerField';
import AdminAnnouncementTranslationLinksList from './AdminAnnouncementTranslationLinksList';
import AdminAddLinkForm from '../../components/AdminAddLinkForm/AdminAddLinkForm';
import {putAnnouncementTranslationService, deleteAnnouncementTranslationService, postAnnouncementTranslationLinkService, putAnnouncementTranslationLinkService, deleteAnnouncementTranslationLinkService} from './adminAnnouncementService';
import {getUpdatedState} from '../../helpers';

const buttonsWrapperSty = {
    display: 'flex'
};

const buttonsStyle = {
    width: '50%',
    margin: 10
};

class AdminAnnouncementItemTranslation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            updatedTitle: props.title,
            description: props.description,
            updatedDescription: props.description,
            organizer: props.organizer,
            updatedOrganizer: props.organizer,
            isError: false,
            isAddLinkFormError: false,
            isUpdateLinkError: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState(getUpdatedState({
            title: nextProps.title,
            updatedTitle: nextProps.title,
            description: nextProps.description,
            updatedDescription: nextProps.description,
            organizer: nextProps.organizer,
            updatedOrganizer: nextProps.organizer
        }, this.state));
    }

    haveFieldsChanged = () => {
        return !(
            this.state.title === this.state.updatedTitle &&
            this.state.description === this.state.updatedDescription &&
            this.state.organizer === this.state.updatedOrganizer
        );
    }

    handleTitleChange = newTitle => {
        this.setState(getUpdatedState({
            updatedTitle: newTitle,
        }, this.state));
    }

    handleDescriptionChange = newDescription => {
        this.setState(getUpdatedState({
            updatedDescription: newDescription,
        }, this.state));
    }

    handleOrganizerChange = newOrganizer => {
        this.setState(getUpdatedState({
            updatedOrganizer: newOrganizer,
        }, this.state));
    }

    handleSaveTranslationClick = () => {
        putAnnouncementTranslationService(
            this.props.announcementId,
            this.props.id,
            this.state.updatedTitle,
            this.state.updatedDescription,
            this.state.updatedOrganizer
        ).then(() => {
            this.setState(getUpdatedState({
                title: this.state.updatedTitle,
                description: this.state.updatedDescription,
                organizer: this.state.updatedOrganizer,
                isError: false
            }, this.state));
            this.props.onUpdateTranslationSuccess();
        }).catch(() => {
            this.setState(getUpdatedState({isError: true}, this.state));
        });
    }

    handleRemoveTranslationClick = () => {
        deleteAnnouncementTranslationService(
            this.props.announcementId,
            this.props.id
        ).then(() => {
            this.props.onRemoveTranslationSuccess();
        });
    }

    handleAddLinkClick = (label, href) => {
        postAnnouncementTranslationLinkService(
            this.props.announcementId,
            this.props.id,
            label,
            href
        ).then(() => {
            this.setState(getUpdatedState({
                isAddLinkFormError: false
            }, this.state));
            this.props.onAddTranslationLinkSuccess();
        }).catch(() => {
            this.setState(getUpdatedState({
                isAddLinkFormError: true
            }, this.state));
        });
    }

    handleLinkUpdateClick = (linkId, label, href) => {
        putAnnouncementTranslationLinkService(
            this.props.announcementId,
            this.props.id,
            linkId,
            label,
            href
        ).then(() => {
            this.setState(getUpdatedState({
                isUpdateLinkError: false
            }, this.state));
            this.props.onUpdateTranslationLinkSuccess();
        }).catch(() => {
            this.setState(getUpdatedState({
                isUpdateLinkError: true
            }, this.state));
        });
    }

    handleLinkRemoveClick = linkId => {
        deleteAnnouncementTranslationLinkService(
            this.props.announcementId,
            this.props.id,
            linkId
        ).then(() => {
            this.props.onRemoveTranslationLinkSuccess();
        });
    }

    render() {
        return (
            <div>
                <Divider />
                <AdminTitleField
                    title={this.state.updatedTitle}
                    label='Title'
                    onTitleChange={this.handleTitleChange}
                    isEdit={this.props.isEdit}
                    isError={this.state.isError}
                />
                <AdminDescriptionField
                    description={this.state.updatedDescription}
                    label='Description'
                    onDescriptionChange={this.handleDescriptionChange}
                    isEdit={this.props.isEdit}
                    isError={this.state.isError}
                />
                <AdminOrganizerField
                    organizer={this.state.updatedOrganizer}
                    label='organizer'
                    onOrganizerChange={this.handleOrganizerChange}
                    isEdit={this.props.isEdit}
                    isError={this.state.isError}
                />
                {
                    this.props.isEdit &&
                    <div style={buttonsWrapperSty}>
                        <AdminButton
                            text='Save Translation'
                            color='primary'
                            variant='outlined'
                            disabled={!this.haveFieldsChanged()}
                            onClick={this.handleSaveTranslationClick}
                            style={buttonsStyle}
                        />
                        <AdminButton
                            text='Remove Translation'
                            color='secondary'
                            variant='outlined'
                            onClick={this.handleRemoveTranslationClick}
                            style={buttonsStyle}
                        />
                    </div>
                }
                <AdminAnnouncementTranslationLinksList
                    links={this.props.links}
                    isEdit={this.props.isEdit}
                    isError={this.state.isUpdateLinkError}
                    onLinkUpdateClick={this.handleLinkUpdateClick}
                    onLinkRemoveClick={this.handleLinkRemoveClick}
                />
                {
                    this.props.isEdit &&
                    <AdminAddLinkForm
                        onAddLinkClick={this.handleAddLinkClick}
                        isError={this.state.isAddLinkFormError}
                    />
                }
            </div>
        );
    }
}

export default AdminAnnouncementItemTranslation;
