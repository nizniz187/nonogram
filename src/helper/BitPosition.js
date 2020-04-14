/**
 * @class BitPosition
 * Class for a bit position with row & column index, 
 *  indicating an element in a 2-dimensional array.
 */
class BitPosition {
  constructor(rowIndex, colIndex) {
    rowIndex = Number(rowIndex);
    colIndex = Number(colIndex);
    if(!this.isIndexValid(rowIndex) || !this.isIndexValid(colIndex)) {
      return null;
    }

    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
  }
  
  clone() { return new BitPosition(this.rowIndex, this.colIndex); }
  equals(position) {
    if(!(position instanceof BitPosition)) { return false; }

    return this.rowIndex === position.rowIndex && this.colIndex === position.colIndex;
  }
  isIndexValid(index) { return Number.isInteger(index) && index >= 0; }
  /**
   * Check if a given position is on the same column with self.
   * @param {BitPostion} position 
   */
  onColWith(position) {
    if(!(position instanceof BitPosition)) { return false; }
    
    return this.colIndex === position.colIndex;
  }
  /**
   * Check if a given position is on the same row with self.
   * @param {BitPosition} position 
   */
  onRowWith(position) {
    if(!(position instanceof BitPosition)) { return false; }
    
    return this.rowIndex === position.rowIndex;
  }
}

export default BitPosition;