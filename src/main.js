import React from 'react';
import ReactDOM from 'react-dom';
import Nonogram from './nonogram/Nonogram.jsx';

window.addEventListener('load', () => {
  ReactDOM.render(<Nonogram />, document.getElementById('root'));
});