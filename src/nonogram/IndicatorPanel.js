import React from 'react';
import Indicator from './Indicator.js';

class IndicatorPanel extends React.Component {  
  render() {
    return (
      <div className={`nonogram-indicator-panel ${this.props.type}`}>
        {this.renderIndicators()}
      </div>
    );
  }
  renderIndicators() {
    let indicators = new Array(0);
    this.props.bitmap.forEach((bits, index) => {
      indicators.push(
        <Indicator type={this.props.type} bitmap={bits} key={index} />
      );
    });
    return indicators;
  }
}

export default IndicatorPanel;