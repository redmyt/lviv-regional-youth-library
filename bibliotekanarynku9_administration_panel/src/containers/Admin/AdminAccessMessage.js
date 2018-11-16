import React from 'react';
import {withRouter} from 'react-router';
import AdminMessage from  '../../components/adminMessage';

const messageBodyStyle = {
    width: '50%'
};

const adminAccessMessageTxt = 'You are not authenticated. Please navigate to Login view.';

class AdminAccessMessage extends React.Component {

    constructor(props) {
        super(props);
    }

    navigateToLogin = () => {
        this.props.history.push('/login');
    }

    links = [{text: 'Go to Login', onClick: this.navigateToLogin}];

    render() {
        return (
            <div>
                <AdminMessage
                    messageBodyStyle={messageBodyStyle}
                    message={adminAccessMessageTxt}
                    links={this.links}
                />
            </div>
        );
    }
}

export default withRouter(AdminAccessMessage);
