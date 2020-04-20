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
    this.selectionEndHandler = this.selectionEndHandler;
  }
  render() {
    return (
      <div className="nonogram-board"
        onMouseDown={this.selectionStartHandler}
        onMouseMove={this.selectionHandler}
        onMouseUp={this.selectionEndHandler}
        onTouchStart={this.selectionStartHandler}
        onTouchMove={this.selectionHandler}
        onTouchEnd={this.selectionEndHandler}
        onTouchCancel={this.selectionEndHandler}
      >
        {this.renderRows()}
      </div>
    );
  }
  componentDidMount() {
    /* Handle selection end outside of the component. */
    document.addEventListener('mouseup', this.selectionEndHandler);
    document.addEventListener('touchend', this.selectionEndHandler);
    document.addEventListener('touchcancel', this.selectionEndHandler);
  }
  componentWillUnmount() {
    document.removeEventListener('mouseup', this.selectionEndHandler);
    document.removeEventListener('touchend', this.selectionEndHandler);
    document.removeEventListener('touchcancel', this.selectionEndHandler);
  }

  /* Event Handlers */
  selectionStartHandler = e => {
    let target = this.getEventTarget(e);
    let position = this.getCellPosition(target);
    if(position === null) { return; }

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
  };
  selectionHandler = e => {
    if(this.selection === null) { return; }

    let target = this.getEventTarget(e);
    let position = this.getCellPosition(target);
    if(position === null) { return; }

    this.updateSelectionEnd(position);
    this.updateUserBitmap();
  };
  selectionEndHandler = e => {
    if(this.selection === null) { return; }
    
    this.selectionHandler(e);
    this.selection = this.updateBitObj = null;
  };

  getCellPosition(cell) {
    if(!(cell instanceof HTMLElement)) { return null; }

    let rowIndex = cell.dataset.rowIndex;
    let colIndex = cell.dataset.colIndex;
    try {
      return new BitPosition(rowIndex, colIndex);
    } catch(e) {  //Position index invalid.
      return null;
    }
  }
  getEventTarget(e) {
    if(e.changedTouches instanceof TouchList && e.changedTouches.length > 0) {
      return document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }
    return e.target;
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