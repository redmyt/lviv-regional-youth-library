import React from 'react';
import {withRouter} from 'react-router';
import AdminMessage from  '../../components/adminMessage';
import {isLogged} from '../../helpers';

const messageBodyStyle = {
    width: '50%'
};

const adminLoginAccessMessageTxt = 'You are not authenticated. Please navigate to Login view.',
    adminPermissionsAccessMessageTxt = 'You are not Administrators group member. Please request admin permissions.';

class AdminAccessMessage extends React.Component {

    navigateToLogin = () => {
        this.props.history.push('/login');
    }

    links = [{text: 'Go to Login', onClick: this.navigateToLogin}];

    renderLoginMessage = () => {
        return(
            <div>
                <AdminMessage
                    messageBodyStyle={messageBodyStyle}
                    message={adminLoginAccessMessageTxt}
                    links={this.links}
                />
            </div>
        );
    }

    renderPermissionsMessage = () => {
        return(
            <div>
                <AdminMessage
                    messageBodyStyle={messageBodyStyle}
                    message={adminPermissionsAccessMessageTxt}
                />
            </div>
        );
    }

    render() {
        const message = isLogged() ? this.renderPermissionsMessage() : this.renderLoginMessage();
        return message;
    }
}

export default withRouter(AdminAccessMessage);
