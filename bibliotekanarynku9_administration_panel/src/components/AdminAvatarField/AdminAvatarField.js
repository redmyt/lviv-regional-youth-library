import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Input from '@material-ui/core/Input';
import {getUpdatedState} from '../../helpers';

const lookupStyle = {
    paddingTop: '20%'
};

const editStyle = {
    paddingTop: '10%',
    opacity: '0.6'
};

const emptyStyle = {
    paddingTop: 0
};

const inputStyle = {
    margin: '10px 24px'
};

export default class AdminAvatarField extends React.Component {

    reader = new FileReader();

    constructor(props) {
        super(props);
        this.state = {
            avatar: this.props.avatar
        };
    }

    handleChange = event => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            this.reader.readAsDataURL(file);
            this.reader.onloadend = () => {
                this.setState(getUpdatedState({
                    avatar: this.reader.result
                }, this.state));
                this.props.onAvatarChange(this.reader.result);
            };
        }
    }

    renderEditField = () => {
        return (
            <div>
                <CardMedia
                    style={this.state.avatar ? editStyle : emptyStyle}
                    image={this.state.avatar}
                />
                <Input
                    type='file'
                    style={inputStyle}
                    onChange={this.handleChange}
                />
            </div>
        );
    }

    renderLookUpField = () => {
        return (
            <div>
                <CardMedia style={lookupStyle} image={this.state.avatar} />
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.props.isEdit ? this.renderEditField() : this.renderLookUpField()}
            </div>
        );
    }
}
