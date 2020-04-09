import React from 'react';
import Row from './Row.js';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="nonogram-board">
        {this.renderRows(this.props.rowLength, this.props.colLength)}
      </div>
    );
  }
  renderRows(rowLength, colLength) {
    let rows = new Array(0);
    for(let i = 0; i < rowLength; i++) {
      rows.push(
        <Row key={i} index={i} bitmap={this.props.bitmap.slice(i, i + 1)} />
      );
    }
    return rows;
  }
}

export default Board;