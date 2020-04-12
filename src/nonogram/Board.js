import React from 'react';
import Row from './Row.js';

import BitSelection from 'helper/BitSelection.js';
import BitPosition from 'helper/BitPosition.js';

/**
 * @class Board
 * Class for the nonogram board.
 */
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.selection = null;
  }

  getCellPosition(cell) {
    let rowIndex = cell.dataset.rowIndex;
    let colIndex = cell.dataset.colIndex;
    return new BitPosition(rowIndex, colIndex);
  }
  getUpdatedBit(bit) {
    if(bit >= 1) { return -1; }
    return ++bit;
  }
  getUpdatedExcludedBit(bit) {
    if(bit === -1) { return 0; }
    return -1;
  }
  render() {
    return (
      <div className="nonogram-board"
        onClick={this.updateCell.bind(this)}
        onContextMenu={this.updateCellExcluded.bind(this)}
        // onMouseDown={this.selectionStartHandler.bind(this)}
        // onMouseUp={this.selectionEndHandler.bind(this)}
        // onMouseMove={this.selectionHandler.bind(this)}
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
          userBitmap={this.props.userBitmap.slice(i, i + 1)}
        />
      );
    }
    return rows;
  }
  // selectionEndHandler(e) {
  //   if(this.selection === null) { return; }

  //   this.selection.updateEnd(this.getCellIndex(e.target));
  //   this.props.updateUserBitmapByBitSelection(this.selection);
  //   this.selection = null;
  // }
  // selectionHandler(e) {
  //   if(this.selection === null) { return; }

  //   this.selection.updateEnd(this.getCellIndex(e.target));
  //   this.props.updateUserBitmapByBitSelection(this.selection);
  // }
  // selectionStartHandler(e) {
  //   this.selection = new BitSelection(this.getCellIndex(e.target));
  //   this.props.updateUserBitmapByBitSelection(this.selection);
  // }
  updateCell(e) {
    let position = this.getCellPosition(e.target);
    let bit = this.props.getUserBitmapBit(position);
    this.props.updateUserBitmapByBit(position, this.getUpdatedBit(bit));
  }
  updateCellExcluded(e) {
    e.preventDefault();
    
    let position = this.getCellPosition(e.target);
    let bit = this.props.getUserBitmapBit(position);
    this.props.updateUserBitmapByBit(position, this.getUpdatedExcludedBit(bit));
  }
}

export default Board;