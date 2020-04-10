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
    for(let i = 0; i < this.props.length; i++) {
      cells.push(
        <Cell 
          rowIndex={this.props.index} colIndex={i} key={`${this.props.index}-${i}`} 
          updateUserBitHandler={this.props.updateUserBitHandler}
        />
      );
    }
    return cells;
  }
}

export default Row;