import React from 'react';
import {withRouter} from 'react-router';
import AdminPressPostListItem from './AdminPressPostListItem';
import {formatDateToView} from '../../helpers';

const baseStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 15
};

class AdminPressPostList extends React.Component {

    handelClick = itemId => {
        this.props.onListItemClick(itemId);
    }

    render() {
        const style = this.props.style ? Object.assign(this.props.style, baseStyle) : baseStyle;
        return (
            <div style={style}>
                {
                    this.props.pressPosts.map(pressPost => {
                        return (
                            <AdminPressPostListItem
                                key={pressPost.id}
                                id={pressPost.id}
                                avatar={pressPost.avatar}
                                translations={pressPost.translations}
                                createdAt={formatDateToView(pressPost.created_at)}
                                updatedAt={formatDateToView(pressPost.updated_at)}
                                onClick={this.handelClick}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

export default withRouter(AdminPressPostList);
