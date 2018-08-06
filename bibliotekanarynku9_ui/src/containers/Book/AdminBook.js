import React from 'react';
import {withRouter} from 'react-router';

class AdminBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            announcements: []
        };
    }

    render() {
        return (
            <div>
                Admin Book
            </div>
        );
    }
}

export default withRouter(AdminBook);
