import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import AdminButton from '../../components/AdminButton';
import Toolbar from '@material-ui/core/Toolbar';

const toolBarStyle = {
    display: 'flex'
};

const btnStyle = {
    marginLeft: 'auto'
};

export default class AdminAppBar extends React.Component {

    constructor(props) {
        super(props);
    }

    handelLogoutClick = () => {
        this.props.onLogoutClick();
    }

    render() {
        return (
            <div style={this.props.style}>
                <AppBar position="static">
                    <Toolbar style={toolBarStyle}>
                        <AdminButton
                            style={btnStyle}
                            variant="contained"
                            color="secondary"
                            text="Logout"
                            onClick={this.handelLogoutClick}
                        />
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
