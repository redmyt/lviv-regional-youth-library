import React from 'react';
import Button from '@material-ui/core/Button';

const baseStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

export default class AdminButton extends React.Component {
    render() {
        const style = this.props.style ? Object.assign(this.props.style, baseStyle) : baseStyle;
        return (
            <div style={style}>
                <Button
                    variant={this.props.variant}
                    color={this.props.color}
                    onClick={this.props.onClick}
                    disabled={this.props.disabled}
                >
                    {this.props.text}
                </Button>
            </div>
        );
    }
}
