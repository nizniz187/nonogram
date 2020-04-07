import React from 'react';
import ReactDOM from 'react-dom';
import Board from './nonogram/Board.jsx';

window.addEventListener('load', () => {
  ReactDOM.render(<Board row="15" col="15" />, document.getElementById('root'));
});