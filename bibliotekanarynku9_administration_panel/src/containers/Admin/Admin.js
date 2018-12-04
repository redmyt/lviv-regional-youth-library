import React from 'react';
import {withRouter} from 'react-router';
import AdminNavigationList from './AdminNavigationList';
import AdminAccessMessage from './AdminAccessMessage';
import AdminAppBar from './AdminAppBar';
import AdminRouter from './AdminRouter';
import {getManageApps, getLogout, requestPermissions, requestToAdmin} from './adminService';
import {getUpdatedState} from '../../helpers';

class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            manageApps: [],
            isNavListOpen: false,
            requestPermissionStatus: 1
        };
    }

    componentWillMount() {
        requestPermissions().
            then(() => {
                getManageApps().then(response => {
                    if (response.status === 200) {
                        this.setState(getUpdatedState({
                            manageApps: response.data.apps
                        }, this.state));
                    }
                });
            });
    }

    navigateToItem = itemName => {
        const url = this.props.match.url.endsWith('/') ? this.props.match.url.slice(0, -1) : this.props.match.url;
        this.props.history.push(`${url}/${itemName.toLowerCase()}`);
        this.setState(getUpdatedState({isNavListOpen: false}, this.state));
    }

    navigateToLogin = () => {
        this.props.history.push('/login/');
    }

    handleNavIconClick = () => {
        this.setState(getUpdatedState({isNavListOpen: true}, this.state));
    }

    handleNavListClose = () => {
        this.setState(getUpdatedState({isNavListOpen: false}, this.state));
    }

    handleRequestPermissionsClick = () => {
        requestToAdmin().then(() => {
            this.setState(getUpdatedState({requestPermissionStatus: 0}, this.state));
        }).catch(() => {
            this.setState(getUpdatedState({requestPermissionStatus: 2}, this.state));
        });
    }

    handleLogoutClick = () => {
        getLogout().then(response => {
            if (response.status === 200) {
                this.navigateToLogin();
            }
        });
    }

    renderManageApps = () => {
        return (
            <div>
                <AdminNavigationList
                    items={this.state.manageApps}
                    onItemClick={this.navigateToItem}
                    isOpen={this.state.isNavListOpen}
                    onNavItemClick={this.navigateToItem}
                    onBackdropClick={this.handleNavListClose}
                />
                <AdminRouter />
            </div>
        );
    }

    renderAdminMessage = () => {
        return (
            <AdminAccessMessage />
        );
    }

    render() {
        const element = this.state.manageApps.length ? this.renderManageApps() : this.renderAdminMessage();
        return (
            <div>
                <AdminAppBar
                    onLogoutClick={this.handleLogoutClick}
                    onNavIconClick={this.handleNavIconClick}
                    isAdmin={!!this.state.manageApps.length}
                    onRequestPermissionsClick={this.handleRequestPermissionsClick}
                    requestPermissionStatus={this.state.requestPermissionStatus}
                />
                {element}
            </div>
        );
    }
}

export default withRouter(Admin);
