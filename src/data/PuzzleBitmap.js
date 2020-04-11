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
  normalizeBit(bit) { return Math.min(Math.max(bit, 0), 1); }
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
  slice(start, end) { return new PuzzleBitmap({ data: this.data.slice(start, end) }); }

  get colLength() { return this.data[0].length; }
  get cols() { return this.transposedData }
  get data() { return this._data; }
  get rowLength() { return this.data.length; }
  get rows() { return this.data; }
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