import BitPosition from 'helper/BitPosition.js';

/**
 * @class BitSelection
 * Class for a user bit selection, indicating a set of consecutive bit positions.
 */
class BitSelection {
  constructor(start, end) {
    this.start = start instanceof BitPosition 
      ? start 
      : new BitPosition(start.rowIndex, start.colIndex);
    if(this.start === null) { throw new Error('Invalid position data.'); }

    this.end = this.start;
    this.updateEnd(end);
  }

  /**
   * Check if a position is on the same horizontal or vertial line of this selection.
   * @param {Postion} position
   * @returns {Booleans}
   */
  alignWith(position) {
    position = position instanceof BitPosition 
      ? position 
      : new BitPosition(position.rowIndex, position.colIndex);
    if(this.start.onRowWith(this.end) && this.start.onRowWith(position)) {
      return true;
    }
    if(this.start.onColWith(this.end) && this.start.onColWith(position)) {
      return true;
    }
    return false;
  }  
  /**
   * @getter Get column positions array with given row index range.
   * @returns {Array[BitPosition]}
   */
  getColPositions(colIndex, minRowIndex, maxRowIndex) {
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
    if(this.direction === BitSelection.DIRECTION_ROW) {
      let minColIndex = Math.min(this.start.colIndex, this.end.colIndex);
      let maxColIndex = Math.max(this.start.colIndex, this.end.colIndex);
      return this.getRowPositions(this.start.rowIndex, minColIndex, maxColIndex);
    } else if(this.direction === BitSelection.DIRECTION_COLUMN) {
      let minRowIndex = Math.min(this.start.rowIndex, this.end.rowIndex);
      let maxRowIndex = Math.max(this.start.rowIndex, this.end.rowIndex);
      return this.getColPositions(this.start.colIndex, minRowIndex, maxRowIndex);
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

    end = end instanceof BitPosition 
      ? end 
      : new BitPosition(end.rowIndex, end.colIndex);
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
      return BitSelection.DIRECTION_NONE;
    }
    if(this.start.onRowWith(this.end)) {
      return BitSelection.DIRECTION_ROW;
    }
    if(this.start.onColWith(this.end)) {
      return BitSelection.DIRECTION_COLUMN;
    }
  }
}
BitSelection.DIRECTION_NONE = 'NONE';
BitSelection.DIRECTION_COLUMN = 'COLUMN';
BitSelection.DIRECTION_ROW = 'ROW';

export default BitSelection;