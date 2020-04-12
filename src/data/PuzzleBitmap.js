/**
 * @class PuzzleBitmap
 * Bitmap for a nonogram puzzle.
 */
class PuzzleBitmap {
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
  getBit(rowIndex, colIndex) { return this.data[rowIndex][colIndex]; }
  isDataValid(data) {
    return Array.isArray(data) && data.every(bits => Array.isArray(bits));
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

    let maxLength = 0;
    /* Normalize data to 0 & 1. */
    data.forEach(bits => {
      maxLength = Math.max(maxLength, bits.length);
      bits = bits.map(this.normalizeBit);
    });
    /* Fill 0s to make every row bits equal length. */
    data.forEach(bits => {
      if(bits.length < maxLength) { bits.fill(0, bits.length, maxLength); }
    });
    return data;
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
  setBit(rowIndex, colIndex, bit) {
    this.data[rowIndex][colIndex] = this.normalizeBit(bit);
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
   * @getter Get snapped data by combine all 1s & remove all 0s.
   */
  get snappedData() {
    let snappedData = new Array(0);
    this.data.forEach(bits => {
      let array = new Array(0);
      bits.forEach((bit, index) => {
        if(bit === 0) { return; }
        if(array.length === 0) {
          array.push(1);
          return;
        }

        if(index === 0 || bits[index - 1] === 1) {
          array[array.length - 1]++;
        } else {
          array.push(1);
        }
      })
      snappedData.push(array);
    });
    return snappedData;
  }
  get transposedData() {
    let transposedData = new Array(0);
    for(let i = 0; i < this.data[0].length; i++) {
      let array = new Array(0);
      this.data.forEach(row => array.push(row[i]));
      transposedData.push(array);
    }
    return transposedData;
  }
}

export default PuzzleBitmap;