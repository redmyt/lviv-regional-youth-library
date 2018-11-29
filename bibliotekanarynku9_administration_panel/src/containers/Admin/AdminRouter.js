import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import AdminAnnouncement from '../Announcement';
import AdminAnnouncementItem from '../Announcement/AdminAnnouncementItem';
import AdminNews from '../News';
import AdminNewsItem from '../News/AdminNewsItem';
import AdminBook from '../Book/AdminBook';

class AdminRouter extends React.Component {

    render() {
        return (
            <div>
                <Route exact path={`${this.props.match.url}/announcement`} component={AdminAnnouncement} />
                <Route exact path={`${this.props.match.url}/announcement/:announcementId`} component={AdminAnnouncementItem} />
                <Route exact path={`${this.props.match.url}/newspost`} component={AdminNews} />
                <Route exact path={`${this.props.match.url}/newspost/:newsId`} component={AdminNewsItem} />
                <Route path={`${this.props.match.url}/book`} component={AdminBook} />
            </div>
        );
    }
}

export default withRouter(AdminRouter);
