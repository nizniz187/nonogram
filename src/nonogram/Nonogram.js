import React from 'react';

import Bitmap from 'data/GameBitmap.js';

import IndicatorPanel from './IndicatorPanel.js';
import Board from './Board.js';
import './Nonogram.css';

class Nonogram extends React.Component {
  constructor(props) {
    super(props);

    this.state = { bitmap: this.createBitmap() };
  }
  
  createBitmap() {
    let bitmap = null;
    try {
      bitmap = Bitmap.createRandom({
        rowLength: this.props.rowLength, 
        colLength: this.props.colLength
      });
    } catch(e) {
      console.log('Using default settings.');
      bitmap = Bitmap.createRandom({
        rowLength: DEFAULT_SETTINGS.ROW_LENGTH, 
        colLength: DEFAULT_SETTINGS.COL_LENGTH
      });
    }
    return bitmap;
  }
  render() {
    return (
      <div className="nonogram">
        <IndicatorPanel type="row" bitmap={this.state.bitmap} />
        <div>
          <IndicatorPanel type="col" bitmap={new Bitmap(this.state.bitmap.cols)} />
          <Board 
            rowLength={this.state.bitmap.rowLength} 
            colLength={this.state.bitmap.colLength} 
            bitmap={this.state.bitmap} />
        </div>
      </div>
    );
  }
}

const DEFAULT_SETTINGS = {
  COL_LENGTH: 15,
  ROW_LENGTH: 15 
}

export default Nonogram;