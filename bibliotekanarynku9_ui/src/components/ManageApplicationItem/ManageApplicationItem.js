import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import AdminButton from '../AdminButton';

export default class ManageApplicationItem extends React.Component {

    render() {
        // const style = this.props.style ? Object.assign(this.props.style, baseStyle) : baseStyle;
        return (
            <div>
                <Card>
                    <CardContent>
                        <h2>
                            {this.props.name}
                        </h2>
                        <p>
                            {this.props.description}
                        </p>
                    </CardContent>
                    <CardActions>
                        <AdminButton
                            size='small'
                            color='primary'
                            variant='contained'
                            onClick={this.handleClick}
                            text={'Go to item'}
                        />
                    </CardActions>
                </Card>
            </div>
        );
    }
}
