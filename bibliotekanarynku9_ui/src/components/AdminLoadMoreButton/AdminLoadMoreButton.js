import React from 'react';
import Button from '@material-ui/core/Button';

const baseStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

export default class AdminLoadMoreButton extends React.Component {

    render() {
        const style = this.props.style ? Object.assign(this.props.style, baseStyle) : baseStyle,
            element = this.props.isDisabled ? (
                <div style={style}>
                    <Button
                        variant={this.props.variant}
                        color='secondary'
                        disabled
                    >
                        Load more
                    </Button>
                </div>
            ) : (
                <div style={style}>
                    <Button
                        variant={this.props.variant}
                        color='secondary'
                        onClick={this.props.onClick}
                    >
                        Load more
                    </Button>
                </div>
            );
        return (element);
    }
}
