import React from 'react';
import {withRouter} from 'react-router';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Switch from '@material-ui/core/Switch';
import AdminButton from '../../components/AdminButton';
import AdminDateField from '../../components/AdminDateField';
import AdminAvatarField from '../../components/AdminAvatarField';
import AdminAnnouncementItemTranslation from './AdminAnnouncementItemTranslation';
import AdminAddAnnouncementTranslationForm from './AdminAddAnnouncementTranslationForm';
import {getAnnouncementById, putAnnouncementService, deleteAnnouncementService,} from './adminAnnouncementService';
import {getUpdatedState, getTranslation, getLinks} from '../../helpers';

const baseStyle = {
    margin: '15px 15px',
    boxSizing: 'border-box'
};

const saveAnnouncementBtnStyle = {
    margin: 10
};

const switchStyle = {
    float: 'right'
};

class AdminAnnouncementItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            isError: false,
            announcement: null,
            translation: null,
            links: null
        };
    }

    componentWillMount() {
        this.getAnnouncement();
    }

    getAnnouncement = () => {
        getAnnouncementById(this.props.match.params.announcementId).then(response => {
            const data = response.data;
            this.setState(getUpdatedState({
                announcement: data,
                translation: getTranslation(data),
                links: getLinks(data),
                isEdit: false
            }, this.state));
        });
    }

    handleAnnouncementRemoveClick = () => {
        deleteAnnouncementService(this.state.announcement.id)
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

    handleDateChange = newStartAt => {
        this.setState(getUpdatedState({announcement: {
            ...this.state.announcement,
            start_at: newStartAt
        }}, this.state));
    }

    handleAvatarChange = newAvatar => {
        this.setState(getUpdatedState({announcement: {
            ...this.state.announcement,
            avatar: newAvatar
        }}, this.state));
    }

    handleAnnouncementSaveClick = () => {
        putAnnouncementService(
            this.state.announcement.id,
            this.state.announcement.avatar,
            this.state.announcement.start_at
        ).then(() => {
            this.setState(getUpdatedState({isError: false}, this.state));
        }).catch(() => {
            this.setState(getUpdatedState({isError: true}, this.state));
        });
    }

    render() {
        const style = this.props.style ? Object.assign(this.props.style, baseStyle) : baseStyle;
        return (
            this.state.announcement ? (
                <div style={style}>
                    <Card>
                        <div style={switchStyle}>
                            <Switch
                                checked={this.state.isEdit}
                                onChange={this.handleSwitchToggle}
                            />
                        </div>
                        <AdminAvatarField
                            avatar={this.state.announcement.avatar}
                            isEdit={this.state.isEdit}
                            onAvatarChange={this.handleAvatarChange}
                        />
                        <CardContent>
                            <AdminDateField
                                date={this.state.announcement.start_at}
                                label='Start At'
                                onDateChange={this.handleDateChange}
                                isEdit={this.state.isEdit}
                                isError={this.state.isError}
                            />
                            <AdminDateField
                                date={this.state.announcement.created_at}
                                label='Created at'
                                isEdit={false}
                            />
                            <AdminDateField
                                date={this.state.announcement.updated_at}
                                label='Updated at'
                                isEdit={false}
                            />
                            {
                                this.state.isEdit && (
                                    <AdminButton
                                        text='Save Announcement'
                                        color='primary'
                                        variant='outlined'
                                        onClick={this.handleAnnouncementSaveClick}
                                        style={saveAnnouncementBtnStyle}
                                    />
                                )
                            }
                            {
                                this.state.announcement.translations.map(translation => {
                                    return (
                                        <AdminAnnouncementItemTranslation
                                            announcementId={this.state.announcement.id}
                                            id={translation.id}
                                            title={translation.title}
                                            description={translation.description}
                                            links={translation.links}
                                            isEdit={this.state.isEdit}
                                            onRemoveTranslationSuccess={this.getAnnouncement}
                                            onAddTranslationLinkSuccess={this.getAnnouncement}
                                            onRemoveTranslationLinkSuccess={this.getAnnouncement}
                                        />
                                    );
                                })
                            }
                            <AdminAddAnnouncementTranslationForm
                                announcementId={this.state.announcement.id}
                                onAddTranslationSuccess={this.getAnnouncement}
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
                                        onClick={this.handleAnnouncementRemoveClick}
                                        text={'Remove Announcement'}
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

export default withRouter(AdminAnnouncementItem);
