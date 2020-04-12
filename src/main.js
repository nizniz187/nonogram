import React from 'react';
import ReactDOM from 'react-dom';
import Nonogram from './nonogram/Nonogram.js';

ReactDOM.render(<Nonogram colLength="5" rowLength="5" />, 
document.querySelector('#root'));