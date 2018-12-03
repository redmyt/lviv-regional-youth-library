import React from 'react';
import Divider from '@material-ui/core/Divider';
import AdminButton from '../../components/AdminButton';
import AdminTitleField from '../../components/AdminTitleField';
import AdminDescriptionField from '../../components/AdminDescriptionField';
import AdminAuthorField from '../../components/AdminAuthorField/AdminAuthorField';
import {putBookTranslationService, deleteBookTranslationService} from './adminBookService';
import {getUpdatedState} from '../../helpers';

const buttonsWrapperStyle = {
    display: 'flex'
};

const buttonsStyle = {
    width: '50%',
    margin: 10
};

class AdminBookItemTranslation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            updatedTitle: props.title,
            description: props.description,
            updatedDescription: props.description,
            author: props.author,
            updatedAuthor: props.author,
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
            author: nextProps.author,
            updatedAuthor: nextProps.author
        }, this.state));
    }

    haveFieldsChanged = () => {
        return !(
            this.state.title === this.state.updatedTitle &&
            this.state.description === this.state.updatedDescription &&
            this.state.author === this.state.updatedAuthor
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

    handleAuthorChange = newAuthor => {
        this.setState(getUpdatedState({
            updatedAuthor: newAuthor,
        }, this.state));
    }

    handleSaveTranslationClick = () => {
        putBookTranslationService(
            this.props.bookId,
            this.props.id,
            this.state.updatedTitle,
            this.state.updatedDescription,
            this.state.updatedAuthor
        ).then(() => {
            this.setState(getUpdatedState({
                title: this.state.updatedTitle,
                description: this.state.updatedDescription,
                author: this.state.updatedAuthor,
                isError: false
            }, this.state));
            this.props.onUpdateTranslationSuccess();
        }).catch(() => {
            this.setState(getUpdatedState({isError: true}, this.state));
        });
    }

    handleRemoveTranslationClick = () => {
        deleteBookTranslationService(
            this.props.bookId,
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
                <AdminAuthorField
                    author={this.state.updatedAuthor}
                    label='author'
                    onAuthorChange={this.handleAuthorChange}
                    isEdit={this.props.isEdit}
                    isError={this.state.isError}
                />
                {
                    this.props.isEdit &&
                    <div style={buttonsWrapperStyle}>
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
            </div>
        );
    }
}

export default AdminBookItemTranslation;
