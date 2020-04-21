/**
 * @class PuzzleBitmap
 * Bitmap for a nonogram puzzle.
 */
class PuzzleBitmap {
  /**
   * Create a bitmap with a given data,
   *  otherwise create it with given size for null data.
   * @param {Object} params
   * @param {int} [params.rowLength] - Row length.
   * @param {int} [params.colLEngth] - Column length.
   * @param {Array[int][int]} [params.data] - Bitmap data.
   */
  constructor({ rowLength, colLength, data } = {}) {
    if(this.isDataValid(data)) {
      this._data = this.normalizeData(data);
    } else {
      this._data = this.createNullData(rowLength, colLength);
    }
  }

  static createRandom(rowLength, colLength) {
    let data = PuzzleBitmap.createRandomData(rowLength, colLength);
    return new PuzzleBitmap({ data });
  }
  static createRandomData(rowLength, colLength) {    
    if(!PuzzleBitmap.isSizeValid(rowLength) || !PuzzleBitmap.isSizeValid(colLength)) {
      throw new Error('Invalid data size.');
    }

    let data = new Array(0);
    for(let i = 0; i < rowLength; i++) {
      let row = new Array(0);
      for(let j = 0; j < colLength; j++) {
        row.push(Math.round(Math.random()));
      }
      data.push(row);
    }
    return data;
  }
  static isBitValid(bit) { return bit === 0 || bit === 1; }
  static isSizeValid(size) { return Number.isInteger(size) && size > 0; }

  clone() { return new PuzzleBitmap({ data: this.data }); }
  /**
   * Create a bitmap with given size filled with 0s.
   * @param {int} rowLength - Row length.
   * @param {int} colLength - Column length.
   * @returns {Array[int][int]} Created null data array.
   */
  createNullData(rowLength, colLength) {
    if(!this.isSizeValid(rowLength) || !this.isSizeValid(colLength)) {
      throw new Error('Invalid data size.');
    }
    
    let data = new Array(0);
    for(let i = 0; i < rowLength; i++) {
      let row = new Array(colLength);
      row.fill(0);
      data.push(row);
    }
    return data;
  }
  equals(bitmap) {
    return this.data.every((row, rowIndex) => {
      return row.every((bit, colIndex) => {
        return bit === bitmap.getBit(rowIndex, colIndex);
      });
    });
  }
  /**
   * Get snapped data of a row or a column by combine all 1s & remove all others.
   * @param {Array} array - Row or column array data.
   * @returns {Array} Snapped array data.
   */
  getArraySnappedData(array) {
    let snappedData = new Array(0);
    array.forEach((bit, index) => {
      if(bit !== 1) { return; }
      if(snappedData.length === 0) {
        snappedData.push(1);
        return;
      }

      if(index === 0 || array[index - 1] === 1) {
        snappedData[snappedData.length - 1]++;
      } else {
        snappedData.push(1);
      }
    });
    return snappedData;
  }
  getBit(position) { return this.data[position.rowIndex][position.colIndex]; }
  /**
   * Get the count of bits with a given value.
   * @param {int} bit - Specific bit value to be counted.
   * @returns {int} Bit count.
   */
  getBitCount(bit) {
    let count = 0;
    this._data.forEach(row => {
      count += row.filter(value => value === bit).length;
    });
    return count;
  }
  getColumnData(colIndex) {
    if(!this.isColumnIndexValid(colIndex)) { throw new Error('Invalid index.'); }
    
    let column = new Array(0);
    this.data.forEach(row => {
      column.push(row[colIndex]);
    });
    return column;
  }
  getColumnSnappedData(colIndex) {    
    let columnData = this.getColumnData(colIndex);
    return this.getArraySnappedData(columnData);
  }
  getRowData(rowIndex) {
    if(!this.isRowIndexValid(rowIndex)) { throw new Error('Invalid index.'); }
    return this.data[rowIndex];
  }
  getRowSnappedData(rowIndex) {    
    let rowData = this.getRowData(rowIndex);
    return this.getArraySnappedData(rowData);
  }
  isColumnIndexValid(colIndex) {
    if(Number.isInteger(colIndex) === false) { return false; }
    if(colIndex >= this.colLength || colIndex < 0) { return false; }
    return true;
  }
  isDataValid(data) {
    return Array.isArray(data) && data.every(bits => Array.isArray(bits));
  }
  isRowIndexValid(rowIndex) {
    if(Number.isInteger(rowIndex) === false) { return false; }
    if(rowIndex >= this.rowLength || rowIndex < 0) { return false; }
    return true;
  }
  isSizeValid(size) { return PuzzleBitmap.isSizeValid(size); }
  /**
   * Normalize bit to a valid value (0 or 1).
   * @param {Number} - Bit value.
   * @returns {0|1} Normalized bit.
   */
  normalizeBit(bit) { return Math.min(Math.max(bit, 0), 1); }
  /**
   * Normalize every bit in data to valid value, 
   *  and make each row equal length.
   * @param {Array[int][int]} data - Data array to be normalized.
   * @returns {Array[int][int]} Normalized data array.
   */
  normalizeData(data) {
    if(!this.isDataValid(data)) { throw new Error('Invalid data.'); }

    let normalizedData = new Array(0);
    let maxLength = 0;
    /* Normalize data to 0 & 1. */
    data.forEach((bits) => {
      maxLength = Math.max(maxLength, bits.length);
      normalizedData.push(bits.map(this.normalizeBit));
    });
    /* Fill 0s to make every row bits equal length. */
    data.forEach((bits, index) => {
      if(bits.length < maxLength) { normalizedData[i].fill(0, bits.length, maxLength); }
    });
    return normalizedData;
  }
  /**
   * Normalize & check if a given bitmap has the equivalent data with self.
   * @param {Array[int][int]} bitmap - Bitmap to be normalized & compared.
   * @returns {Boolean} Equal to self or not after normalized.
   */
  normalizedEquals(bitmap) {
    let normalizedData = this.normalizeData(bitmap.data);
    return this.data.every((row, rowIndex) => {
      return row.every((bit, colIndex) => {
        return bit === normalizedData[rowIndex][colIndex];
      });
    });
  }
  setBit(position, bit) {
    this.data[position.rowIndex][position.colIndex] = this.normalizeBit(bit);
  }
  /**
   * Slice part of data with given range and return it as a new bitmap.
   * @param {int} start - Start row index.
   * @param {int} end - End row index.
   * @returns {PuzzleBitmap} Sliced new bitmap.
   */
  slice(start, end) { return new PuzzleBitmap({ data: this.data.slice(start, end) }); }

  get colLength() { return this.data[0].length; }
  /**
   * @getter Get array data in columns (transposed).
   */
  get cols() { return this.transposedData }
  get data() { return this._data; }
  get rowLength() { return this.data.length; }
  /**
   * @getter Get array data in rows (the same as data).
   */
  get rows() { return this.data; }
  /**
   * @getter Get snapped data by combine all 1s & remove all the others.
   */
  get snappedData() {
    let snappedData = new Array(0);
    for(let i = 0; i < this.rowLength; i++) {
      snappedData.push(this.getRowSnappedData(i));
    }
    return snappedData;
  }
  get transposedData() {
    let transposedData = new Array(0);
    for(let i = 0; i < this.colLength; i++) {
      transposedData.push(this.getColumnData(i));
    }
    return transposedData;
  }
  get transposedSnappedData() {
    let snappedData = new Array(0);
    for(let i = 0; i < this.colLength; i++) {
      snappedData.push(this.getColumnSnappedData(i));
    }
    return snappedData;
  }
}

export default PuzzleBitmap;