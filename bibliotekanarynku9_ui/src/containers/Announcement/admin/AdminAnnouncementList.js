import React from 'react';
import {withRouter} from 'react-router';
import AdminAnnouncementListItem from './AdminAnnouncementListItem';
import {formatDate} from '../../../helpers';

const baseStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 15
};

class AdminAnnouncementList extends React.Component {

    navigateToItem = itemId => {
        this.props.history.push(`${this.props.match.url}/${itemId}`);
    }

    render() {
        const style = this.props.style ? Object.assign(this.props.style, baseStyle) : baseStyle;
        return (
            <div style={style}>
                {
                    this.props.announcements.map(announcement => (
                        <AdminAnnouncementListItem
                            key={announcement.id}
                            id={announcement.id}
                            name={announcement.translations[0].title}
                            description={announcement.translations[0].description}
                            avatar={announcement.avatar}
                            startAt={formatDate(announcement.start_at)}
                            createdAt={formatDate(announcement.created_at)}
                            updatedAt={formatDate(announcement.updated_at)}
                            onClick={this.navigateToItem}
                        />
                    ))
                }
            </div>
        );
    }
}

export default withRouter(AdminAnnouncementList);
