import React from 'react';

/**
 * @class Cell
 * Class for a nonogram cell.
 */
class Cell extends React.Component {
  render() {
    return (
      <div className={`nonogram-cell ${this.cellClassName}`}
        data-row-index={this.props.rowIndex}
        data-col-index={this.props.colIndex}
      />
    );
  }

  get cellClassName() {
    switch(this.props.userBit) {
      case BIT_VALUE_CHECKED:
        return CELL_CLASS_CHECKED;
      case BIT_VALUE_EXCLUDED:
        return CELL_CLASS_EXCLUDED;
      default:
        return CELL_CLASS_UNCHECKED;
    }
  }
}

export const BIT_VALUE_CHECKED = 1;
export const BIT_VALUE_UNCHECKED = 0;
export const BIT_VALUE_EXCLUDED = -1;

const CELL_CLASS_CHECKED = 'checked';
const CELL_CLASS_EXCLUDED = 'excluded';
const CELL_CLASS_UNCHECKED = '';

export default Cell;