import PuzzleBitmap from 'data/PuzzleBitmap.js';

class UserBitmap extends PuzzleBitmap {
  constructor({ rowLength, colLength, data } = {}) {
    super({ rowLength, colLength, data });
    if(this.isDataValid(data)) {
      this._data = this.normalizeData(data);
    }
  }

  clone() { return new UserBitmap({ data: this.data }); }
  normalizeBit(bit) { 
    if(bit >= 1) { return 1; }
    if(bit === 0) { return 0; }
    if(bit <= -1) { return -1; }
  }
  slice(start, end) { return new UserBitmap({ data: this.data.slice(start, end) }); }
}

export default UserBitmap;