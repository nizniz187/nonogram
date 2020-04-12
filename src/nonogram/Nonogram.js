import React from 'react';

import PuzzleBitmap from 'data/PuzzleBitmap.js';
import UserBitmap from 'data/UserBitmap.js';

import IndicatorPanel from './IndicatorPanel.js';
import Board from './Board.js';
import './Nonogram.css';

/**
 * @class Nonogram
 * Class for the whole nonogram game.
 */
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
  
  /**
   * Check if the puzzle is solved with the correct answer.
   */
  checkPuzzleSolved() {
    if(this.state.puzzleBitmap.normalizedEquals(this.state.userBitmap)) {
      alert('Puzzle Solved!');
    }
  }
  getUserBitmapBit(position) { return this.state.userBitmap.getBit(position); }
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
            userBitmap={this.state.userBitmap}
            getUserBitmapBit={this.getUserBitmapBit.bind(this)}
            updateUserBitmapByBit={this.updateUserBitmapByBit.bind(this)}
            updateUserBitmapBySelection={this.updateUserBitmapBySelection.bind(this)}
          />
        </div>
      </div>
    );
  }
  updateUserBitmapByBit(position, value) {
    this.setState(state => {
      let updatedUserBitmap = state.userBitmap.clone();
      updatedUserBitmap.setBit(position, value);
      return { userBitmap: updatedUserBitmap };
    }, this.checkPuzzleSolved.bind(this));
  }
  /**
   * Update a given selection of the user bitmap to a given value.
   * @param {Selection} selection - User selection.
   * @param {int} value - Value to be set.
   */
  updateUserBitmapBySelection(selection, value) {

  }
}

export default Nonogram;