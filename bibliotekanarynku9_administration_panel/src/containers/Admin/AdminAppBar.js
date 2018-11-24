import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AdminButton from '../../components/AdminButton';

const toolBarStyle = {
    display: 'flex'
};

const btnStyle = {
    marginLeft: 'auto'
};

export default class AdminAppBar extends React.Component {

    handelLogoutClick = () => {
        this.props.onLogoutClick();
    }

    handleNavIconClick = () => {
        this.props.onNavIconClick();
    }

    render() {
        return (
            <div style={this.props.style}>
                <AppBar position='static'>
                    <Toolbar style={toolBarStyle}>
                        <IconButton
                            color='inherit'
                            aria-label='Menu'
                            onClick={this.handleNavIconClick}
                        >
                            <MenuIcon />
                        </IconButton>
                        <AdminButton
                            style={btnStyle}
                            variant='contained'
                            color='secondary'
                            text='Logout'
                            onClick={this.handelLogoutClick}
                        />
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
