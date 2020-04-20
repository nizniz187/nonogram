import React from 'react';
import Row from './Row.js';
import * as Cell from './Cell.js';

import UserBitmap from 'data/UserBitmap.js';
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
        onMouseMove={this.selectionUpdateHandler}
        onMouseUp={this.selectionEndHandler}
        onTouchStart={this.selectionStartHandler}
        onTouchMove={this.selectionUpdateHandler}
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
    let newBit;
    if(e.type === 'touchstart') {
      /* Get new bit value by old value. */
      newBit = this.getUpdatedBit(oldBit);

      /* Add touch hold detection handler. */
      if(oldBit === Cell.BIT_VALUE_UNCHECKED) {
        this.touchHoldObj = {
          start: null,
          animationFrameId: requestAnimationFrame(this.touchHoldHandler)
        }
      }
    } else {
      /* 
        Get new bit value by mouse click button type. 
        Left button for checked mark toggle.
        Right button for excluded mark toggle.
      */
      newBit = e.button === 2 
        ? this.getUpdatedBit(oldBit, Cell.BIT_VALUE_EXCLUDED)
        : this.getUpdatedBit(oldBit, Cell.BIT_VALUE_CHECKED);
    }
    this.updateBitObj = { oldBit, newBit };
    this.updateUserBitmap();
  };
  selectionUpdateHandler = e => {
    if(this.selection === null) { return; }

    let target = this.getEventTarget(e);
    let position = this.getCellPosition(target);
    if(position === null) { return; }

    this.updateSelectionEnd(position);
    this.updateUserBitmap();
  };
  selectionEndHandler = e => {
    e.preventDefault(); // Prevent mouse events triggering on touchend.
    if(this.selection === null) { return; }
    
    this.selectionUpdateHandler(e);
    this.selection = this.updateBitObj = null;
  };
  /**
   * Request animation frame for touch hold detection.
   * If the hold duration meets the threshold, update the selection in excluded mode.
   * Otherwise ask the next animation frame until it meets or aborted.
   */
  touchHoldHandler = timestamp => {
    if(!this.touchHoldObj || !this.selection) { return; }
    if(this.selection.length !== 1) { 
      this.touchHoldObj.start = null;
      cancelAnimationFrame(this.touchHoldObj.animationFrameId);
      return; 
    }

    if(!this.touchHoldObj.start) { this.touchHoldObj.start = timestamp; }
    if(timestamp - this.touchHoldObj.start >= TOUCH_HOLD_DURATION) {
      cancelAnimationFrame(this.touchHoldObj.animationFrameId);
      this.touchHoldObj = null;
      let newBit = this.getUpdatedBit(this.updateBitObj.oldBit, Cell.BIT_VALUE_EXCLUDED);
      this.updateBitObj.newBit = newBit;
      this.props.updateUserBitmapByBit(this.selection.start, newBit);
    } else {
      this.touchHoldObj.animationFrameId = requestAnimationFrame(this.touchHoldHandler);
    }
  }

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
   * If the new value is not give, then toggle between old value & uncheked value.
   * @param {int} oldBit - Old bit value to be updated.
   * @param {int} [newBit] - New bit value to be updated to.
   * @returns {int} Updated bit value.
   */
  getUpdatedBit(oldBit, newBit) {
    if(UserBitmap.isBitValid(newBit)) {
      if(oldBit === newBit) { return Cell.BIT_VALUE_UNCHECKED; }
      return newBit;
    } else {
      if(oldBit === Cell.BIT_VALUE_UNCHECKED) { return Cell.BIT_VALUE_CHECKED; }
      return Cell.BIT_VALUE_UNCHECKED;
    }
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

const TOUCH_HOLD_DURATION = 400;

export default Board;