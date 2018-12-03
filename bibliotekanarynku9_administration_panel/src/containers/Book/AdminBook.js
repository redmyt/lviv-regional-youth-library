import React from 'react';
import {withRouter} from 'react-router';
import AdminLoadMoreButton from '../../components/AdminLoadMoreButton';
import AdminBookList from './AdminBookList';
import AdminAddBookForm from './AdminAddBookForm';
import {getBookListService, postBookService} from './adminBookService';
import {getUpdatedState} from '../../helpers';

class AdminBook extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            loadMoreUrl: '',
            isAddFormOpen: false,
            isAddBookError: false
        };
    }

    componentWillMount() {
        getBookListService().then(response => {
            const data = response.data;
            if (response.status === 200) {
                this.setState(getUpdatedState({
                    books: data.results,
                    loadMoreUrl: data.next
                }, this.state));
            }
        });
    }

    handleLoadMoreClick = () => {
        getBookListService(this.state.loadMoreUrl).then(response => {
            const data = response.data;
            if (response.status === 200) {
                this.setState(getUpdatedState({
                    books: [...this.state.books, ...data.results],
                    loadMoreUrl: data.next
                }, this.state));
            }
        });
    }

    handleListItemClick = itemId => {
        this.props.history.push(`${this.props.match.url}/${itemId}`);
    }

    handleAddSaveClick = (avatar, publishedAt) => {
        postBookService(avatar, publishedAt)
            .then(() => {
                getBookListService()
                    .then(response => {
                        const data = response.data;
                        this.setState(getUpdatedState({
                            books: data.results,
                            loadMoreUrl: data.next,
                            isAddFormOpen: false,
                            isAddBookError: false
                        }, this.state));
                    });
            })
            .catch(() => {
                this.setState(getUpdatedState({
                    isAddFormOpen: true,
                    isAddBookError: true
                }, this.state));
            });
    }

    render() {
        return (
            <div>
                <AdminAddBookForm
                    onAddSaveClick={this.handleAddSaveClick}
                    isOpen={this.state.isAddFormOpen}
                    isError={this.state.isAddBookError}
                />
                <AdminBookList
                    books={this.state.books}
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

export default withRouter(AdminBook);
