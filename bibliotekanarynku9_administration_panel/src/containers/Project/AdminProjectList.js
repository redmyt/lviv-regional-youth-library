import React from 'react';
import {withRouter} from 'react-router';
import AdminProjectListItem from './AdminProjectListItem';
import {formatDateToView} from '../../helpers';

const baseStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 15
};

class AdminProjectList extends React.Component {

    handelClick = itemId => {
        this.props.onListItemClick(itemId);
    }

    render() {
        const style = this.props.style ? Object.assign(this.props.style, baseStyle) : baseStyle;
        return (
            <div style={style}>
                {
                    this.props.projects.map(project => {
                        return (
                            <AdminProjectListItem
                                key={project.id}
                                id={project.id}
                                avatar={project.avatar}
                                translations={project.translations}
                                createdAt={formatDateToView(project.created_at)}
                                updatedAt={formatDateToView(project.updated_at)}
                                onClick={this.handelClick}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

export default withRouter(AdminProjectList);
