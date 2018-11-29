import React from 'react';
import {withRouter} from 'react-router';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Switch from '@material-ui/core/Switch';
import AdminButton from '../../components/AdminButton';
import AdminDateField from '../../components/AdminDateField';
import AdminAvatarField from '../../components/AdminAvatarField';
import AdminPressPostItemTranslation from './AdminPressPostItemTranslation';
import AdminAddPressPostTranslationForm from './AdminAddPressPostTranslationForm';
import {getPressPostById, putPressPostService, deletePressPostService} from './adminPressPostService';
import {getUpdatedState} from '../../helpers';

const baseStyle = {
    margin: '15px 15px',
    boxSizing: 'border-box'
};

const savePressPostBtnStyle = {
    margin: 10
};

const switchStyle = {
    float: 'right'
};

class AdminPressPostItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            isError: false,
            pressPost: null
        };
    }

    componentWillMount() {
        this.getPressPost();
    }

    getPressPost = () => {
        getPressPostById(this.props.match.params.pressPostId).then(response => {
            const data = response.data;
            this.setState(getUpdatedState({
                pressPost: data,
                isEdit: false
            }, this.state));
        });
    }

    handlePressPostRemoveClick = () => {
        deletePressPostService(this.state.pressPost.id)
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
        this.setState(getUpdatedState({pressPost: {
            ...this.state.pressPost,
            avatar: newAvatar
        }}, this.state));
    }

    handlePressPostSaveClick = () => {
        putPressPostService(
            this.state.pressPost.id,
            this.state.pressPost.avatar
        ).then(() => {
            this.setState(getUpdatedState({isError: false}, this.state));
        }).catch(() => {
            this.setState(getUpdatedState({isError: true}, this.state));
        });
    }

    render() {
        const style = this.props.style ? Object.assign(this.props.style, baseStyle) : baseStyle;
        return (
            this.state.pressPost ? (
                <div style={style}>
                    <Card>
                        <div style={switchStyle}>
                            <Switch
                                checked={this.state.isEdit}
                                onChange={this.handleSwitchToggle}
                            />
                        </div>
                        <AdminAvatarField
                            avatar={this.state.pressPost.avatar}
                            isEdit={this.state.isEdit}
                            onAvatarChange={this.handleAvatarChange}
                        />
                        <CardContent>
                            <AdminDateField
                                date={this.state.pressPost.created_at}
                                label='Created at'
                                isEdit={false}
                            />
                            <AdminDateField
                                date={this.state.pressPost.updated_at}
                                label='Updated at'
                                isEdit={false}
                            />
                            {
                                this.state.isEdit && (
                                    <AdminButton
                                        text='Save Press Post'
                                        color='primary'
                                        variant='outlined'
                                        onClick={this.handlePressPostSaveClick}
                                        style={savePressPostBtnStyle}
                                    />
                                )
                            }
                            {
                                this.state.pressPost.translations.map(translation => {
                                    return (
                                        <AdminPressPostItemTranslation
                                            pressPostId={this.state.pressPost.id}
                                            id={translation.id}
                                            title={translation.title}
                                            description={translation.description}
                                            links={translation.links}
                                            isEdit={this.state.isEdit}
                                            onRemoveTranslationSuccess={this.getPressPost}
                                            onAddTranslationLinkSuccess={this.getPressPost}
                                            onRemoveTranslationLinkSuccess={this.getPressPost}
                                        />
                                    );
                                })
                            }
                            <AdminAddPressPostTranslationForm
                                pressPostId={this.state.pressPost.id}
                                onAddTranslationSuccess={this.getPressPost}
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
                                        onClick={this.handlePressPostRemoveClick}
                                        text={'Remove Press Post'}
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

export default withRouter(AdminPressPostItem);
