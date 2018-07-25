import React from 'react';
import {withRouter} from 'react-router';
import AdminList from './AdminList';
import AdminAccessMessage from './AdminAccessMessage';
import AdminAppBar from './AdminAppBar';
import {getManageApps, getLogout} from './adminService';
import {getUpdatedState, isLogged} from '../../helpers';

class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            manageApps: [],
            language: 'uk'
        };
    }

    componentWillMount() {
        getManageApps().then(response => {
            if (response.status === 200) {
                const changesObj = {
                    manageApps: response.data.apps
                };
                this.setState(getUpdatedState(changesObj, this.state));
            }
        });
    }

    navigateToItem = itemName => {
        this.props.history.push(`/admin/${itemName.toLowerCase()}`);
    }

    navigateToLogin = () => {
        this.props.history.push('/login/');
    }

    handleLogoutClick = () => {
        getLogout().then(response => {
            if (response.status === 200) {
                this.navigateToLogin();
            }
        });
    }

    handleLanguageChange = language => {
        this.setState(getUpdatedState({language: language}, this.state));
    }

    renderManageApps = () => {
        return (
            <div>
                <AdminAppBar
                    language={this.state.language}
                    onLogoutClick={this.handleLogoutClick}
                    onLanguageChange={this.handleLanguageChange}
                />
                <AdminList
                    items={this.state.manageApps}
                    onItemClick={this.navigateToItem}
                />
            </div>
        );
    }

    renderAdminMessage = () => {
        return(
            <AdminAccessMessage />
        );
    }

    render() {
        const element = isLogged() ? this.renderManageApps() : this.renderAdminMessage();
        return(element);
    }
}

export default withRouter(Admin);
