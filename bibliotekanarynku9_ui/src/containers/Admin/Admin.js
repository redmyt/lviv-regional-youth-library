import React from 'react';
import {withRouter} from 'react-router';
import AdminManageItem from './AdminManageItem';
import AdminAccessMessage from './AdminAccessMessage';
import AdminAppBar from './AdminAppBar';
import {getManageItems, getLogout} from './adminService';
import {getUpdatedState, isLogged} from '../../helpers';

const layoutStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline'
};

const itemStyle = {
    width: '33%',
    padding: 25,
    boxSizing: 'border-box'
};

class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            manageItems: [],
            language: 'uk'
        };
    }

    componentWillMount() {
        getManageItems().then(response => {
            if (response.status === 200) {
                const changesObj = {
                    manageItems: response.data.apps
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

    renderManageItems = () => {
        return (
            <div>
                <AdminAppBar
                    language={this.state.language}
                    onLogoutClick={this.handleLogoutClick}
                    onLanguageChange={this.handleLanguageChange}
                />
                <div style={layoutStyle}>
                    {
                        this.state.manageItems.map((item, index) => (
                            <AdminManageItem
                                key={index}
                                style={itemStyle}
                                itemName={item.name}
                                itemDescription={item.description}
                                onClick={this.navigateToItem}
                            />
                        ))
                    }
                </div>
            </div>
        );
    }

    renderAdminMessage = () => {
        return(
            <AdminAccessMessage />
        );
    }

    render() {
        const element = isLogged() ? this.renderManageItems() : this.renderAdminMessage();
        return(element);
    }
}

export default withRouter(Admin);
