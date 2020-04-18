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
    this.indicators = {
      rows: puzzleBitmap.snappedData,
      cols: puzzleBitmap.transposedSnappedData
    }
    this.state = { 
      puzzleBitmap: puzzleBitmap, 
      userBitmap: new UserBitmap({ 
        rowLength: puzzleBitmap.rowLength, 
        colLength: puzzleBitmap.colLength 
      })
    };
  }  
  render() {
    return (
      <div className="nonogram" 
        onContextMenu={this.preventContextMenu.bind(this)}
      >
        <IndicatorPanel type="row" data={this.indicators.rows} />
        <div>
          <IndicatorPanel type="col" data={this.indicators.cols} />
          <Board 
            rowLength={this.state.puzzleBitmap.rowLength} 
            colLength={this.state.puzzleBitmap.colLength}
            userBitmap={this.state.userBitmap}
            getUserBitmapBit={this.getUserBitmapBit.bind(this)}
            updateUserBitmapByBit={this.updateUserBitmapByBit.bind(this)}
          />
        </div>
      </div>
    );
  }
  componentDidUpdate() {
    if(this.checkPuzzleSolved()) {
      alert('Puzzle Solved!');
    }
  }
  
  /**
   * Check if the puzzle is solved with the correct answer.
   */
  checkPuzzleSolved() {
    for(let i = 0; i < this.state.userBitmap.rowLength; i++) {
      if(this.checkPuzzleRowSolved(i) !== true) { return false; }
    }
    for(let i = 0; i < this.state.userBitmap.colLength; i++) {
      if(this.checkPuzzleColumnSolved(i) !== true) { return false; }
    }
    return true;
  }
  checkPuzzleRowSolved(rowIndex) {
    return this.indicators.rows[rowIndex].toString() 
      === this.state.userBitmap.getRowSnappedData(rowIndex).toString()
  }
  checkPuzzleColumnSolved(colIndex) {
    return this.indicators.cols[colIndex].toString() 
      === this.state.userBitmap.getColumnSnappedData(colIndex).toString()
  }
  getUserBitmapBit(position) { return this.state.userBitmap.getBit(position); }  
  preventContextMenu(e) { e.preventDefault(); }
  updateUserBitmapByBit(position, value) {
    this.setState(state => {
      let userBitmap = state.userBitmap.clone();
      userBitmap.setBit(position, value);

      return { userBitmap };
    });
  }
}

export default Nonogram;