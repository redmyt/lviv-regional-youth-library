import React from 'react';
import Typography from '@material-ui/core/Typography';
import AdminLinkField from '../../components/AdminLinkField/AdminLinkField';

const headLabelStyle = {
    fontWeight: 'bold'
};

class AdminPressPostTranslationLinksList extends React.Component {

    handleLinkUpdateClick = (linkId, label, href) => {
        this.props.onLinkUpdateClick(linkId, label, href);
    }

    handleLinkRemoveClick = linkId => {
        this.props.onLinkRemoveClick(linkId);
    }

    render() {
        return (
            <div>
                {
                    !!this.props.links.length && (
                        <Typography component='p' variant='subheading'>
                            <span style={headLabelStyle}>{'Links:'}</span>
                        </Typography>
                    )
                }
                {
                    this.props.links.map(link => (
                        link && (
                            <AdminLinkField
                                key={link.id}
                                id={link.id}
                                label={link.label}
                                href={link.href}
                                isEdit={this.props.isEdit}
                                isError={this.props.isError}
                                onUpdateClick={this.handleLinkUpdateClick}
                                onRemoveClick={this.handleLinkRemoveClick}
                            />
                        )
                    ))
                }
            </div>
        );
    }
}

export default AdminPressPostTranslationLinksList;
