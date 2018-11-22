import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import AdminAnnouncement from '../Announcement/admin';
import AdminBook from '../Book/AdminBook';

class AdminRouter extends React.Component {

    render() {
        return (
            <div>
                <Route path={`${this.props.match.url}/announcement`} component={AdminAnnouncement} />
                <Route path={`${this.props.match.url}/book`} component={AdminBook} />
            </div>
        );
    }
}

export default withRouter(AdminRouter);
