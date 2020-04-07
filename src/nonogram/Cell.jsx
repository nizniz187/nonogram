import React from 'react';
import './nonogram.css';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mark: null
    };
  }

  render() {
    return (
      <div className="nonogram-cell" />
    );
  }
}

export default Cell;