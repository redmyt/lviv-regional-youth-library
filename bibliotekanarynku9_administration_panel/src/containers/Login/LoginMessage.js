import React from 'react';
import {withRouter} from 'react-router';
import AdminMessage from  '../../components/adminMessage';

const messageBodyStyle = {
    width: '50%'
};
const loginMessageTxt = 'You are already login. Please navigate to Admin view.';

class LoginMessage extends React.Component {

    constructor(props) {
        super(props);
    }

    navigateToAdmin = () => {
        this.props.history.push('/admin');
    }

    links = [{text: 'Go to Admin', onClick: this.navigateToAdmin}];

    render() {
        return (
            <div>
                <AdminMessage
                    messageBodyStyle={messageBodyStyle}
                    message={loginMessageTxt}
                    links={this.links}
                />
            </div>
        );
    }
}

export default withRouter(LoginMessage);
