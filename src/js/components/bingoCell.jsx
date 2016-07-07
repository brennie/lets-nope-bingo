import React from 'react';


/**
 * An individual bingo cell.
 *
 * Each cell contains a horror trope for the bingo.
 */
export default class BingoCell extends React.Component {
  /**
   * Render the bingo cell.
   *
   * @returns {React.ReactElement} The rendered component.
   */
  render() {
    const activeClass = this.props.active ? ' bingo-card__cell--active' : '';
    const classes = `bingo-card__cell btn${activeClass}`;

    return (
      <button
        className={classes}
        ref={ (el) => this._el = el }
        onClick={this.props.onClick}>
          {this.props.tropeText}
      </button>
    );
  }
};
