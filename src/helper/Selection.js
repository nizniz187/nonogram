/**
 * @class Selection
 * Class for a user selection, indicating a set of consecutive positions.
 */
class Selection {
  constructor(start, end) {
    this.start = this.end = new Position(start);
    if(this.start === null) { throw new Error('Invalid position data.'); }

    this.updateEnd(new Position(end));
  }

  /**
   * Check if a position is on the same horizontal or vertial line of this selection.
   * @param {Postion} position
   * @returns {Booleans}
   */
  alignWith(position) {
    if(this.start.rowIndex === this.end.rowIndex === position.rowIndex) {
      return true;
    }
    if(this.start.colIndex === this.end.colIndex === position.colIndex) {
      return true;
    }
    return false;
  }
  updateEnd(end) {
    end = new Position(end);
    if(end === null || !this.alignWith(end)) { return; }

    this.end = end;
  }
}

/**
 * @class Position
 * Class for a position with row & column index, 
 *  indicating an element in a 2-dimensional array.
 */
class Position {
  constructor({rowIndex, colIndex} = {}) {
    if(!this.isIndexValid(rowIndex) || !this.isIndexValid(colIndex)) {
      return null;
    }
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
  }
  
  isIndexValid(index) { return Number.isInteger(index) && index >= 0; }
}

export default Selection;