import React from 'react';
import {withRouter} from 'react-router';
import AdminLoadMoreButton from '../../components/AdminLoadMoreButton';
import AdminNewsList from './AdminNewsList';
import AdminAddNewsForm from './AdminAddNewsForm';
import {getNewsListService, postNewsService} from './adminNewsService';
import {getUpdatedState} from '../../helpers';

class AdminNews extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            news: [],
            loadMoreUrl: '',
            isAddFormOpen: false,
            isAddNewsError: false
        };
    }

    componentWillMount() {
        getNewsListService().then(response => {
            const data = response.data;
            if (response.status === 200) {
                this.setState(getUpdatedState({
                    news: data.results,
                    loadMoreUrl: data.next
                }, this.state));
            }
        });
    }

    handleLoadMoreClick = () => {
        getNewsListService(this.state.loadMoreUrl).then(response => {
            const data = response.data;
            if (response.status === 200) {
                this.setState(getUpdatedState({
                    news: [...this.state.news, ...data.results],
                    loadMoreUrl: data.next
                }, this.state));
            }
        });
    }

    handleListItemClick = itemId => {
        this.props.history.push(`${this.props.match.url}/${itemId}`);
    }

    handleAddSaveClick = avatar => {
        postNewsService(avatar)
            .then(() => {
                getNewsListService()
                    .then(response => {
                        const data = response.data;
                        this.setState(getUpdatedState({
                            news: data.results,
                            loadMoreUrl: data.next,
                            isAddFormOpen: false,
                            isAddNewsError: false
                        }, this.state));
                    });
            })
            .catch(() => {
                this.setState(getUpdatedState({
                    isAddFormOpen: true,
                    isAddNewsError: true
                }, this.state));
            });
    }

    render() {
        return (
            <div>
                <AdminAddNewsForm
                    onAddSaveClick={this.handleAddSaveClick}
                    isOpen={this.state.isAddFormOpen}
                    isError={this.state.isAddNewsError}
                />
                <AdminNewsList
                    news={this.state.news}
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

export default withRouter(AdminNews);
