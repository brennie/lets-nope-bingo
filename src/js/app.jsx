import React from 'react';
import ReactDOM from 'react-dom';

import BingoCard from './components/bingoCard.jsx';


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<BingoCard />, document.querySelector('.content'));
});
