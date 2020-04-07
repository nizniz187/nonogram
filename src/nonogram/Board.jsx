import React from 'react';
import Cell from './Cell.jsx';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Cell />
    );
  }
}

export default Board;