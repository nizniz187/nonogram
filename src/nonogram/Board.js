import React from 'react';
import Row from './Row.js';
import * as Cell from './Cell.js';

import BitSelection from 'helper/BitSelection.js';
import BitPosition from 'helper/BitPosition.js';

/**
 * @class Board
 * Class for the nonogram board.
 */
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.selection = this.bitUpdateObj = null;
    this.selectionEndHandler = this.selectionEndHandler.bind(this);
  }
  render() {
    return (
      <div className="nonogram-board"
        onMouseDown={this.selectionStartHandler.bind(this)}
        onMouseUp={this.selectionEndHandler}
        onMouseMove={this.selectionHandler.bind(this)}
      >
        {this.renderRows()}
      </div>
    );
  }
  componentDidMount() {
    /* Handle selection end outside of the component. */
    document.addEventListener('mouseup', this.selectionEndHandler);
  }
  componentWillUnmount() {
    document.removeEventListener('mouseup', this.selectionEndHandler);
  }

  /* Event Handlers */
  selectionStartHandler(e) {
    let position = this.getCellPosition(e.target);
    this.selection = new BitSelection(position);

    let oldBit = this.props.getUserBitmapBit(this.selection.start);
    /* 
      Get new bit value by mouse click button type. 
      Left button for checked mark toggle.
      Right button for excluded mark toggle.
    */
    let newBit = e.button === 2 
      ? this.getUpdatedBit(oldBit, Cell.BIT_VALUE_EXCLUDED)
      : this.getUpdatedBit(oldBit, Cell.BIT_VALUE_CHECKED);
    this.updateBitObj = { oldBit, newBit };
    this.updateUserBitmap();
  }
  selectionHandler(e) {
    if(this.selection === null) { return; }

    this.updateSelectionEnd(this.getCellPosition(e.target));
    this.updateUserBitmap();
  }
  selectionEndHandler(e) {
    if(this.selection === null) { return; }

    try{
      this.updateSelectionEnd(this.getCellPosition(e.target));
      this.updateUserBitmap();
    } catch(e) {
      // Event target is not a cell.
    } finally {
      this.selection = this.updateBitObj = null;
    }
  }

  getCellPosition(cell) {
    let rowIndex = cell.dataset.rowIndex;
    let colIndex = cell.dataset.colIndex;
    return new BitPosition(rowIndex, colIndex);
  }
  /**
   * Get updated bit value by given old & expected new bit value.
   * If the old & new value are the same, then update it to unchecked.
   * @param {int} oldBit - Old bit value to be updated.
   * @param {int} newBit - New bit value to be updated to.
   * @returns {int} Updated bit value.
   */
  getUpdatedBit(oldBit, newBit) {
    if(oldBit === newBit) { return Cell.BIT_VALUE_UNCHECKED; }
    return newBit;
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
  updateSelectionEnd(position) {
    if(this.selection.contains(position)) { return; }
    this.selection.updateEnd(position);
  }
  updateUserBitmap() {
    if(this.selection === null || this.updateBitObj === null) { return; }

    let positions = this.selection.getPositions();
    positions.forEach(position => {
      let bit = this.props.userBitmap.getBit(position);
      if(bit === this.updateBitObj.oldBit) {
        this.props.updateUserBitmapByBit(position, this.updateBitObj.newBit);
      }
    });
  }
}

export default Board;