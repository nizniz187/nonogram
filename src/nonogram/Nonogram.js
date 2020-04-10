import React from 'react';

import Bitmap from 'data/PuzzleBitmap.js';

import IndicatorPanel from './IndicatorPanel.js';
import Board from './Board.js';
import './Nonogram.css';

class Nonogram extends React.Component {
  constructor(props) {
    super(props);

    let bitmap = this.createRandomBitmap({ 
      rowLength: Number(this.props.rowLength), 
      colLength: Number(this.props.colLength)
    });
    this.state = { 
      bitmap: bitmap, 
      userBitmap: this.createEmptyBitmap({ 
        rowLength: bitmap.rowLength, 
        colLength: bitmap.colLength 
      })
    };
  }
  
  createBitmap({ 
    rowLength = DEFAULT_SETTINGS.ROW_LENGTH, 
    colLength = DEFAULT_SETTINGS.COL_LENGTH,
    data
  } = {}) {
    let bitmap = null;
    if(typeof data === 'string' && data.toLowerCase() === 'random') {
      bitmap = Bitmap.createRandom({ rowLength, colLength });
    } else {
      bitmap = new Bitmap({ rowLength, colLength, data });
    }
    return bitmap;
  }
  createEmptyBitmap({ rowLength, colLength } = {}) {
    return this.createBitmap({ rowLength, colLength });
  }
  createRandomBitmap({ rowLength, colLength } = {}) {
    return this.createBitmap({ rowLength, colLength, data: 'random' });
  }
  render() {
    return (
      <div className="nonogram">
        <IndicatorPanel 
          type="row" 
          bitmap={this.state.bitmap} 
          userBitmap={this.state.userBitmap}
        />
        <div>
          <IndicatorPanel type="col" 
            bitmap={new Bitmap({ data: this.state.bitmap.cols })} 
            userBitmap={this.state.userBitmap}
          />
          <Board 
            rowLength={this.state.bitmap.rowLength} 
            colLength={this.state.bitmap.colLength} 
            updateUserBitHandler={this.updateUserBitmapByBit.bind(this)}
          />
        </div>
      </div>
    );
  }
  updateUserBitmapByBit(rowIndex, colIndex, bit) {
    this.setState(state => {
      let userBitmap = state.userBitmap.clone();
      userBitmap.setBit(rowIndex, colIndex, bit);
      return { userBitmap };
    });
  }
}

const DEFAULT_SETTINGS = {
  COL_LENGTH: 15,
  ROW_LENGTH: 15 
};

export default Nonogram;