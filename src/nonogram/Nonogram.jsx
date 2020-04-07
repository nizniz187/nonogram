import React from 'react';
import Board from './Board.jsx';
import './Nonogram.css';

class Nonogram extends React.Component {
  constructor(props) {
    super(props);
    let rowLength = this.isBoardSizeValid(this.props.rowLength) 
      ? this.props.rowLength : DEFAULT_SETTINGS.ROW_LENGTH;
    let colLength = this.isBoardSizeValid(this.props.colLength) 
      ? this.props.colLength : DEFAULT_SETTINGS.COL_LENGTH;
    this.state = {
      rowLength: rowLength,
      colLength: colLength,
      bitmap: this.createRandomBitMap(rowLength, colLength)
    }
  }

  createRandomBitMap(rowLength, colLength) {
    let bitmap = new Array(0);
    for(let i = 0; i < rowLength; i++) {
      let row = new Array(0);
      for(let j = 0; j < colLength; j++) {
        row.push(Math.round(Math.random()));
      }
      bitmap.push(row);
    }
    return bitmap;
  }
  isBoardSizeValid(size) {
    return Number.isInteger(size) && size > 0;
  }
  render() {
    return (
      <Board 
        rowLength={this.state.rowLength} colLength={this.state.colLength} 
        bitmap={this.state.bitmap} />
    );
  }
}

const DEFAULT_SETTINGS = {
  COL_LENGTH: 15,
  ROW_LENGTH: 15 
}

export default Nonogram;