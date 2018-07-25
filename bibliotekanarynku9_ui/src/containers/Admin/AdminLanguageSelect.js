import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AdminButton from '../../components/AdminButton';
import {getUpdatedState} from '../../helpers';

const baseStyle = {
    display: 'flex'
};

const btnStyle = {
    marginRight: 10
};

const selectStyle = {
    width: '100%'
};

const dialogActionsStyle = {
    justifyContent: 'center'
};

export default class AdminLanguageSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openDialog: false
        };
    }

    handleDialogOpen = () => {
        this.setState(getUpdatedState({openDialog: true}, this.state));
    };

    handleDialogClose = () => {
        this.setState(getUpdatedState({openDialog: false}, this.state));
    };

    handleSelectChange = event => {
        this.props.onLanguageChange(event.target.value);
    }

    render() {
        const style = this.props.style ? Object.assign(this.props.style, baseStyle) : baseStyle;

        return (
            <div style={style}>
                <AdminButton
                    style={btnStyle}
                    variant="contained"
                    text="Language"
                    onClick={this.handleDialogOpen}
                />
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.openDialog}
                >
                    <DialogTitle>Select the Language</DialogTitle>
                    <DialogContent>
                        <FormControl style={selectStyle}>
                            <Select
                                value={this.props.language}
                                onChange={this.handleSelectChange}
                            >
                                <MenuItem value="uk">Ukrainian</MenuItem>
                                <MenuItem value="en">English</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions style={dialogActionsStyle}>
                        <AdminButton
                            variant="outlined"
                            color="primary"
                            onClick={this.handleDialogClose}
                            text="Select"
                        />
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
