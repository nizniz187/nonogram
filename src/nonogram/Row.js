import React from 'react';
import Cell from './Cell.js';

/**
 * @class Row
 * Class for a row in the nonogram board.
 */
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
    for(let i = 0; i < this.props.length; i++) {
      cells.push(
        <Cell 
          rowIndex={this.props.index} colIndex={i} 
          key={`cell-${this.props.index}-${i}`} 
          userBit={this.props.userBitmap.getBit({ rowIndex: 0, colIndex: i })}
        />
      );
    }
    return cells;
  }
}

export default Row;