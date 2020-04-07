import React from 'react';
import Row from './Row.jsx';
import './nonogram.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="nonogram-board">
        {this.renderRows(this.props.row, this.props.col)}
      </div>
    );
  }
  renderRows(rowLength, colLength) {
    let rows = new Array(0);
    for(let i = 0; i < rowLength; i++) {
      rows.push(<Row key={i} index={i} length={colLength} />);
    }
    return rows;
  }
}

export default Board;