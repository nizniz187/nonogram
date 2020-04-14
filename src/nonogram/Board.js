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
    this.selection = this.selectionStartBit = null;
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
        // onClick={this.updateCell.bind(this)}
        // onContextMenu={this.updateCellExcluded.bind(this)}
        onMouseDown={this.selectionStartHandler.bind(this)}
        onMouseUp={this.selectionEndHandler.bind(this)}
        onMouseMove={this.selectionHandler.bind(this)}
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
          key={`row-${i}`} index={i} length={this.props.colLength}
          userBitmap={this.props.userBitmap.slice(i, i + 1)}
        />
      );
    }
    return rows;
  }
  selectionEndHandler(e) {
    if(this.selection === null) { return; }

    this.selection.updateEnd(this.getCellPosition(e.target));
    this.updateUserBitmap();
    this.selection = this.selectionStartBit = null;
  }
  selectionHandler(e) {
    if(this.selection === null) { return; }

    this.selection.updateEnd(this.getCellPosition(e.target));
    this.updateUserBitmap();
  }
  selectionStartHandler(e) {
    let position = this.getCellPosition(e.target);
    this.selection = new BitSelection(position);
    this.updateUserBitmap();
  }
  // updateCell(e) {
  //   let position = this.getCellPosition(e.target);
  //   let bit = this.props.getUserBitmapBit(position);
  //   this.props.updateUserBitmapByBit(position, this.getUpdatedBit(bit));
  // }
  // updateCellExcluded(e) {
  //   e.preventDefault();
    
  //   let position = this.getCellPosition(e.target);
  //   let bit = this.props.getUserBitmapBit(position);
  //   this.props.updateUserBitmapByBit(position, this.getUpdatedExcludedBit(bit));
  // }
  updateUserBitmap() {
    if(this.selection === null) { return; }
    if(this.selectionStartBit === null) {
      this.selectionStartBit = this.props.getUserBitmapBit(this.selection.start);
    }

    let updatedBit = this.getUpdatedBit(this.selectionStartBit);
    let positions = this.selection.getPositions();
    positions.forEach(position => {
      let bit = this.props.userBitmap.getBit(position);
      if(bit === this.selectionStartBit) {
        this.props.updateUserBitmapByBit(position, updatedBit);
      }
    });
  }
}

export default Board;