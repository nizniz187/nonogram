import React from 'react';
import Cell from './Cell.js';

class Row extends React.Component {
  render() {
    return (
      <div className="nonogram-row">
        {this.renderCells(this.props.index, this.props.length)}
      </div>
    );
  }
  renderCells(index, length) {
    let cells = new Array(0);
    for(let i = 0; i < length; i++) {
      cells.push(
        <Cell rowIndex={index} colIndex={i} key={`${index}-${i}`} bit={this.props.bitmap[i]} />
      );
    }
    return cells;
  }
}

export default Row;