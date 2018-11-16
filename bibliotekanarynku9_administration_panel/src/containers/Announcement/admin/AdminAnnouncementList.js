import React from 'react';
import {withRouter} from 'react-router';
import AdminAnnouncementListItem from './AdminAnnouncementListItem';
import {formatDateToView, getTranslation} from '../../../helpers';

const baseStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 15
};

class AdminAnnouncementList extends React.Component {

    handelClick = itemId => {
        this.props.onListItemClick(itemId);
        this.props.history.push(`${this.props.match.url}/${itemId}`);
    }

    render() {
        const style = this.props.style ? Object.assign(this.props.style, baseStyle) : baseStyle;
        return (
            <div style={style}>
                {
                    this.props.announcements.map(announcement => {
                        const translation = getTranslation(announcement);
                        return (
                            <AdminAnnouncementListItem
                                key={announcement.id}
                                id={announcement.id}
                                name={translation.title}
                                description={translation.description}
                                avatar={announcement.avatar}
                                startAt={formatDateToView(announcement.start_at)}
                                createdAt={formatDateToView(announcement.created_at)}
                                updatedAt={formatDateToView(announcement.updated_at)}
                                onClick={this.handelClick}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

export default withRouter(AdminAnnouncementList);
