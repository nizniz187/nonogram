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
  
  isIndexValid(index) { return Number.isInteger(index) && index >= 0; }
}

export default BitPosition;