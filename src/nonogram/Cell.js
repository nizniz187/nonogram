import React from 'react';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mark: MARK.UNCHECKED
    };
  }

  getUserBitByMark() {
    if(this.state.mark === MARK.CHECKED) { return 1; }
    else { return 0; }
  }
  render() {
    return (
      <div className={`nonogram-cell ${this.state.mark}`}
        onClick={this.updateMark.bind(this)} 
        onContextMenu={this.updateMarkExcluded.bind(this)} 
      />
    );
  }
  updateMark() {
    this.setState(state => { 
      switch(state.mark) {
        case MARK.UNCHECKED:
          return { mark: MARK.CHECKED };
        case MARK.CHECKED:
          return { mark: MARK.EXCLUDED };
        case MARK.EXCLUDED:
          return { mark: MARK.UNCHECKED };
        default:
          return state;
      }
    }, this.updateUserBit.bind(this));
  }
  updateMarkExcluded(e) {
    e.preventDefault();
    this.setState(state => {
      if(this.state.mark === MARK.EXCLUDED) {
        return { mark: MARK.UNCHECKED };
      } else {
        return { mark: MARK.EXCLUDED }
      }
    }, this.updateUserBit.bind(this));
  }
  updateUserBit() {
    this.props.updateUserBitHandler(
      this.props.rowIndex, this.props.colIndex, this.userBit
    );
  }

  get userBit() { return this.getUserBitByMark(); }
}

const MARK = {
  CHECKED: 'checked', EXCLUDED: 'excluded', UNCHECKED: 'unchecked'
};

export default Cell;