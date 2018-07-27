import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

export default class AdminNavigationItem extends React.Component {

    handleClick = () => {
        this.props.onClick(this.props.itemName);
    }

    render() {
        return (
            <div>
                <MenuItem onClick={this.handleClick}>
                    {this.props.itemName}
                </MenuItem>
            </div>
        );
    }
}
