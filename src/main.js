import React from 'react';
import ReactDOM from 'react-dom';
import Nonogram from './nonogram/Nonogram.js';

ReactDOM.render(<Nonogram colLength="10" rowLength="10" />, 
document.querySelector('#root'));