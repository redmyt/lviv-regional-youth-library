import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import AdminAnnouncement from '../Announcement';
import AdminAnnouncementItem from '../Announcement/AdminAnnouncementItem';
import AdminNews from '../News';
import AdminNewsItem from '../News/AdminNewsItem';
import AdminProject from '../Project';
import AdminProjectItem from '../Project/AdminProjectItem';
import AdminPressPost from '../PressPost';
import AdminPressPostItem from '../PressPost/AdminPressPostItem';
import AdminBook from '../Book/AdminBook';

class AdminRouter extends React.Component {

    render() {
        return (
            <div>
                <Route exact path={`${this.props.match.url}/announcement`} component={AdminAnnouncement} />
                <Route exact path={`${this.props.match.url}/announcement/:announcementId`} component={AdminAnnouncementItem} />
                <Route exact path={`${this.props.match.url}/newspost`} component={AdminNews} />
                <Route exact path={`${this.props.match.url}/newspost/:newsId`} component={AdminNewsItem} />
                <Route exact path={`${this.props.match.url}/project`} component={AdminProject} />
                <Route exact path={`${this.props.match.url}/project/:projectId`} component={AdminProjectItem} />
                <Route exact path={`${this.props.match.url}/presspost`} component={AdminPressPost} />
                <Route exact path={`${this.props.match.url}/presspost/:pressPostId`} component={AdminPressPostItem} />
                <Route path={`${this.props.match.url}/book`} component={AdminBook} />
            </div>
        );
    }
}

export default withRouter(AdminRouter);
