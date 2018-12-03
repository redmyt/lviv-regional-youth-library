import React from 'react';
import {withRouter} from 'react-router';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Switch from '@material-ui/core/Switch';
import AdminButton from '../../components/AdminButton';
import AdminDateField from '../../components/AdminDateField';
import AdminAvatarField from '../../components/AdminAvatarField';
import AdminBookItemTranslation from './AdminBookItemTranslation';
import AdminAddBookTranslationForm from './AdminAddBookTranslationForm';
import {getBookById, putBookService, deleteBookService} from './adminBookService';
import {getUpdatedState} from '../../helpers';

const baseStyle = {
    margin: '15px 15px',
    boxSizing: 'border-box'
};

const saveBookBtnStyle = {
    margin: 10
};

const switchStyle = {
    float: 'right'
};

class AdminBookItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            isError: false,
            book: null
        };
    }

    componentWillMount() {
        this.getBook();
    }

    getBook = () => {
        getBookById(this.props.match.params.bookId).then(response => {
            const data = response.data;
            this.setState(getUpdatedState({
                book: data,
                isEdit: false
            }, this.state));
        });
    }

    handleBookRemoveClick = () => {
        deleteBookService(this.state.book.id)
            .then(() => {
                this.props.history.goBack();
            })
            .catch(() => {
                this.setState(getUpdatedState({isError: true}, this.state));
            });
    }

    handleSwitchToggle = () => {
        this.setState(getUpdatedState({isEdit: !this.state.isEdit}, this.state));
    }

    handleDateChange = newPublishedAt => {
        this.setState(getUpdatedState({book: {
            ...this.state.book,
            published_at: newPublishedAt
        }}, this.state));
    }

    handleAvatarChange = newAvatar => {
        this.setState(getUpdatedState({book: {
            ...this.state.book,
            avatar: newAvatar
        }}, this.state));
    }

    handleBookSaveClick = () => {
        putBookService(
            this.state.book.id,
            this.state.book.avatar,
            this.state.book.published_at
        ).then(() => {
            this.setState(getUpdatedState({isError: false}, this.state));
            this.getBook();
        }).catch(() => {
            this.setState(getUpdatedState({isError: true}, this.state));
        });
    }

    render() {
        const style = this.props.style ? Object.assign(this.props.style, baseStyle) : baseStyle;
        return (
            this.state.book ? (
                <div style={style}>
                    <Card>
                        <div style={switchStyle}>
                            <Switch
                                checked={this.state.isEdit}
                                onChange={this.handleSwitchToggle}
                            />
                        </div>
                        <AdminAvatarField
                            avatar={this.state.book.avatar}
                            isEdit={this.state.isEdit}
                            onAvatarChange={this.handleAvatarChange}
                        />
                        <CardContent>
                            <AdminDateField
                                date={this.state.book.published_at}
                                label='Published At'
                                onDateChange={this.handleDateChange}
                                isEdit={this.state.isEdit}
                                isError={this.state.isError}
                                dateType={true}
                            />
                            <AdminDateField
                                date={this.state.book.created_at}
                                label='Created at'
                                isEdit={false}
                            />
                            <AdminDateField
                                date={this.state.book.updated_at}
                                label='Updated at'
                                isEdit={false}
                            />
                            {
                                this.state.isEdit && (
                                    <AdminButton
                                        text='Save Book'
                                        color='primary'
                                        variant='outlined'
                                        onClick={this.handleBookSaveClick}
                                        style={saveBookBtnStyle}
                                    />
                                )
                            }
                            {
                                this.state.book.translations.map(translation => {
                                    return (
                                        <AdminBookItemTranslation
                                            bookId={this.state.book.id}
                                            id={translation.id}
                                            title={translation.title}
                                            description={translation.description}
                                            author={translation.author}
                                            links={translation.links}
                                            isEdit={this.state.isEdit}
                                            onUpdateTranslationSuccess={this.getBook}
                                            onRemoveTranslationSuccess={this.getBook}
                                            onAddTranslationLinkSuccess={this.getBook}
                                            onUpdateTranslationLinkSuccess={this.getBook}
                                            onRemoveTranslationLinkSuccess={this.getBook}
                                        />
                                    );
                                })
                            }
                            <AdminAddBookTranslationForm
                                bookId={this.state.book.id}
                                onAddTranslationSuccess={this.getBook}
                                isEdit={this.state.isEdit}
                            />
                        </CardContent>
                        <CardActions>
                            {
                                this.state.isEdit && (
                                    <AdminButton
                                        size='small'
                                        color='secondary'
                                        variant='contained'
                                        onClick={this.handleBookRemoveClick}
                                        text={'Remove Book'}
                                    />
                                )
                            }
                        </CardActions>
                    </Card>
                </div>
            ) : (
                <div>Waiting for data load</div>
            )
        );
    }
}

export default withRouter(AdminBookItem);
