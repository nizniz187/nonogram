import React from 'react';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mark: this.props.bit ? MARK.CHECKED : MARK.UNCHECKED
    };
  }

  changeMark() {
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
    });
  }
  render() {
    return (
      <div className={`nonogram-cell ${this.state.mark}`}
        onClick={this.changeMark.bind(this)} 
        onContextMenu={this.setMarkExcluded.bind(this)} 
      />
    );
  }
  setMarkExcluded(e) {
    e.preventDefault();
    this.setState({ mark: MARK.EXCLUDED });
  }
}

const MARK = {
  CHECKED: 'checked', EXCLUDED: 'excluded', UNCHECKED: 'unchecked'
};

export default Cell;