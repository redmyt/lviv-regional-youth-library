import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Input from '@material-ui/core/Input';

const lookupStyle = {
    paddingTop: '20%'
};

const editStyle = {
    paddingTop: '10%',
    opacity: '0.6'
};

const inputStyle = {
    margin: '10px 24px'
};

export default class AdminAvatarField extends React.Component {

    reader = new FileReader();

    handleChange = event => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            this.reader.readAsDataURL(file);
            this.reader.onloadend = () => {
                this.props.onAvatarChange(this.reader.result);
            };
        }
    }

    renderEditField = () => {
        return (
            <div>
                <CardMedia style={editStyle} image={this.props.avatar} />
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
                <CardMedia style={lookupStyle} image={this.props.avatar} />
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
