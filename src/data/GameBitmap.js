class GameBitmap {
  constructor(data) {
    if(!GameBitmap.isDataValid(data)) { throw new Error('Invalid data.'); }
    GameBitmap.normalizeData(data);
    this.data = data;
  }

  static createRandom({ rowLength, colLength }) {
    if(!GameBitmap.isSizeValid(rowLength) || !GameBitmap.isSizeValid(colLength)) {
      throw new Error('Invalid bitmap size.');
    }

    let data = new Array(0);
    for(let i = 0; i < rowLength; i++) {
      let row = new Array(0);
      for(let j = 0; j < colLength; j++) {
        row.push(Math.round(Math.random()));
      }
      data.push(row);
    }
    return new GameBitmap(data);
  }
  static isDataValid(data) {
    return Array.isArray(data) && data.every(bits => Array.isArray(bits));
  }
  static isSizeValid(size) { return Number.isInteger(size) && size > 0; }
  static normalizeBit(bit) { return Math.min(Math.max(bit, 0), 1); }
  static normalizeData(data) {
    if(!GameBitmap.isDataValid(data)) { throw new Error('Invalid data.'); }

    let maxLength = 0;
    /* Normalize data to 0 & 1. */
    data.forEach(bits => {
      maxLength = Math.max(maxLength, bits.length);
      bits = bits.map(GameBitmap.normalizeBit);
    });
    /* Fill 0s to make every row bits equal length. */
    data.forEach(bits => {
      if(bits.length < maxLength) { bits.fill(0, bits.length, maxLength); }
    });
  }

  getBit(rowIndex, colIndex) { return this.data[rowIndex][colIndex]; }
  slice(start, end) { return new GameBitmap(this.data.slice(start, end)); }

  get colLength() { return this.data[0].length; }
  get cols() { return this.transposedData }
  get rowLength() { return this.data.length; }
  get rows() { return this.data; }
  get snappedData() {
    let snappedData = new Array(0);
    this.data.forEach(bits => {
      let array = new Array(0);
      bits.forEach(bit => {
        if(array.length === 0) {
          array.push(bit);
          return;
        }

        let lastBit = GameBitmap.normalizeBit(array[array.length - 1]);
        if(bit === lastBit) {
          array[array.length - 1]++;
        } else {
          array.push(bit);
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

export default GameBitmap;