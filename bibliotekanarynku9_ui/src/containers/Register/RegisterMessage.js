import React from 'react';
import {withRouter} from 'react-router';
import AdminMessage from  '../../components/adminMessage';

const messageBodyStyle = {
    width: '50%'
};
const registerMessageTxt = 'You are already registered. Please confirm your email '
                         + 'login to the system or go to the Admin view.';

class RegisterMessage extends React.Component {

    constructor(props) {
        super(props);
    }

    navigateToAdmin = () => {
        this.props.history.push('/admin');
    }

    navigateToLogin = () => {
        this.props.history.push('/login');
    }

    links = [
        {
            text: 'Go to Admin', onClick: this.navigateToAdmin
        },
        {
            text: 'Go to Login', onClick: this.navigateToLogin
        }
    ];

    render() {
        return (
            <div>
                <AdminMessage
                    messageBodyStyle={messageBodyStyle}
                    message={registerMessageTxt}
                    links={this.links}
                />
            </div>
        );
    }
}

export default withRouter(RegisterMessage);
