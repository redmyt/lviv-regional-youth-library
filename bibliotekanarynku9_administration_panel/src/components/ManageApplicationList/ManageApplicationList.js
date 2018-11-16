import React from 'react';
import ManageApplicationItem from '../ManageApplicationItem';

const baseStyle = {
    display: 'flex',
    flexDirection: 'column'
};

export default class ManageApplicationList extends React.Component {
    render() {
        const style = this.props.style ? Object.assign(this.props.style, baseStyle) : baseStyle;
        return (
            <div style={style}>
                {
                    this.props.manageItems.map((item, index) => (
                        <ManageApplicationItem
                            key={index}
                        />
                    ))
                }
            </div>
        );
    }
}
