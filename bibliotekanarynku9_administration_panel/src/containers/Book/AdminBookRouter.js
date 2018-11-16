import React from 'react';
import AdminBook from './AdminBook';
import {Route, withRouter} from 'react-router-dom';

class AdminBookRouter extends React.Component {
    render() {
        return (
            <div>
                <Route path={`${this.props.match.url}/book`} component={AdminBook} />
            </div>
        );
    }
}

export default withRouter(AdminBookRouter);
