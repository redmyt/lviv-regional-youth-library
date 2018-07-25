import React from 'react';
import AdminItem from './AdminItem';

const style = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline'
};

const itemStyle = {
    width: '33%',
    padding: 25,
    boxSizing: 'border-box'
};

export default class AdminList extends React.Component {

    constructor(props) {
        super(props);
    }

    handleItemClick = itemName => {
        this.props.onItemClick(itemName);
    }

    render() {
        return (
            <div style={style}>
                {
                    this.props.items.map((item, index) => (
                        <AdminItem
                            key={index}
                            style={itemStyle}
                            itemName={item.name}
                            itemDescription={item.description}
                            onClick={this.handleItemClick}
                        />
                    ))
                }
            </div>
        );
    }
}
