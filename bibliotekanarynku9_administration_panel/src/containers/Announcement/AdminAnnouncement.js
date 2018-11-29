import React from 'react';
import {withRouter} from 'react-router';
import AdminLoadMoreButton from '../../components/AdminLoadMoreButton';
import AdminAnnouncementList from './AdminAnnouncementList';
import AdminAddAnnouncementForm from './AdminAddAnnouncementForm';
import {getAnnouncementsListService, postAnnouncementService} from './adminAnnouncementService';
import {getUpdatedState} from '../../helpers';

class AdminAnnouncement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            announcements: [],
            loadMoreUrl: '',
            isAddFormOpen: false,
            isAddAnnouncementError: false
        };
    }

    componentWillMount() {
        getAnnouncementsListService().then(response => {
            const data = response.data;
            if (response.status === 200) {
                this.setState(getUpdatedState({
                    announcements: data.results,
                    loadMoreUrl: data.next
                }, this.state));
            }
        });
    }

    handleLoadMoreClick = () => {
        getAnnouncementsListService(this.state.loadMoreUrl).then(response => {
            const data = response.data;
            if (response.status === 200) {
                this.setState(getUpdatedState({
                    announcements: [...this.state.announcements, ...data.results],
                    loadMoreUrl: data.next
                }, this.state));
            }
        });
    }

    handleListItemClick = itemId => {
        this.props.history.push(`${this.props.match.url}/${itemId}`);
    }

    handleAddSaveClick = (avatar, startAt) => {
        postAnnouncementService(avatar, startAt)
            .then(() => {
                getAnnouncementsListService()
                    .then(response => {
                        const data = response.data;
                        this.setState(getUpdatedState({
                            announcements: data.results,
                            loadMoreUrl: data.next,
                            isAddFormOpen: false,
                            isAddAnnouncementError: false
                        }, this.state));
                    });
            })
            .catch(() => {
                this.setState(getUpdatedState({
                    isAddFormOpen: true,
                    isAddAnnouncementError: true
                }, this.state));
            });
    }

    render() {
        return (
            <div>
                <AdminAddAnnouncementForm
                    onAddSaveClick={this.handleAddSaveClick}
                    isOpen={this.state.isAddFormOpen}
                    isError={this.state.isAddAnnouncementError}
                />
                <AdminAnnouncementList
                    announcements={this.state.announcements}
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

export default withRouter(AdminAnnouncement);
