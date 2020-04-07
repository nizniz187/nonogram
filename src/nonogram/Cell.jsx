import React from 'react';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mark: this.props.bit ? MARK.CHECKED : MARK.UNCHECKED
    };
  }

  render() {
    return (
      <div className={`nonogram-cell ${this.state.mark}`} />
    );
  }
}

const MARK = {
  CHECKED: 'checked', EXCLUDED: 'excluded', UNCHECKED: ''
};

export default Cell;