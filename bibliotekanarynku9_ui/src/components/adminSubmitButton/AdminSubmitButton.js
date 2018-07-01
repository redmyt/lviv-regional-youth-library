import React from 'react';
import Button from '@material-ui/core/Button';

const baseStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

export default class AdminSubmitButton extends React.Component {
    render() {
        const style = this.props.style ? Object.assign(this.props.style, baseStyle) : baseStyle;
        return (
            <div style={style}>
                <Button variant="contained" color="primary" onClick={this.props.onClick}>
                    Submit
                </Button>
            </div>
        );
    }
}
