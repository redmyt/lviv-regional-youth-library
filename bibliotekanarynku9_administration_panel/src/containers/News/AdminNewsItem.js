import React from 'react';
import {withRouter} from 'react-router';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Switch from '@material-ui/core/Switch';
import AdminButton from '../../components/AdminButton';
import AdminDateField from '../../components/AdminDateField';
import AdminAvatarField from '../../components/AdminAvatarField';
import AdminNewsItemTranslation from './AdminNewsItemTranslation';
import AdminAddNewsTranslationForm from './AdminAddNewsTranslationForm';
import {getNewsById, putNewsService, deleteNewsService,} from './adminNewsService';
import {getUpdatedState, getTranslation, getLinks} from '../../helpers';

const baseStyle = {
    margin: '15px 15px',
    boxSizing: 'border-box'
};

const saveNewsBtnStyle = {
    margin: 10
};

const switchStyle = {
    float: 'right'
};

class AdminNewsItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            isError: false,
            news: null,
            translation: null,
            links: null
        };
    }

    componentWillMount() {
        this.getNews();
    }

    getNews = () => {
        getNewsById(this.props.match.params.newsId).then(response => {
            const data = response.data;
            this.setState(getUpdatedState({
                news: data,
                translation: getTranslation(data),
                links: getLinks(data),
                isEdit: false
            }, this.state));
        });
    }

    handleNewsRemoveClick = () => {
        deleteNewsService(this.state.news.id)
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

    handleAvatarChange = newAvatar => {
        this.setState(getUpdatedState({news: {
            ...this.state.news,
            avatar: newAvatar
        }}, this.state));
    }

    handleNewsSaveClick = () => {
        putNewsService(
            this.state.news.id,
            this.state.news.avatar
        ).then(() => {
            this.setState(getUpdatedState({isError: false}, this.state));
        }).catch(() => {
            this.setState(getUpdatedState({isError: true}, this.state));
        });
    }

    render() {
        const style = this.props.style ? Object.assign(this.props.style, baseStyle) : baseStyle;
        return (
            this.state.news ? (
                <div style={style}>
                    <Card>
                        <div style={switchStyle}>
                            <Switch
                                checked={this.state.isEdit}
                                onChange={this.handleSwitchToggle}
                            />
                        </div>
                        <AdminAvatarField
                            avatar={this.state.news.avatar}
                            isEdit={this.state.isEdit}
                            onAvatarChange={this.handleAvatarChange}
                        />
                        <CardContent>
                            <AdminDateField
                                date={this.state.news.created_at}
                                label='Created at'
                                isEdit={false}
                            />
                            <AdminDateField
                                date={this.state.news.updated_at}
                                label='Updated at'
                                isEdit={false}
                            />
                            {
                                this.state.isEdit && (
                                    <AdminButton
                                        text='Save News'
                                        color='primary'
                                        variant='outlined'
                                        onClick={this.handleNewsSaveClick}
                                        style={saveNewsBtnStyle}
                                    />
                                )
                            }
                            {
                                this.state.news.translations.map(translation => {
                                    return (
                                        <AdminNewsItemTranslation
                                            newsId={this.state.news.id}
                                            id={translation.id}
                                            title={translation.title}
                                            description={translation.description}
                                            links={translation.links}
                                            isEdit={this.state.isEdit}
                                            onRemoveTranslationSuccess={this.getNews}
                                            onAddTranslationLinkSuccess={this.getNews}
                                            onRemoveTranslationLinkSuccess={this.getNews}
                                        />
                                    );
                                })
                            }
                            <AdminAddNewsTranslationForm
                                newsId={this.state.news.id}
                                onAddTranslationSuccess={this.getNews}
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
                                        onClick={this.handleNewsRemoveClick}
                                        text={'Remove News'}
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

export default withRouter(AdminNewsItem);
