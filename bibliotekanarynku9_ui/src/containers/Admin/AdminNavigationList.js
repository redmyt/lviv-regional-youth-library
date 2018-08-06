import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import AdminNavigationItem from './AdminNavigationItem';

export default class AdminNavigationList extends React.Component {

    handleBackdropClick = () => {
        this.props.onBackdropClick();
    }

    handleNavItemClick = navItemName => {
        this.props.onNavItemClick(navItemName);
    }

    render() {
        return (
            <div>
                <Drawer
                    open={this.props.isOpen}
                    ModalProps={{onBackdropClick: this.handleBackdropClick}}
                >
                    {
                        this.props.items.map((item, index) => (
                            <AdminNavigationItem
                                itemName={item.name}
                                key={index}
                                onClick={this.handleNavItemClick}
                            />
                        ))
                    }
                </Drawer>
            </div>
        );
    }
}
