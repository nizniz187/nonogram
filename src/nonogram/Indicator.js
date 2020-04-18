import React from 'react';

/**
 * @class Indicator
 * Class for an indicator item.
 */
class Indicator extends React.Component {
  render() {
    return (
      <div className={`nonogram-indicator ${this.props.type}`}>
        {this.renderItems()}
      </div>
    );
  }
  
  renderItems() {
    let items = new Array(0);
    this.props.data.forEach((value, index) => {
      items.push(
        <div className='nonogram-indicator-item' 
          key={`indicator-${this.props.type}-item-${index}`}
        >
          {value}
        </div>
      )
    });
    return items;
  }
}

export default Indicator;