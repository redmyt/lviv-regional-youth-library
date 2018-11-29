import React from 'react';
import {withRouter} from 'react-router';
import AdminLoadMoreButton from '../../components/AdminLoadMoreButton';
import AdminProjectList from './AdminProjectList';
import AdminAddProjectForm from './AdminAddProjectForm';
import {getProjectListService, postProjectService} from './adminProjectService';
import {getUpdatedState} from '../../helpers';

class AdminProject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            loadMoreUrl: '',
            isAddFormOpen: false,
            isAddProjectError: false
        };
    }

    componentWillMount() {
        getProjectListService().then(response => {
            const data = response.data;
            if (response.status === 200) {
                this.setState(getUpdatedState({
                    projects: data.results,
                    loadMoreUrl: data.next
                }, this.state));
            }
        });
    }

    handleLoadMoreClick = () => {
        getProjectListService(this.state.loadMoreUrl).then(response => {
            const data = response.data;
            if (response.status === 200) {
                this.setState(getUpdatedState({
                    projects: [...this.state.projects, ...data.results],
                    loadMoreUrl: data.next
                }, this.state));
            }
        });
    }

    handleListItemClick = itemId => {
        this.props.history.push(`${this.props.match.url}/${itemId}`);
    }

    handleAddSaveClick = avatar => {
        postProjectService(avatar)
            .then(() => {
                getProjectListService()
                    .then(response => {
                        const data = response.data;
                        this.setState(getUpdatedState({
                            projects: data.results,
                            loadMoreUrl: data.next,
                            isAddFormOpen: false,
                            isAddProjectError: false
                        }, this.state));
                    });
            })
            .catch(() => {
                this.setState(getUpdatedState({
                    isAddFormOpen: true,
                    isAddProjectError: true
                }, this.state));
            });
    }

    render() {
        return (
            <div>
                <AdminAddProjectForm
                    onAddSaveClick={this.handleAddSaveClick}
                    isOpen={this.state.isAddFormOpen}
                    isError={this.state.isAddProjectError}
                />
                <AdminProjectList
                    projects={this.state.projects}
                    onListItemClick={this.handleListItemClick}
                />
                <AdminLoadMoreButton
                    variant='contained'
                    isDisabled={!this.state.loadMoreUrl}
                    onClick={this.handleLoadMoreClick}
                />
            </div>
        );
    }
}

export default withRouter(AdminProject);
