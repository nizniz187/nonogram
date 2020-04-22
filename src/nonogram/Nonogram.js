import React from 'react';

import PuzzleBitmap from 'data/PuzzleBitmap.js';
import UserBitmap from 'data/UserBitmap.js';

import IndicatorPanel from './IndicatorPanel.js';
import Board from './Board.js';
import * as Cell from './Cell.js';
import './Nonogram.css';

/**
 * @class Nonogram
 * Class for the whole nonogram game.
 */
class Nonogram extends React.Component {
  constructor(props) {
    super(props);

    this.puzzleBitmap = PuzzleBitmap.createRandom(
      Number(this.props.rowLength), Number(this.props.colLength)
    );
    this.indicators = {
      rows: this.puzzleBitmap.snappedData,
      cols: this.puzzleBitmap.transposedSnappedData
    }
    this.state = this.getInitialStateObject();
  }  
  render() {
    return (
      <div className="nonogram" 
        onContextMenu={this.preventContextMenu}
      >
        <div className="nonogram-game">
          <IndicatorPanel type="row" data={this.indicators.rows} />
          <div>
            <div className="nonogram-action">
              <button type="button" onClick={this.resetUserBitmap}>Reset</button>
              <button type="button" onClick={this.createNewPuzzle}>New Game</button>
            </div>
            <div className="nonogram-counter">XXX</div>
            <IndicatorPanel type="col" data={this.indicators.cols} />
            <Board 
              rowLength={this.puzzleBitmap.rowLength} 
              colLength={this.puzzleBitmap.colLength}
              userBitmap={this.state.userBitmap}
              getUserBitmapBit={this.getUserBitmapBit}
              updateUserBitmapByBit={this.updateUserBitmapByBit}
            />
          </div>
        </div>
        <div className="nonogram-lightbox">
          {this.getPuzzleStatusMessage()}
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------------------
    ^Event Handlers
  ------------------------------------------------------------------------- */
  createNewPuzzle = () => {

  };
  preventContextMenu = e => e.preventDefault();
  getUserBitmapBit = position => this.state.userBitmap.getBit(position);
  resetUserBitmap = () => {
    this.setState(() => this.getInitialStateObject());
  };
  updateUserBitmapByBit = (position, value) => {
    this.setState(state => {
      let userBitmap = state.userBitmap.clone();
      userBitmap.setBit(position, value);

      return { 
        userBitmap,
        puzzleStatus: this.getPuzzleStatus(userBitmap) 
      };
    });
  };
  
  /* -------------------------------------------------------------------------
    ^Methods
  ------------------------------------------------------------------------- */
  /**
   * Check if the puzzle is solved with the correct answer.
   */
  checkPuzzleSolved(userBitmap) {
    for(let i = 0; i < userBitmap.rowLength; i++) {
      if(this.checkPuzzleRowSolved(userBitmap, i) !== true) { return false; }
    }
    for(let i = 0; i < userBitmap.colLength; i++) {
      if(this.checkPuzzleColumnSolved(userBitmap, i) !== true) { return false; }
    }
    return true;
  }
  checkPuzzleRowSolved(userBitmap, rowIndex) {
    return this.indicators.rows[rowIndex].toString() 
      === userBitmap.getRowSnappedData(rowIndex).toString()
  }
  checkPuzzleColumnSolved(userBitmap, colIndex) {
    return this.indicators.cols[colIndex].toString() 
      === userBitmap.getColumnSnappedData(colIndex).toString()
  }
  getInitialStateObject() {
    return {
      userBitmap: new UserBitmap({ 
        rowLength: this.puzzleBitmap.rowLength, 
        colLength: this.puzzleBitmap.colLength 
      }),
      puzzleStatus: PUZZLE_STATUS_UNSOLVED
    };
  }
  getPuzzleStatus(userBitmap) {
    let puzzleBitCount = this.puzzleBitmap.getBitCount(Cell.BIT_VALUE_CHECKED);
    let userBitCount = userBitmap.getBitCount(Cell.BIT_VALUE_CHECKED);
    if(puzzleBitCount > userBitCount) { 
      if(userBitmap.getBitCount(Cell.BIT_VALUE_UNCHECKED) === 0) {
        // All cell marked but wrong answer.
        return PUZZLE_STATUS_ERROR;
      } else {
        // Puzzle unsolved.
        return PUZZLE_STATUS_UNSOLVED; 
      }
    } else {
      if(this.checkPuzzleSolved(userBitmap) === true) {
        // Puzzle solved.
        return PUZZLE_STATUS_SOLVED;
      } else {
        // Checked cells are more than the true solution.
        return PUZZLE_STATUS_ERROR;
      }
    }
  }
  getPuzzleStatusMessage() {
    if(this.state.puzzleStatus === PUZZLE_STATUS_SOLVED) {
      return PUZZLE_ALERT_MESSAGE_SOLVED;
    }
    if(this.state.puzzleStatus === PUZZLE_STATUS_ERROR) {
      return PUZZLE_ALERT_MESSAGE_ERROR;
    }
    return '';
  }
}

const PUZZLE_ALERT_MESSAGE_SOLVED = 'Puzzle Solved!';
const PUZZLE_ALERT_MESSAGE_ERROR = 'Oops, some marks could be wrong.';

const PUZZLE_STATUS_SOLVED = '1111';
const PUZZLE_STATUS_UNSOLVED = '0000';
const PUZZLE_STATUS_ERROR = '9999';

export default Nonogram;