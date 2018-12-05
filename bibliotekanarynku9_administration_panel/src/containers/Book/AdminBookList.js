import React from 'react';
import {withRouter} from 'react-router';
import AdminBookListItem from './AdminBookListItem';
import {formatDateToView} from '../../helpers';

const baseStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 15
};

class AdminBookList extends React.Component {

    handelClick = itemId => {
        this.props.onListItemClick(itemId);
    }

    render() {
        const style = this.props.style ? Object.assign(this.props.style, baseStyle) : baseStyle;
        return (
            <div style={style}>
                {
                    this.props.books.map(book => {
                        return (
                            <AdminBookListItem
                                key={book.id}
                                id={book.id}
                                avatar={book.avatar}
                                translations={book.translations}
                                publishedAt={formatDateToView(book.published_at)}
                                createdAt={formatDateToView(book.created_at)}
                                updatedAt={formatDateToView(book.updated_at)}
                                onClick={this.handelClick}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

export default withRouter(AdminBookList);
