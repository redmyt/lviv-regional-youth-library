import React from 'react';
import {withRouter} from 'react-router';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Switch from '@material-ui/core/Switch';
import AdminButton from '../../components/AdminButton';
import AdminDateField from '../../components/AdminDateField';
import AdminAvatarField from '../../components/AdminAvatarField';
import AdminProjectItemTranslation from './AdminProjectItemTranslation';
import AdminAddProjectTranslationForm from './AdminAddProjectTranslationForm';
import {getProjectById, putProjectService, deleteProjectService} from './adminProjectService';
import {getUpdatedState} from '../../helpers';

const baseStyle = {
    margin: '15px 15px',
    boxSizing: 'border-box'
};

const saveProjectBtnStyle = {
    margin: 10
};

const switchStyle = {
    float: 'right'
};

class AdminProjectItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            isError: false,
            project: null
        };
    }

    componentWillMount() {
        this.getProject();
    }

    getProject = () => {
        getProjectById(this.props.match.params.projectId).then(response => {
            const data = response.data;
            this.setState(getUpdatedState({
                project: data,
                isEdit: false
            }, this.state));
        });
    }

    handleProjectRemoveClick = () => {
        deleteProjectService(this.state.project.id)
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
        this.setState(getUpdatedState({project: {
            ...this.state.project,
            avatar: newAvatar
        }}, this.state));
    }

    handleProjectSaveClick = () => {
        putProjectService(
            this.state.project.id,
            this.state.project.avatar
        ).then(() => {
            this.setState(getUpdatedState({isError: false}, this.state));
        }).catch(() => {
            this.setState(getUpdatedState({isError: true}, this.state));
        });
    }

    render() {
        const style = this.props.style ? Object.assign(this.props.style, baseStyle) : baseStyle;
        return (
            this.state.project ? (
                <div style={style}>
                    <Card>
                        <div style={switchStyle}>
                            <Switch
                                checked={this.state.isEdit}
                                onChange={this.handleSwitchToggle}
                            />
                        </div>
                        <AdminAvatarField
                            avatar={this.state.project.avatar}
                            isEdit={this.state.isEdit}
                            onAvatarChange={this.handleAvatarChange}
                        />
                        <CardContent>
                            <AdminDateField
                                date={this.state.project.created_at}
                                label='Created at'
                                isEdit={false}
                            />
                            <AdminDateField
                                date={this.state.project.updated_at}
                                label='Updated at'
                                isEdit={false}
                            />
                            {
                                this.state.isEdit && (
                                    <AdminButton
                                        text='Save Project'
                                        color='primary'
                                        variant='outlined'
                                        onClick={this.handleProjectSaveClick}
                                        style={saveProjectBtnStyle}
                                    />
                                )
                            }
                            {
                                this.state.project.translations.map(translation => {
                                    return (
                                        <AdminProjectItemTranslation
                                            projectId={this.state.project.id}
                                            id={translation.id}
                                            title={translation.title}
                                            description={translation.description}
                                            links={translation.links}
                                            isEdit={this.state.isEdit}
                                            onRemoveTranslationSuccess={this.getProject}
                                            onAddTranslationLinkSuccess={this.getProject}
                                            onRemoveTranslationLinkSuccess={this.getProject}
                                        />
                                    );
                                })
                            }
                            <AdminAddProjectTranslationForm
                                projectId={this.state.project.id}
                                onAddTranslationSuccess={this.getProject}
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
                                        onClick={this.handleProjectRemoveClick}
                                        text={'Remove Project'}
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

export default withRouter(AdminProjectItem);
