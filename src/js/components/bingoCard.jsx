import Immutable from 'immutable';
import React from 'react';

import BingoCell from './bingoCell.jsx';
import TROPES from '../tropes.js';


/**
 * Bingo cares are 5x5.
 */
const BINGO_CARD_SIZE = 5;


/**
 * The Bingo Card.
 *
 * A bingo card contains a 5x5 grid of cells, each of which corresponds to a
 * horror trope.
 */
export default class BingoCard extends React.Component {
  /**
   * Construct the BingoCard.
   *
   * This sets the initial state.
   */
  constructor(props) {
    super(props);
    
    this.state = {
      data: Immutable.Map({
        tropes: this._generate(),
        active: this._reset()
      })
    };
  }

  /**
   * Render the BingoCard.
   *
   * @returns {React.ReactElement} The rendered component.
   */
  render() {
    const cells = [];
    for (let j = 0; j < BINGO_CARD_SIZE; j++) {
      for (let i = 0; i < BINGO_CARD_SIZE; i++) {
        const key = i + ',' + j;
        const tropeText = TROPES[this.state.data.getIn(['tropes', j, i])];

        cells.push(
          <BingoCell
            tropeText={ tropeText }
            active={ this.state.data.getIn(['active', j, i]) }
            key={ key }
            onClick={ () => 
              this.setState(
                ({data}) => ({
                    data: data.updateIn(['active', j, i], value => !value)
                })
              )
            } />
        );
      }
    }

    return (
      <div>
        <h1 className="content__heading">Let's Nope! Bingo</h1>
        <div className="bingo-card">{cells}</div>
      </div>
    );
  }

  /**
   * Generate a new set of tropes for the cells.
   *
   * @returns {Immutable.List} A 5x5 matrix of trope indexes.
   */
  _generate() {
    const takenTropes = new Set();
    const tropes = [];

    for (let j = 0; j < BINGO_CARD_SIZE; j++) {
      const row = [];

      for (let i = 0; i < BINGO_CARD_SIZE; i++) {
        let index;
        
        do {
          index = Math.floor(Math.random() * TROPES.length);
        } while (takenTropes.has(index));

        takenTropes.add(index);

        row.push(index);
      }

      tropes.push(row);
    }

    return Immutable.fromJS(tropes);
  }

  /**
   * Generate a rest state for the bingo cells.
   *
   * @returns {Immutable.List} A 5x5 matrix of false entries.
   */
  _reset() {
    return Immutable.fromJS([
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false]
    ]);
  }
};
