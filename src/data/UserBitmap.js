import PuzzleBitmap from 'data/PuzzleBitmap.js';

/**
 * @class UserBitmap
 * Bitmap for user manipulation.
 * Extends PuzzleBitmap class with additional -1 value, 
 *  which represents excluded mark.
 */
class UserBitmap extends PuzzleBitmap {
  /**
   * Create a bitmap with a given data,
   *  otherwise create it with given size for null data.
   * @param {Object} params
   * @param {int} [params.rowLength] - Row length.
   * @param {int} [params.colLEngth] - Column length.
   * @param {Array[int][int]} [params.data] - Bitmap data.
   */
  constructor({ rowLength, colLength, data } = {}) {
    super({ rowLength, colLength, data });
    if(this.isDataValid(data)) {
      this._data = this.normalizeData(data);
    }
  }
  
  static isBitValid(bit) { return bit === -1 || bit === 0 || bit === 1; }

  clone() { return new UserBitmap({ data: this.data }); }
  /**
   * Normalize bit to a valid value (0 or 1 or -1).
   * @param {Number} - Bit value.
   * @returns {0|1} Normalized bit.
   */
  normalizeBit(bit) { 
    if(bit >= 1) { return 1; }
    if(bit === 0) { return 0; }
    if(bit <= -1) { return -1; }
  }
  /**
   * Slice part of data with given range and return it as a new bitmap.
   * @param {int} start - Start row index.
   * @param {int} end - End row index.
   * @returns {UserBitmap} Sliced new bitmap.
   */
  slice(start, end) { return new UserBitmap({ data: this.data.slice(start, end) }); }
}

export default UserBitmap;