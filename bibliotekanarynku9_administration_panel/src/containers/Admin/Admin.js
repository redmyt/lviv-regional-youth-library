import React from 'react';
import {withRouter} from 'react-router';
import AdminNavigationList from './AdminNavigationList';
import AdminAccessMessage from './AdminAccessMessage';
import AdminAppBar from './AdminAppBar';
import AdminRouter from './AdminRouter';
import {getManageApps, getLogout} from './adminService';
import {getUpdatedState, isLogged} from '../../helpers';

class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            manageApps: [],
            isNavListOpen: false
        };
    }

    componentWillMount() {
        if (isLogged()) {
            getManageApps().then(response => {
                if (response.status === 200) {
                    this.setState(getUpdatedState({
                        manageApps: response.data.apps
                    }, this.state));
                }
            });
        }
    }

    navigateToItem = itemName => {
        this.props.history.push(`${this.props.match.url}/${itemName.toLowerCase()}`);
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
                <AdminAppBar
                    onLogoutClick={this.handleLogoutClick}
                    onNavIconClick={this.handleNavIconClick}
                />
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
        const element = isLogged() ? this.renderManageApps() : this.renderAdminMessage();
        return(element);
    }
}

export default withRouter(Admin);
