import BitPosition from 'helper/BitPosition.js';

/**
 * @class BitSelection
 * Class for a user bit selection, indicating a set of consecutive bit positions.
 */
class BitSelection {
  constructor(start, end) {
    this.start = this.createPosition(start);
    if(this.start === null) { throw new Error('Invalid position data.'); }

    this.end = this.start;
    this.updateEnd(end);
  }

  /**
   * Check if a position is on the same horizontal or vertial line of this selection.
   * @param {Postion} position
   * @returns {Boolean}
   */
  alignWith(position) {
    position = this.createPosition(position);
    if(this.start.onRowWith(this.end) && this.start.onRowWith(position)) {
      return true;
    }
    if(this.start.onColWith(this.end) && this.start.onColWith(position)) {
      return true;
    }
    return false;
  }
  contains(position) {
    position = this.createPosition(position);
    if(this.alignWith(position) !== true) { return false; }

    if(this.start.rowIndex === position.rowIndex) {
      let min = Math.min(this.start.colIndex, this.end.colIndex);
      let max = Math.max(this.start.colIndex, this.end.colIndex);
      return min <= position.colIndex && position.colIndex <= max;
    } else if(this.start.colIndex === position.colIndex) {
      let min = Math.min(this.start.rowIndex, this.end.rowIndex);
      let max = Math.max(this.start.rowIndex, this.end.rowIndex);
      return min <= position.rowIndex && position.rowIndex <= max;
    }
    return false;
  }
  createPosition(position) {
    if(position instanceof BitPosition) { return position; }
    
    return new BitPosition(position.rowIndex, position.colIndex);
  }
  /**
   * @getter Get column positions array with given row index range.
   * @returns {Array[BitPosition]}
   */
  getColumnPositions(colIndex, minRowIndex, maxRowIndex) {
    let positions = new Array(0);
    for(let i = minRowIndex; i <= maxRowIndex; i++) {
      positions.push(new BitPosition(i, colIndex));
    }
    return positions;
  }
  /**
   * @getter Get positions array included in this selection.
   * @returns {Array[BitPosition]}
   */
  getPositions() {
    if(this.direction === DIRECTION_TYPE_ROW) {
      let minColIndex = Math.min(this.start.colIndex, this.end.colIndex);
      let maxColIndex = Math.max(this.start.colIndex, this.end.colIndex);
      return this.getRowPositions(this.start.rowIndex, minColIndex, maxColIndex);
    } else if(this.direction === DIRECTION_TYPE_COLUMN) {
      let minRowIndex = Math.min(this.start.rowIndex, this.end.rowIndex);
      let maxRowIndex = Math.max(this.start.rowIndex, this.end.rowIndex);
      return this.getColumnPositions(this.start.colIndex, minRowIndex, maxRowIndex);
    } else {
      return [this.start.clone()];
    }
  }
  /**
   * @getter Get row positions array with given column index range.
   * @returns {Array[BitPosition]}
   */
  getRowPositions(rowIndex, minColIndex, maxColIndex) {
    let positions = new Array(0);
    for(let i = minColIndex; i <= maxColIndex; i++) {
      positions.push(new BitPosition(rowIndex, i));
    }
    return positions;
  }
  updateEnd(end) {
    if(typeof end !== 'object') { return; }

    end = this.createPosition(end);
    if(end === null || !this.alignWith(end)) { return; }

    this.end = end;
  }

  /**
   * @getter Get the direction of the selection.
   * @returns {String} 
   *  "COLUMN" for a column selection; 
   *  "ROW" for a row selection;
   *  "NONE" for only one position selection.
   */
  get direction() {
    if(this.start.equals(this.end)) {
      return DIRECTION_TYPE_NONE;
    }
    if(this.start.onRowWith(this.end)) {
      return DIRECTION_TYPE_ROW;
    }
    if(this.start.onColWith(this.end)) {
      return DIRECTION_TYPE_COLUMN;
    }
  }
  get length() {
    if(this.start.onRowWith(this.end)) {
      return Math.abs(this.end.colIndex - this.start.colIndex) + 1;
    } else {
      return Math.abs(this.end.rowIndex - this.start.rowIndex) + 1;
    }
  }
}
const DIRECTION_TYPE_NONE = 'NONE';
const DIRECTION_TYPE_COLUMN = 'COLUMN';
const DIRECTION_TYPE_ROW = 'ROW';

export default BitSelection;