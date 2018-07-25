import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AdminButton from '../../components/AdminButton';
import AdminLanguageSelect from './AdminLanguageSelect';

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

    handelLanguageChange = language => {
        this.props.onLanguageChange(language);
    }

    render() {
        return (
            <div style={this.props.style}>
                <AppBar position="static">
                    <Toolbar style={toolBarStyle}>
                        <AdminLanguageSelect
                            language={this.props.language}
                            onLanguageChange={this.handelLanguageChange}
                        />
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
