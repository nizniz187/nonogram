import React from 'react';
import Indicator from './Indicator.js';

/**
 * @class IndicatorPanel
 * Class for game indicators.
 */
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
    for(let i = 0; i < this.props.data.length; i++) {
      indicators.push(
        <Indicator 
          type={this.props.type} data={this.props.data[i]} 
          key={`indicator-${this.props.type}-${i}`} 
        />
      );
    }
    return indicators;
  }
}

export default IndicatorPanel;