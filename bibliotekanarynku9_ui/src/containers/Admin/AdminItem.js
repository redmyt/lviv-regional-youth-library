import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

export default class AdminItem extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick = () => {
        this.props.onClick(this.props.itemName);
    }

    render() {
        return (
            <div style={this.props.style}>
                <Card style={this.props.messageBodyStyle}>
                    <CardContent>
                        <h2>
                            {this.props.itemName}
                        </h2>
                        <p>
                            {this.props.itemDescription}
                        </p>
                    </CardContent>
                    <CardActions>
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={this.handleClick}
                        >
                            Go to {this.props.itemName}
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}
