import React from 'react';
import Cell from './Cell.js';

class Row extends React.Component {
  render() {
    return (
      <div className="nonogram-row">
        {this.renderCells()}
      </div>
    );
  }
  renderCells() {
    let cells = new Array(0);
    for(let i = 0; i < this.props.bitmap.colLength; i++) {
      cells.push(
        <Cell 
          rowIndex={this.props.index} 
          colIndex={i} 
          key={`${this.props.index}-${i}`} 
          bit={this.props.bitmap.data[0][i]} 
        />
      );
    }
    return cells;
  }
}

export default Row;