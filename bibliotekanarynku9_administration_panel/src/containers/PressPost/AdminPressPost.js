import React from 'react';
import {withRouter} from 'react-router';
import AdminLoadMoreButton from '../../components/AdminLoadMoreButton';
import AdminPressPostList from './AdminPressPostList';
import AdminAddPressPostForm from './AdminAddPressPostForm';
import {getPressPostListService, postPressPostService} from './adminPressPostService';
import {getUpdatedState} from '../../helpers';

class AdminPressPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pressPosts: [],
            loadMoreUrl: '',
            isAddFormOpen: false,
            isAddPressPostError: false
        };
    }

    componentWillMount() {
        getPressPostListService().then(response => {
            const data = response.data;
            if (response.status === 200) {
                this.setState(getUpdatedState({
                    pressPosts: data.results,
                    loadMoreUrl: data.next
                }, this.state));
            }
        });
    }

    handleLoadMoreClick = () => {
        getPressPostListService(this.state.loadMoreUrl).then(response => {
            const data = response.data;
            if (response.status === 200) {
                this.setState(getUpdatedState({
                    pressPosts: [...this.state.pressPosts, ...data.results],
                    loadMoreUrl: data.next
                }, this.state));
            }
        });
    }

    handleListItemClick = itemId => {
        this.props.history.push(`${this.props.match.url}/${itemId}`);
    }

    handleAddSaveClick = avatar => {
        postPressPostService(avatar)
            .then(() => {
                getPressPostListService()
                    .then(response => {
                        const data = response.data;
                        this.setState(getUpdatedState({
                            pressPosts: data.results,
                            loadMoreUrl: data.next,
                            isAddFormOpen: false,
                            isAddPressPostError: false
                        }, this.state));
                    });
            })
            .catch(() => {
                this.setState(getUpdatedState({
                    isAddFormOpen: true,
                    isAddPressPostError: true
                }, this.state));
            });
    }

    render() {
        return (
            <div>
                <AdminAddPressPostForm
                    onAddSaveClick={this.handleAddSaveClick}
                    isOpen={this.state.isAddFormOpen}
                    isError={this.state.isAddPressPostError}
                />
                <AdminPressPostList
                    pressPosts={this.state.pressPosts}
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

export default withRouter(AdminPressPost);
