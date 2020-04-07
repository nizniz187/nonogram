import React from 'react';
import Board from './Board.jsx';
import './Nonogram.css';

class Nonogram extends React.Component {
  constructor(props) {
    super(props);
  }

  isBoardSizeValid(size) {
    return Number.isInteger(size) && size > 0;
  }
  render() {
    return (
      <Board rowLength={this.rowLength} colLength={this.colLength} />
    );
  }

  get colLength() {
    if(this.isBoardSizeValid(this.props.colLength)) {
      return this.props.colLength;
    } else {
      return DEFAULT_SETTINGS.COL_LENGTH;
    }
  }
  get rowLength() {
    if(this.isBoardSizeValid(this.props.rowLength)) {
      return this.props.rowLength;
    } else {
      return DEFAULT_SETTINGS.ROW_LENGTH;
    }
  }
}

const DEFAULT_SETTINGS = {
  COL_LENGTH: 15,
  ROW_LENGTH: 15 
}

export default Nonogram;