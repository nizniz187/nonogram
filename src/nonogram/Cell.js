import React from 'react';

/**
 * @class Cell
 * Class for a nonogram cell.
 */
class Cell extends React.Component {
  render() {
    return (
      <div className={`nonogram-cell ${this.bitClassName}`}
        data-row-index={this.props.rowIndex}
        data-col-index={this.props.colIndex}
      />
    );
  }

  get bitClassName() {
    switch(this.props.bit) {
      case 1:
        return 'checked';
      case -1:
        return 'excluded';
      default:
        return '';
    }
  }
}

export default Cell;