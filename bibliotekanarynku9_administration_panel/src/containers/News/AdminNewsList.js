import React from 'react';
import {withRouter} from 'react-router';
import AdminNewsListItem from './AdminNewsListItem';
import {formatDateToView} from '../../helpers';

const baseStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 15
};

class AdminNewsList extends React.Component {

    handelClick = itemId => {
        this.props.onListItemClick(itemId);
    }

    render() {
        const style = this.props.style ? Object.assign(this.props.style, baseStyle) : baseStyle;
        return (
            <div style={style}>
                {
                    this.props.news.map(news => {
                        return (
                            <AdminNewsListItem
                                key={news.id}
                                id={news.id}
                                avatar={news.avatar}
                                translations={news.translations}
                                createdAt={formatDateToView(news.created_at)}
                                updatedAt={formatDateToView(news.updated_at)}
                                onClick={this.handelClick}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

export default withRouter(AdminNewsList);
