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
    if(this.start.rowIndex === this.end.rowIndex === position.rowIndex) {
      return true;
    }
    if(this.start.colIndex === this.end.colIndex === position.colIndex) {
      return true;
    }
    return false;
  }
  updateEnd(end) {
    end = end instanceof BitPosition 
      ? end 
      : new BitPosition(end.rowIndex, end.colIndex);
    if(end === null || !this.alignWith(end)) { return; }

    this.end = end;
  }
}

export default BitSelection;