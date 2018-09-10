import React from 'react';
import {withRouter} from 'react-router';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Switch from '@material-ui/core/Switch';
import AdminButton from '../../../components/AdminButton';
import {getUpdatedState} from '../../../helpers';
import AdminTitleField from '../../../components/AdminTitleField';
import AdminDescriptionField from '../../../components/AdminDescriptionField';
import AdminDateField from '../../../components/AdminDateField';
import {
    getAnnouncementById,
    putAnnouncementTranslationService,
    putAnnouncementService
} from './adminAnnouncementService';

const baseStyle = {
    margin: '15px 15px',
    boxSizing: 'border-box'
};

const mediaStyle = {
    height: 0,
    paddingTop: '20%'
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
            announcementId: this.props.match.params.announcementId,
            announcement: null,
            announcementTranslation: null
        };
    }

    componentWillMount() {
        getAnnouncementById(this.state.announcementId, this.props.language).then(response => {
            const data = response.data;
            if (response.status === 200) {
                this.setState(getUpdatedState({
                    announcement: data,
                    announcementTranslation: data.translations[0]
                }, this.state));
            }
        });
    }

    handleSaveClick = () => {
        putAnnouncementService(
            this.state.announcementId,
            this.state.announcement.avatar,
            this.state.announcement.start_at
        ).then(() => {
            putAnnouncementTranslationService(
                this.state.announcementId,
                this.state.announcementTranslation.id,
                this.state.announcementTranslation.title,
                this.state.announcementTranslation.description
            ).then(() => {
                getAnnouncementById(this.state.announcementId, this.props.language)
                    .then(response => {
                        const data = response.data;
                        if (response.status === 200) {
                            this.setState(getUpdatedState({
                                announcement: data,
                                announcementTranslation: data.translations[0],
                                isEdit: false
                            }, this.state));
                        }
                    });
            });
        }).catch(() => {
            this.setState(getUpdatedState({isError: true}, this.state));
        });
    }

    handleSwitchToggle = () => {
        this.setState(getUpdatedState({isEdit: !this.state.isEdit}, this.state));
    }

    handleTitleChange = newTitle => {
        this.setState(getUpdatedState({announcementTranslation: {
            ...this.state.announcementTranslation,
            title: newTitle
        }}, this.state));
    }

    handleDescriptionChange = newDescription => {
        this.setState(getUpdatedState({announcementTranslation: {
            ...this.state.announcementTranslation,
            description: newDescription
        }}, this.state));
    }

    handleDateChange = newDate => {
        this.setState(getUpdatedState({announcement: {
            ...this.state.announcement,
            start_at: newDate
        }}, this.state));
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
                        <CardMedia style={mediaStyle} image={this.state.announcement.avatar} />
                        <CardContent>
                            <AdminTitleField
                                title={this.state.announcementTranslation.title}
                                label='Title'
                                onTitleChange={this.handleTitleChange}
                                isEdit={this.state.isEdit}
                                isError={this.state.isError}
                            />
                            <AdminDescriptionField
                                description={this.state.announcementTranslation.description}
                                label='Description'
                                onDescriptionChange={this.handleDescriptionChange}
                                isEdit={this.state.isEdit}
                                isError={this.state.isError}
                            />
                            <AdminDateField
                                date={this.state.announcement.start_at}
                                label='Start At'
                                onDateChange={this.handleDateChange}
                                isEdit={this.state.isEdit}
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
                        </CardContent>
                        <CardActions>
                            {
                                this.state.isEdit && (
                                    <AdminButton
                                        size='small'
                                        color='primary'
                                        variant='contained'
                                        onClick={this.handleSaveClick}
                                        text={'Save'}
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
