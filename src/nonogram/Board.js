import React from 'react';
import Row from './Row.js';

/**
 * @class Board
 * Class for the nonogram board.
 */
class Board extends React.Component {
  render() {
    return (
      <div className="nonogram-board"
        onMouseDown={this.selectStartHandler.bind(this)}
        onMouseUp={this.selectEndHandler.bind(this)}
        onMouseMove={this.selectHandler.bind(this)}
      >
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
        />
      );
    }
    return rows;
  }
  selectEndHandler(e) {
    
  }
  selectHandler(e) {
    if(this.selectStart) {}
  }
  selectStartHandler(e) {
    let rowIndex = e.target.getAttribute('row-index');
    let colIndex = e.target.getAttribute('col-index');
    this.selectStart = {rowIndex, colIndex};
  }
}

export default Board;