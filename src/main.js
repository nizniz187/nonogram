import React from 'react';
import ReactDOM from 'react-dom';
import Board from './nonogram/Board.jsx';

window.addEventListener('load', () => {
  ReactDOM.render(<Board />, document.getElementById('root'));
});