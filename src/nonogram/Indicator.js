import React from 'react';

class Indicator extends React.Component {
  render() {
    return (
      <div class={`nonogram-indicator ${this.props.type}`}>
        {this.renderText()}
      </div>
    );
  }
  renderText() {
    let texts = new Array(0);
    this.props.bitmap.forEach(bit => {
      if(bit === 1) {

      } else {

      }
    });
    return texts;
  }
}

export default Indicator;