import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const baseStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

export default class AdminMessage extends React.Component {
    render() {
        const style = this.props.style ? Object.assign(this.props.style, baseStyle) : baseStyle;
        return (
            <div style={style}>
                <Card style={this.props.messageBodyStyle}>
                    <CardContent>
                        {this.props.message}
                    </CardContent>
                    <CardActions>
                        {
                            this.props.links && this.props.links.map((link, index) => (
                                <Button
                                    size='small'
                                    color='primary'
                                    key={index}
                                    onClick={link.onClick}>
                                    {link.text}
                                </Button>
                            ))
                        }
                    </CardActions>
                </Card>
            </div>
        );
    }
}
