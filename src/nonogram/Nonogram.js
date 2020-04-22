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

    this.initGame();
  }
  render() {
    this.puzzleBitCount = this.state.puzzleBitmap.getBitCount(Cell.BIT_VALUE_CHECKED);
    this.indicators = {
      rows: this.state.puzzleBitmap.snappedData,
      cols: this.state.puzzleBitmap.transposedSnappedData
    };
    
    let userBitCount = this.state.userBitmap.getBitCount(Cell.BIT_VALUE_CHECKED);
    let userBitCountErrorClass = this.state.puzzleStatus === PUZZLE_STATUS_ERROR
      ? 'error' : '';

    return (
      <div className="nonogram" 
        onContextMenu={this.preventContextMenu}
      >
        <div className="nonogram-game">
          <IndicatorPanel type="row" data={this.indicators.rows} />
          <div>
            <div className="nonogram-action">
              <button type="button" onClick={this.resetUserBitmap}>Restart</button>
              <button type="button" onClick={this.initGame}>New Game</button>
            </div>
            <div className="nonogram-counter">
              <span className={userBitCountErrorClass}>{userBitCount} </span>
               / {this.puzzleBitCount}
            </div>
            <IndicatorPanel type="col" data={this.indicators.cols} />
            <Board 
              rowLength={this.state.puzzleBitmap.rowLength} 
              colLength={this.state.puzzleBitmap.colLength}
              userBitmap={this.state.userBitmap}
              getUserBitmapBit={this.getUserBitmapBit}
              updateUserBitmapByBit={this.updateUserBitmapByBit}
            />
          </div>
        </div>
        {this.renderLightbox()}
      </div>
    );
  }
  componentDidUpdate() {
    if(typeof this.props.solvedCallback === 'function' 
      && this.state.puzzleStatus === PUZZLE_STATUS_SOLVED) {
      this.props.solvedCallback();
      return;
    }
    if(typeof this.props.errorCallback === 'function' 
      && this.state.puzzleStatus === PUZZLE_STATUS_ERROR) {
      this.props.errorCallback();
    }
  }

  /* -------------------------------------------------------------------------
    ^Event Handlers
  ------------------------------------------------------------------------- */
  initGame = () => {    
    let puzzleBitmap = this.createPuzzle();
    let status = {
      puzzleBitmap,
      userBitmap: new UserBitmap({ 
        rowLength: puzzleBitmap.rowLength, 
        colLength: puzzleBitmap.colLength 
      }),
      puzzleStatus: PUZZLE_STATUS_UNSOLVED
    };

    if(this.state && typeof this.state === 'object') {
      this.setState(() => status);
    } else {
      this.state = status;
    }
  }
  getUserBitmapBit = position => this.state.userBitmap.getBit(position);
  hideLightbox = () => {
    document.querySelector('.nonogram-lightbox').classList.add('hide');
  }
  preventContextMenu = e => e.preventDefault();
  resetUserBitmap = () => {
    this.setState(() => {
      return {
        userBitmap: new UserBitmap({ 
          rowLength: this.state.puzzleBitmap.rowLength, 
          colLength: this.state.puzzleBitmap.colLength 
        }),
        puzzleStatus: PUZZLE_STATUS_UNSOLVED
      }
    });
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
  createPuzzle() {
    return PuzzleBitmap.createRandom(
      Number(this.props.rowLength), Number(this.props.colLength)
    );
  };
  getPuzzleStatus(userBitmap) {    
    let userBitCount = userBitmap.getBitCount(Cell.BIT_VALUE_CHECKED);
    if(this.puzzleBitCount <= userBitCount) {
      if(this.checkPuzzleSolved(userBitmap) === true) {
        // Puzzle solved.
        return PUZZLE_STATUS_SOLVED;
      }
      // Wrong answer.
      return PUZZLE_STATUS_ERROR;
    }
    if(this.puzzleBitCount > userBitCount) { 
      if(userBitmap.getBitCount(Cell.BIT_VALUE_UNCHECKED) === 0) {
        // All cell marked but wrong answer.
        return PUZZLE_STATUS_ERROR;
      }
    }
    return PUZZLE_STATUS_UNSOLVED;
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
  renderLightbox() {
    if(this.props.preventDefaultSolvedHandler === 'true') { return null; }
    if(this.state.puzzleStatus !== PUZZLE_STATUS_SOLVED) { return null; }
    
    return (
      <div className={`nonogram-lightbox`}>
        <div>{this.getPuzzleStatusMessage()}</div>
        <button type="button" onClick={this.hideLightbox}>OK</button>
      </div>
    );
  }
}

const PUZZLE_ALERT_MESSAGE_SOLVED = 'Puzzle Solved!';
const PUZZLE_ALERT_MESSAGE_ERROR = 'Oops, some marks could be wrong.';

const PUZZLE_STATUS_SOLVED = '1111';
const PUZZLE_STATUS_UNSOLVED = '0000';
const PUZZLE_STATUS_ERROR = '9999';

export default Nonogram;