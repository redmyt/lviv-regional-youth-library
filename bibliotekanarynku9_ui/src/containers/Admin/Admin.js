import React from 'react';
import {withRouter} from 'react-router';
import AdminManageItem from './AdminManageItem';
import AdminAccessMessage from './AdminAccessMessage';
import {getManageItems} from './adminService';
import {getUpdatedState, isLogged} from '../../helpers';

const style = {
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
            manageItems: []
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

    renderManageItems = () => {
        return (
            <div style={style}>
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
