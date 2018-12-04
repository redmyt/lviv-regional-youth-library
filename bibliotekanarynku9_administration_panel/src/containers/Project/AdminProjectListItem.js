import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AdminButton from '../../components/AdminButton';
import {parseImagePath} from '../../helpers';

const baseStyle = {
    width: '20%',
    margin: '15px 5px',
    boxSizing: 'border-box'
};

const mediaStyle = {
    height: 0,
    paddingTop: '35%'
};

export default class AdminProjectListItem extends React.Component {

    handleClick = () => {
        this.props.onClick(this.props.id);
    }

    render() {
        const style = this.props.style ? Object.assign(this.props.style, baseStyle) : baseStyle;
        return (
            <div style={style}>
                <Card>
                    <CardMedia style={mediaStyle} image={parseImagePath(this.props.avatar)} />
                    <CardContent>
                        <p>Translations: {this.props.translations.length}</p>
                        <p>Create at: {this.props.createdAt}</p>
                        <p>Update at: {this.props.updatedAt}</p>
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
