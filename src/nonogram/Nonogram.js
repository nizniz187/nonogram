import React from 'react';

import PuzzleBitmap from 'data/PuzzleBitmap.js';
import UserBitmap from 'data/UserBitmap.js';

import IndicatorPanel from './IndicatorPanel.js';
import Board from './Board.js';
import './Nonogram.css';

class Nonogram extends React.Component {
  constructor(props) {
    super(props);

    let puzzleBitmap = PuzzleBitmap.createRandom(
      Number(this.props.rowLength), Number(this.props.colLength)
    );
    this.state = { 
      puzzleBitmap: puzzleBitmap, 
      userBitmap: new UserBitmap({ 
        rowLength: puzzleBitmap.rowLength, 
        colLength: puzzleBitmap.colLength 
      })
    };
  }
  
  checkPuzzleSolved() {
    if(this.state.puzzleBitmap.normalizedEquals(this.state.userBitmap)) {
      alert('Puzzle Solved!');
    }
  }
  render() {
    return (
      <div className="nonogram">
        <IndicatorPanel 
          type="row" 
          puzzleBitmap={this.state.puzzleBitmap} 
          userBitmap={this.state.userBitmap}
        />
        <div>
          <IndicatorPanel type="col" 
            puzzleBitmap={new PuzzleBitmap({ data: this.state.puzzleBitmap.cols })} 
            userBitmap={this.state.userBitmap}
          />
          <Board 
            rowLength={this.state.puzzleBitmap.rowLength} 
            colLength={this.state.puzzleBitmap.colLength} 
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
    }, this.checkPuzzleSolved.bind(this));
  }
}

export default Nonogram;