import React from 'react';
import Divider from '@material-ui/core/Divider';
import AdminButton from '../../components/AdminButton';
import AdminTitleField from '../../components/AdminTitleField';
import AdminDescriptionField from '../../components/AdminDescriptionField';
import {getUpdatedState} from '../../helpers';
import {putAnnouncementTranslationService, deleteAnnouncementTranslationService} from './adminAnnouncementService';
import AdminLinksField from '../../components/AdminLinksField';

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
            isError: false
        };
    }

    haveFieldsChanged = () => {
        return !(
            this.state.title === this.state.updatedTitle &&
            this.state.description === this.state.updatedDescription
        );
    }

    handleTitleChange = newTitle => {
        this.setState(getUpdatedState({
            updatedTitle: newTitle,
            isChanged: !(newTitle === this.state.title)
        }, this.state));
    }

    handleDescriptionChange = newDescription => {
        this.setState(getUpdatedState({
            updatedDescription: newDescription,
            isChanged: !(newDescription === this.state.description)
        }, this.state));
    }

    handleSaveClick = () => {
        putAnnouncementTranslationService(
            this.props.announcementId,
            this.props.id,
            this.state.updatedTitle,
            this.state.updatedDescription
        ).then(() => {
            this.setState(getUpdatedState({
                title: this.state.updatedTitle,
                description: this.state.updatedDescription,
                isError: false
            }, this.state));
        }).catch(() => {
            this.setState(getUpdatedState({isError: true}, this.state));
        });
    }

    handleRemoveClick = () => {
        deleteAnnouncementTranslationService(
            this.props.announcementId,
            this.props.id
        ).then(() => {
            this.props.onRemoveTranslationSuccess();
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
                {
                    this.props.isEdit &&
                    <div style={buttonsWrapperSty}>
                        <AdminButton
                            text='Save Translation'
                            color='primary'
                            variant='outlined'
                            disabled={!this.haveFieldsChanged()}
                            onClick={this.handleSaveClick}
                            style={buttonsStyle}
                        />
                        <AdminButton
                            text='Remove Translation'
                            color='secondary'
                            variant='outlined'
                            onClick={this.handleRemoveClick}
                            style={buttonsStyle}
                        />
                    </div>
                }
                <AdminLinksField links={this.props.links} isEdit={this.props.isEdit} />
            </div>
        );
    }
}

export default AdminAnnouncementItemTranslation;
