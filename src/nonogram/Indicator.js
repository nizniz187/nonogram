import React from 'react';

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
    this.props.puzzleBitmap.snappedData[0].forEach((data, index) => {
      items.push(
        <div className='nonogram-indicator-item' key={index}>
          {data}
        </div>
      )
    });
    return items;
  }
}

export default Indicator;