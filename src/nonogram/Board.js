import React from 'react';
import Row from './Row.js';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="nonogram-board">
        {this.renderRows()}
      </div>
    );
  }
  renderRows() {
    let rows = new Array(0);
    for(let i = 0; i < this.props.rowLength; i++) {
      rows.push(
        <Row 
          key={i} index={i} length={this.props.colLength}
          updateUserBitHandler={this.props.updateUserBitHandler}
        />
      );
    }
    return rows;
  }
}

export default Board;